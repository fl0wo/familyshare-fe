import {getMyKids, login, me, myEvent, register} from '../api'
import React, {Fragment , useEffect, useState, useRef, useLayoutEffect } from "react";
import {Map} from "pigeon-maps";
import {stamenToner} from 'pigeon-maps/providers'
import Popup from 'react-popup';
import {IntervalExample} from "../components/interval";
import {PathDrawer, toArray} from "../components/pathdrawer";
import {HasJwt} from "../components/profile";
import {LoginForm, RegisterForm} from "../components/auth";

const appStyle = {
    height: '250px',
    display: 'flex'
};

import { startAction, setLivePaths } from '../../utils/actions';
import { connect } from 'react-redux';

import {INIT_BASE} from '../../utils/store'

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    startAction: (ba) => {
        dispatch(startAction(ba))
    },
    setLivePaths :(paths) => {
        dispatch(setLivePaths(paths))
    }
});

const App = (props)=> {

    let [base,setBase] = useState({...props});
    const isFirstMount = useRef(false);
    const previousFooRef = useRef(props.jwt);

    // Understand why this works only on second render...wtf
    useEffect(() => {
        setInterval(checkUpdates, 1000);
    }, [props.jwt]);

    function updateState() {
        base.number++;
        props.startAction(base);
        setBase(base);
        //this.base = {...this.props};

    }

    function checkUpdates() {
        console.log("ehyyy")
        addNewPosToCurrentMarkers()
            .then(kids_locations => {
                if (kids_locations.length > 0){
                    base.livePaths = kids_locations;
                    if (base.isLive && kids_locations) {
                        //setLivePaths(kids_locations);
                        base.map = getMapByMarkers(kids_locations);
                        updateState()
                        isFirstMount.current=false
                    }
                }
            })
    }

    function addNewPosToCurrentMarkers() {
        return getMyKids().then(kids => {
            if(kids==null)return[];
            if (kids.data.length <= 0) return kids.data;
            return kids.data.map(kid =>
                kid.positions.map(pos => {
                        return {
                            lat : pos.coords.lat,
                            long: pos.coords.long,
                            color: kid.color
                        }
                    }
                )
            )
        });
    }

    function getMapByMarkers(markers_array) {

        let center = markers_array.length>0?
            toArray(markers_array[0][0]) :
            null

        return <Map
            provider={stamenToner}
            defaultCenter={center}
            defaultZoom={18}
            width={1000}
            height={1000}
        >
            <PathDrawer kidsPaths={markers_array}/>
        </Map>;
    }

    function init(jwt) {
        if (jwt) {
            base.jwt = jwt;

            me().then(user => {
                base.user = user;
                checkUpdates();
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
            base.map = getMapByMarkers(props.livePaths);
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

            base.map = getMapByMarkers(
                base.selectedPaths
            );
            updateState();
        })
    }

    return (
        <div style={appStyle}>
            {
                base.jwt == null &&
                <div>
                    <RegisterForm onSubmit={handleRegister}/>
                    <LoginForm onSubmit={handleLogin}/>
                </div>
            }
            {
                base.jwt &&
                <div>
                    <HasJwt
                        user={base.user}
                        onKidSelect={onKidSelect}
                        onEventSelect={onEventSelect}
                        onKidAdd={onKidAdd}
                    />
                    <div>
                        {base.number}
                    </div>
                    <Fragment
                      key={props.map}
                    >{props.map}</Fragment>
                    <div>
                        <IntervalExample></IntervalExample>
                    </div>
                </div>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
