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


export default connect(mapStateToProps,mapDispatchToProps)(ActivityCurrent);