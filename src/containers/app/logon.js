import { login, me, myEvent, register } from '../api';
import React, { useRef, useState } from 'react';
import Popup from 'react-popup';

import { HasJwt } from '../components/profile';
import { LoginForm, RegisterForm } from '../components/auth';
import { setFirstTimeOnly, setLivePaths, startAction } from '../../utils/actions';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';

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
    let [isLoginShowed,setShowLogin]= useState(true)

    const underLineBtn={
        textDecoration: 'underline',
        backgroundColor: 'Transparent',
        backgroundRepeat:'no-repeat',
        border: 'none',
        cursor:'pointer',
        overflow: 'hidden',
        outline: 'none',
    }

    function updateState() {
        base.number++;
        props.startAction(base);
        setBase(base);
    }

    function init(jwt) {
        if (jwt) {
            base.jwt = jwt;

            me().then(response => {
                base.user = response.data;
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

    function showRegister() {
        setShowLogin(!isLoginShowed);
    }

    return (
        <div style={appStyle}>
            {
                (base.jwt == null)  &&
                <div>
                    {
                        (isLoginShowed===false) &&
                        <RegisterForm onSubmit={handleRegister}/>
                    }
                    {
                        (isLoginShowed===true) &&
                        <LoginForm onSubmit={handleLogin}/>
                    }
                    <div>
                        <Button
                          onClick={showRegister}
                          style={underLineBtn}>You don&apos;t have an account yet? Press here to register</Button>
                    </div>
                </div>
            }
            {
                (base.jwt || logon) &&
                <div>
                    <HasJwt
                        user={base.user}
                        onKidSelect={onKidSelect}
                        onKidAdd={onKidAdd}
                    />
                </div>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Logon);
