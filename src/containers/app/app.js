import {getMyKids, login, me, myEvent, register} from '../api'
import React, {Fragment} from "react";
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

import { startAction } from '../../utils/actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    startAction: (ba) => {
        dispatch(startAction(ba))
    }
});

class App extends React.Component {

    constructor(props) {
        super(props)
        this.updateState = this.updateState.bind(this)
        this.checkUpdates = this.checkUpdates.bind(this)
        this.onKidSelect = this.onKidSelect.bind(this);
        this.onEventSelect = this.onEventSelect.bind(this);
        this.base = {...props};
    }

    updateState() {
        // TODO: CHANGE STATE ONLY IF KIDS ARE MOVING
        this.props.startAction(this.base);
        //this.base = {...this.props};
    }

    checkUpdates() {
        this.addNewPosToCurrentMarkers()
            .then(kids_locations => {
                if (kids_locations.length > 0){
                    this.base.livePaths = kids_locations;
                    if (this.base.isLive) {
                        this.base.map = this.getMapByMarkers(this.base.livePaths);
                        this.updateState()
                    }
                }
            })
    }

    addNewPosToCurrentMarkers() {
        return getMyKids().then(kids => {
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

    getMapByMarkers(markers_array) {

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

    init(jwt) {
        if (jwt) {
            this.base.jwt = jwt;

            me().then(user => {
                this.base.user = user;
                this.base.map = null
                this.checkUpdates();
                setInterval(this.checkUpdates, 1000);
            })
        }
    }

    handleLogin = data => {
        login(data.email, data.password)
            .then((jwt)=>this.init(jwt));
    };

    handleRegister = data => {
        register(data.name, data.email, data.password)
            .then((jwt)=>this.init(jwt));
    };

    onKidSelect(i){
        Popup.alert('alert'+i);
    }

    onKidAdd(){
        Popup.alert('add kiddo');
    }

    onEventSelect(eventId){
        this.base={...this.props}
        if (eventId==='-1'){
            this.base.isLive=true;
            this.base.map = this.getMapByMarkers(this.base.livePaths);
            this.updateState();
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
            this.base.isLive = false;
            this.base.selectedPaths= pathToMap(event);

            this.base.map = this.getMapByMarkers(
                this.base.selectedPaths
            );
            this.updateState();
        })
    }

    render() {
        return (
            <div style={appStyle}>
                {
                    this.props.jwt == null &&
                    <div>
                        <RegisterForm onSubmit={this.handleRegister}/>
                        <LoginForm onSubmit={this.handleLogin}/>
                    </div>
                }
                {
                    this.props.jwt &&
                    <div>
                        <HasJwt
                            user={this.props.user}
                            onKidSelect={this.onKidSelect}
                            onEventSelect={this.onEventSelect}
                            onKidAdd={this.onKidAdd}
                        />
                        <Fragment>{this.props.map}</Fragment>
                        <div>
                            <IntervalExample></IntervalExample>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
