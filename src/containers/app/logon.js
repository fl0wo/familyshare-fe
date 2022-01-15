import { login, me, myEvent, register } from '../api';
import React, { useRef, useState } from 'react';
import Popup from 'react-popup';

import { HasJwt } from '../components/profile';
import { LoginForm, RegisterForm } from '../components/auth';
import { setFirstTimeOnly, setLivePaths, startAction } from '../../utils/actions';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

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
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
      children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
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
            .then((jwt)=>{
                init(jwt)
            })
          .catch((err)=>{
              handleClickOpen(err.response.data);
          })
    };

    let handleRegister = data => {
        register(data.name, data.email, data.password)
            .then((jwt)=>init(jwt))
          .catch((err)=>{
              handleClickOpen(err.response.data);
          })
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

    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleClickOpen = (err) => {
        // UPDATE USER
        setErrorMsg(JSON.stringify(err.errors));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const youDonTHaveAnAccountYetRegisterHere = 'You don\'t have an account yet? Register here! 😅';
    const alreadyHaveAnAccountLoginHere = 'Already have an account? Login here! 😍';

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
                          style={underLineBtn}>
                            {
                                isLoginShowed ?
                                  youDonTHaveAnAccountYetRegisterHere
                                  :
                                  alreadyHaveAnAccountLoginHere
                            }

                        </Button>
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

            <Dialog
              key={'logon-dialog'}
              TransitionComponent={Transition}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Login failed"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { errorMsg }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Logon);
