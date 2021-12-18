import { TextField} from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// @ts-ignore

import { me, registerKid } from '../containers/api';
import { connect } from 'react-redux';
import { updateUser } from '../utils/actions';

const mapStateToProps = (state:any) => ({
  ...state
});

const mapDispatchToProps = (dispatch:any) => ({
  updateUser: (user:any) => {
    dispatch(updateUser(user))
  },
});
const AddKid = (props:any) => {

  let [kidName,setKidName]= useState('pippo')
  let [kidId,setKidId]= useState('bimbo3')
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    // UPDATE USER
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const registerChildren = ()=>{
    if(kidName.length>0 && kidId.length>0)
      registerKid(kidName,kidId,
        45.500517,12.260485)
        .then(res=>{
          me().then(response=>{
            props.updateUser(response.data);
            handleClickOpen();
          })
        })
        .catch(err=>{
          alert("Error");
        })
  }

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div>

        <TextField id="outlined-basic"
                   label="QRCODE"
                   value={kidId}
                   onChange={e=>setKidId(e.target.value)}
                   variant="outlined" />

        <TextField id="outlined-basic"
                   label="kidName"
                   value={kidName}
                   onChange={e=>setKidName(e.target.value)}
                   variant="outlined" />

        <Button
          onClick={()=>registerChildren()}
          variant="outlined">AddKid</Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Registrazione nuovo bambino"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bambino aggiunto correttamente
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
      </>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(AddKid);