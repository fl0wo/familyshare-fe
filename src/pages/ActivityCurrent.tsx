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

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { updateUser } from '../utils/actions';
import "../styles/countdown.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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

  let [eventDuration,setEventDuration]= useState(30)
  let [eventTitle,setEventTitle]= useState('titolo evento')
  const [open, setOpen] = useState(false);

  const sliderLabel = 'Duration';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleErrorOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewEvent = ()=>{
    if(hasCurrentEventRunning()){
      handleErrorOpen();
    }else {
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


  }

  const handleChange = (e: Event, newValue: number | number[]) => {
    setEventDuration(newValue as number);
  };

  function getCurrentEvent() {
    return props.user.events.filter((e:any)=>{
        return new Date(e.date_end) > new Date()
      }
    )[0];
  }

  function date_format(date:string){
    let d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1)+ " " + d.getHours() + ":"+d.getMinutes();
  }

  // @ts-ignore
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  function getDurationOfCurrentEvent() {
    let ev = getCurrentEvent();
    const date1:Date = new Date(ev.date_start);
    const date2:Date = new Date(ev.date_end);
    // @ts-ignore
    const diffTime:number = Math.abs(date2 - date1);
    const diffSec = Math.ceil(diffTime / 1000);
    return diffSec;
  }

  function getInitialRemainingOfCurrentEvent() {
    let ev = getCurrentEvent();
    const date1:Date = new Date();
    const date2:Date = new Date(ev.date_end);
    // @ts-ignore
    const diffTime:number = Math.abs(date2 - date1);
    const diffSec = Math.ceil(diffTime / 1000);
    return diffSec;
  }

  function hasCurrentEventRunning() {
    return getCurrentEvent()!=null;
  }

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>

      <div key={'add-event'}>

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
        {
          hasCurrentEventRunning() &&
          <div>
            <Button disabled variant="outlined">New Event</Button>
            <Alert severity="warning">
              <AlertTitle>Attention</AlertTitle>
              Before adding a new event — <strong>
              {
                'wait for the current one to finish!😎'
              }
            </strong>
            </Alert>
          </div>
        }

        {
          !hasCurrentEventRunning() &&
          <div>
            <Button
              onClick={()=>addNewEvent()}
              variant="outlined">New Event</Button>
          </div>
        }

      </div>

      {
        hasCurrentEventRunning() &&
        <div>
          <p>
            Title :
            {
              getCurrentEvent().title
            }
          </p>
          <p>
            Duration Range :
            {
              date_format(getCurrentEvent().date_start) + ' - ' +
              date_format(getCurrentEvent().date_end)
            }
          </p>

          <div>
            Children of this particular event:
            <List dense={true}>
              {
                getCurrentEvent().childrens.map((kid: any, i: number) => (
                  <ListItem key={kid._id}>
                    <ListItemText
                      primary={kid.name}
                      secondary={'['+kid.id+']'}
                    />
                  </ListItem>
                ))
              }
            </List>
          </div>

          <div>
            <div className="timer-wrapper">
              <CountdownCircleTimer
                isPlaying
                duration={getDurationOfCurrentEvent()}
                initialRemainingTime={getInitialRemainingOfCurrentEvent()}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[getDurationOfCurrentEvent(),
                  getDurationOfCurrentEvent()/4,
                  getDurationOfCurrentEvent()/2,
                  0]}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
            <p className="info">
              Estimated duration of the event currently running.
            </p>
          </div>
        </div>
      }

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