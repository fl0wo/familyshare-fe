// @ts-ignore
import { PathDrawer, toArray } from '../containers/components/pathdrawer';
import { Map } from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useWindowDimensions from '../utils/window-dimensions';

const SelectedMap = (props:any) => {

  const { height, width } = useWindowDimensions();

  function min(a:number,b:number){
    return a<b?a:b;
  }

  function getMapByMarkers(markers_array: any[]) {
    if (markers_array.length<=0)
      return (<div>No paths recorded during this activity.</div>)

    let center = markers_array.length>0?
      toArray(markers_array[0][0]) :
      null

    return <Map
      provider={stamenToner}
      defaultCenter={center}
      defaultZoom={18}
      width={min(800,width-(width*20/100))}
      height={min(600,height-(height*20/100))}
    >
      <PathDrawer kidsPaths={markers_array}/>
    </Map>;
  }

  return (

        <div>
          <Fragment key={'selectedmap'}>
            {getMapByMarkers(props.selectedPaths)}
          </Fragment>
        </div>
  );
};

const mapStateToProps = (state:any) => ({
  ...state
});

export default connect(mapStateToProps,null)(SelectedMap);