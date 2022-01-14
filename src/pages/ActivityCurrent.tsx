import { Helmet } from 'react-helmet';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { me, myEvent, registerKid, myEventAdd } from '../containers/api';
import { setFirstTimeOnly, setLivePaths, setSelectedPaths, startAction } from '../utils/actions';
import SelectedMap from './SelectedMap';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { ListItemButton, Slider, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import { updateUser } from '../utils/actions';


const ActivityCurrent = (props:any) => {

  function onEventSelect(eventId:string){

    function pathToMap(event:any) {
      return event.data.paths
        .filter((pa:any)=>pa.positions.length>0)
        .map((pa:any)=>{
          return pa.positions
            .map((po:any) => ({
              ...po.coords,
              color:pa.color
            }))
        });
    }

    myEvent(eventId).then(event=>{
      if(event==null)return;
      let paths = pathToMap(event);
      props.setSelectedPaths(paths)
    })
  }

  //TODO: fix date
  function date_format(date:string){
    let d = new Date(date);
    return d.getMonth()+"/"+d.getDay()+ " " + d.getHours() + ":"+d.getMinutes();
  }

  let [eventDuration,setEventDuration]= useState(30)
  let [eventTitle,setEventTitle]= useState('titolo evento')
  const [open, setOpen] = useState(false);

  const sliderLabel = 'Duration';

  const handleClickOpen = () => {
    // UPDATE USER
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewEvent = ()=>{
    if(eventDuration>0 && eventTitle.length>0)
      myEventAdd(eventTitle, eventDuration + '')
        .then(res=>{
          me().then(response=>{
            props.updateUser(response.data);
            handleClickOpen();
          });
        })
        .catch(err=>{
          alert("Error");
        })
  }

  const handleChange = (e: Event, newValue: number | number[]) => {
    setEventDuration(newValue as number);
  };

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div>
        Ciao Activity Current
      </div>

      <div key={'add-event'}>

      </div>

      <TextField id="outlined-basic"
                 label="title"
                 value={eventTitle}
                 onChange={e=>setEventTitle(e.target.value)}
                 variant="outlined" />

      <div>
        <p>Duration</p>
        <Slider
          defaultValue={30}
          min={5}
          max={120}
          getAriaLabel={() => 'Duration'}
          aria-valuetext={sliderLabel}
          value={eventDuration}
          onChange={handleChange}
          valueLabelDisplay="auto" />
      </div>

      <Button
        onClick={()=>addNewEvent()}
        variant="outlined">New Event</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Aggiunta nuovo evento"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nuovo evento iniziato!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

const mapStateToProps = (state:any) => ({
  ...state
});

const mapDispatchToProps = (dispatch:any) => ({
  setSelectedPaths : (paths:any)=>{
    dispatch(setSelectedPaths(paths))
  },
  updateUser: (user:any) => {
    dispatch(updateUser(user))
  },
});


export default connect(mapStateToProps,mapDispatchToProps)(ActivityCurrent);