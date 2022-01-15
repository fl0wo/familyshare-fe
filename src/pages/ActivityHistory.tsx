import { Helmet } from 'react-helmet';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { myEvent } from '../containers/api';
import { setFirstTimeOnly, setLivePaths, setSelectedPaths, startAction } from '../utils/actions';
import SelectedMap from './SelectedMap';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { ListItemButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const ActivityHistory = (props:any) => {

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

  function date_format(date:string){
    let d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1)+ " " + d.getHours() + ":"+d.getMinutes();
  }

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>

      <div key={'events'}>

        {props.user.events.length==0 &&
          <div>
            <Alert severity="info">
              <AlertTitle>{'Oh no 😢'}</AlertTitle>
              {'Never made an event with your kids?'} — <strong>
              {
                'Start a new event now inside the Current Activity tab! 🤩'
              }
            </strong>
            </Alert>
          </div>
        }

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            props.user.events.map((e:any)=>(
              // eslint-disable-next-line react/jsx-key
            <ListItemButton
              onClick={()=>onEventSelect(e._id)}>
              <ListItemAvatar>
                <Avatar>
                  <img
                    alt={e.title}
                    src={"https://eu.ui-avatars.com/api/?background=random&name="+e.title}>
                  </img>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={e.title}
                secondary={date_format(e.date_start) + " - " + date_format(e.date_end)}
              />
            </ListItemButton>
            ))
          }

        </List>


      </div>

      {
        props.selectedPaths &&
        <SelectedMap>
        </SelectedMap>
      }

    </>
  );
};

const mapStateToProps = (state:any) => ({
  ...state
});

const mapDispatchToProps = (dispatch:any) => ({
  setSelectedPaths : (paths:any)=>{
    dispatch(setSelectedPaths(paths))
  }
});


export default connect(mapStateToProps,mapDispatchToProps)(ActivityHistory);