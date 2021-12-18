// @ts-ignore
import { PathDrawer, toArray } from '../containers/components/pathdrawer';
import { Map } from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

const SelectedMap = (props:any) => {

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
      width={800}
      height={600}
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