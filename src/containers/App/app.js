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

class App extends React.Component {
    INITIAL_POSITION = [
        {lat : 45.500557,long:12.260485,color:"#000"},
        {lat : 45.500517,long:12.260115,color:"#000"}
    ];

    state = {
        jwt: null,
        map: null,
        user:null,
        events:null,
        isLive:true,
        selectedPaths:this.INITIAL_POSITION
    }

    constructor(props) {
        super(props)
        this.updateState = this.updateState.bind(this)
        this.listenToMovements = this.listenToMovements.bind(this)
        this.onKidSelect = this.onKidSelect.bind(this);
        this.onEventSelect = this.onEventSelect.bind(this);
    }

    updateState() {
        this.setState(this.state)
    }

    listenToMovements() {
        const interval = setInterval(() => {
            this.addNewPosToCurrentMarkers()
                .then(kids_locations => {
                    if (kids_locations.length > 0 &&
                    this.state.isLive) {
                        this.state.map = this.getMapByMarkers(kids_locations);
                        this.updateState()
                    }
                })
        }, 1000);
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

    handleLogin = data => {
        login(data.email, data.password)
            .then(jwt => {
            if (jwt) {
                this.state.jwt=jwt;

                me().then(user=>{
                    this.state.user=user;
                    this.state.map = this.getMapByMarkers(
                        [this.INITIAL_POSITION]
                    )
                    this.updateState();
                    this.listenToMovements();
                })
            }
        });
    };

    handleRegister = data => {
        register(data.name, data.email, data.password).then(jwt => {
            if (jwt) {
                this.state.jwt=jwt;

                me().then(user=>{
                    this.state.user=user;

                    this.updateState();
                })
            }
        });
    };

    onKidSelect(i){
        Popup.alert('alert'+i);
    }

    onEventSelect(eventId){
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
            this.state.isLive = false;
            this.state.selectedPaths= pathToMap(event);

            this.state.map = this.getMapByMarkers(
                this.state.selectedPaths
            );
            this.updateState();
        })
    }

    render() {
        return (
            <div style={appStyle}>
                <Popup />
                {
                    this.state.jwt == null &&
                    <div>
                        <RegisterForm onSubmit={this.handleRegister}/>
                        <LoginForm onSubmit={this.handleLogin}/>
                    </div>
                }
                {
                    this.state.jwt &&
                    <div>
                        <HasJwt
                            user={this.state.user}
                            onKidSelect={this.onKidSelect}
                            onEventSelect={this.onEventSelect}
                        />
                        <Fragment>{this.state.map}</Fragment>
                        <div>
                            <IntervalExample></IntervalExample>
                            {/*           <button onClick={this.simulateMove}>
                                Start Listening
                            </button>*/}
                        </div>
                    </div>
                }
            </div>
        );
    }

}


export default App;
