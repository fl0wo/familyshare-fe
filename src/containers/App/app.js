import {getMyKids, login, me, register} from '../api'
import React, {Fragment} from "react";
import {Map} from "pigeon-maps";
import {stamenToner} from 'pigeon-maps/providers'
import Popup from 'react-popup';
import {IntervalExample} from "../components/interval";
import {PathDrawer, toArray } from "../components/pathdrawer";
import {HasJwt} from "../components/profile";
import {LoginForm, RegisterForm} from "../components/auth";

const appStyle = {
    height: '250px',
    display: 'flex'
};

class App extends React.Component {

    state = {
        jwt: null,
        map: null,
        user:null,
        events:null
    }

    constructor(props) {
        super(props)
        this.updateState = this.updateState.bind(this)
        this.listenToMovements = this.listenToMovements.bind(this)
        this.onKidSelect = this.onKidSelect.bind(this);
    }

    updateState() {
        const INITIAL_POSITION = [
            {lat : 45.500557,long:12.260485,color:"#000"},
            {lat : 45.500517,long:12.260115,color:"#000"}
        ];
        this.setState({
            jwt: this.state.jwt,
            map: this.getMapByMarkers(
                [INITIAL_POSITION]
            ),
            user : this.state.user
        })
        this.listenToMovements();
    }

    listenToMovements() {
        const interval = setInterval(() => {
            this.addNewPosToCurrentMarkers()
                .then(kids_locations => {
                    if (kids_locations.length <= 0) return;
                    this.setState({
                        jwt: this.state.jwt,
                        map: this.getMapByMarkers(
                            kids_locations
                        ),
                        user : this.state.user
                    })
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

        return <Map
            provider={stamenToner}
            defaultCenter={toArray(markers_array[0][0])}
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
                    this.updateState();
                })
                /*
                myEvents().then(events=>{
                    this.updateState(user,events,jwt);
                })
                */
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
                            events={[]}
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
