import {register, login } from '../api'
import React, { Fragment } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import { stamenToner } from 'pigeon-maps/providers'

const appStyle = {
    height: '250px',
    display: 'flex'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const Field = React.forwardRef(({label, type,inputPlace}, ref) => {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <input ref={ref} type={type} style={inputStyle} placeholder={inputPlace}/>
        </div>
    );
});

const LoginForm = ({onSubmit}) => {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <Field ref={emailRef} inputPlace="robimeyo@gmail.com" label="Email:" type="email"/>
            <Field ref={passwordRef} label="Password:" type="password"/>
            <div>
                <button style={submitStyle} type="submit">Submit</button>
            </div>
        </form>
    );
};

const RegisterForm = ({onSubmit}) => {
    const nameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <Field ref={nameRef} label="Name:" type="text"/>
            <Field ref={emailRef} label="Email:" type="email"/>
            <Field ref={passwordRef} label="Password:" type="password"/>
            <div>
                <button style={submitStyle} type="submit">Submit</button>
            </div>
        </form>
    );
};

const HasJwt = () => {

    return (
        <div>
            <h1>Welcome to { "c" } !</h1>
            <h2>{new Date().getTime()}</h2>
        </div>
    );
    //{jwt && <div> Ha jwt </div>}
}


class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {jwt : null}
        this.updateState = this.updateState.bind(this)
    }
    updateState(jwt){
        this.setState({jwt : jwt})
    }

    handleLogin = data => {
        login(data.email, data.password).then(jwt =>{
            if(jwt){
                //alert(JSON.stringify(jwt));
                this.updateState(jwt);
            }
        });
    };

    handleRegister = data => {
        register(data.name, data.email, data.password).then(jwt =>{
            if(jwt){
                this.updateState(jwt);
            }
        });
    };

    map = (
        <Map
            provider={stamenToner}
            defaultCenter={[50.879, 4.6997]}
            defaultZoom={18}
            minZoom={18}
            maxZoom={18}
            width={1000}
            height={1000}
        >
            <Marker
                anchor={[50.874, 4.6947]}
                payload={1}
                onClick={({ event, anchor, payload }) => {
                    alert(JSON.stringify(payload));
                }}
            />
            <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
                <img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pg0KPHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+DQo8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQo8cGF0aCAgZmlsbD0ibm9uZSIgZD0iTTMgMTloMTh2Mkgzdi0yek0xMyA1LjgyOFYxN2gtMlY1LjgyOEw0LjkyOSAxMS45bC0xLjQxNC0xLjQxNEwxMiAybDguNDg1IDguNDg1LTEuNDE0IDEuNDE0TDEzIDUuODN6Ii8+DQo8L2c+PC9zdmc+"
                    width={100}
                    height={100}
                    alt=""
                    color="rgba(0,0,0,0)"
                />
                <svg height="210" width="500">
                    <line
                        x1="0"
                        y1="0"
                        x2="200"
                        y2="200"
                        stroke="rgb(255,0,0)"
                        stroke-width="10"
                    />
                </svg>
            </Overlay>
        </Map>
    );

    render(){
        return (
            <div style={appStyle}>
                {
                    this.state.jwt==null &&
                        <div>
                            <RegisterForm onSubmit={this.handleRegister}/>
                            <LoginForm onSubmit={this.handleLogin}/>
                        </div>
                }
                {
                    this.state.jwt &&
                    <HasJwt/> &&
                    <Fragment>{this.map}</Fragment>
                }
            </div>
        );
    }



}


export default App;
