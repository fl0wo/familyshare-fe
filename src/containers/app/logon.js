import { getMyKids, login, me, myEvent, register } from '../api';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Map } from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';
import Popup from 'react-popup';
import { IntervalExample } from '../components/interval';
import { PathDrawer, toArray } from '../components/pathdrawer';
import { HasJwt } from '../components/profile';
import { LoginForm, RegisterForm } from '../components/auth';
import { setFirstTimeOnly, setLivePaths, startAction } from '../../utils/actions';
import { connect } from 'react-redux';

const appStyle = {
    height: '250px',
    display: 'flex'
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    startAction: (ba) => {
        dispatch(startAction(ba))
    },
    setLivePaths :(paths) => {
        dispatch(setLivePaths(paths))
    },
    setFirstTimeOnly : (wantAgain)=>{
        dispatch(setFirstTimeOnly(wantAgain))
    }
});

const Logon = (props)=> {

    let [base,setBase] = useState({...props});
    const previousFooRef = useRef(props.jwt);
    let [logon,setHasLogon] = useState(false);

  /*  // Understand why this works only on second render...wtf
    useEffect(() => {

        function checkUpdates() {
            console.log('ehyyy');
            addNewPosToCurrentMarkers()
              .then(kids_locations => {
                  if (kids_locations.length > 0) {
                      base.livePaths = kids_locations;
                      if (base.isLive && kids_locations) {
                          //setLivePaths(kids_locations);
                          base.map = getMapByMarkers(kids_locations);
                          updateState();
                      }
                  }
              });
        }

        return () => {
            setInterval(checkUpdates, 1000);
        };
    }, [logon]);
*/

    function updateState() {
        base.number++;
        props.startAction(base);
        setBase(base);
        //this.base = {...this.props};

    }

    function init(jwt) {
        if (jwt) {
            base.jwt = jwt;

            me().then(user => {
                base.user = user;
                setHasLogon(true);
                updateState();
                //checkUpdates();
            })
        }
    }

    let handleLogin = data => {
        login(data.email, data.password)
            .then((jwt)=>init(jwt));
    };

    let handleRegister = data => {
        register(data.name, data.email, data.password)
            .then((jwt)=>init(jwt));
    };

    function onKidSelect(i){
        Popup.alert('alert'+i);
    }

    function onKidAdd(){
        Popup.alert('add kiddo');
    }

    function onEventSelect(eventId){
        if (eventId==='-1'){
            base.isLive=true;
            updateState();
            return;
        }

        function pathToMap(event) {
            return event.data.paths
                .filter(pa=>pa.positions.length>0)
                .map((pa)=>{

                return pa.positions.map((po) => ({
                    ...po.coords,
                    color:pa.color
                }))
            });
        }

        myEvent(eventId).then(event=>{
            if(event==null)return;
            base.isLive = false;
            base.selectedPaths= pathToMap(event);
            updateState();
        })
    }

    return (
        <div style={appStyle}>
            {
                (base.jwt == null)  &&
                <div>
                    <RegisterForm onSubmit={handleRegister}/>
                    <LoginForm onSubmit={handleLogin}/>
                </div>
            }
            {
                (base.jwt || logon) &&
                <div>
                    <HasJwt
                        user={base.user}
                        onKidSelect={onKidSelect}
                        onEventSelect={onEventSelect}
                        onKidAdd={onKidAdd}
                    />
                </div>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Logon);
