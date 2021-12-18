import { Helmet } from 'react-helmet';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { myEvent } from '../containers/api';
import { setFirstTimeOnly, setLivePaths, setSelectedPaths, startAction } from '../utils/actions';
import SelectedMap from './SelectedMap';

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

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div>
        Ciao Activity History
      </div>

      <div key={'events'}>
        {
          props.user.events.map((e:any)=>(
            <button key={e.title} onClick={()=>onEventSelect(e._id)}>
              {e.title}
            </button>
          ))
        }

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