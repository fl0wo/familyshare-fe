import { styled, Typography } from '@mui/material';
import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
// @ts-ignore
import App from '../containers/app/logon.js'
// @ts-ignore
import { IntervalExample } from '../containers/components/interval.js';
import { connect } from 'react-redux';
import { Map } from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';
// @ts-ignore
import { PathDrawer, toArray } from '../containers/components/pathdrawer.js';

const LiveMap = (props:any) => {

  function getMapByMarkers(markers_array: any[]) {
    console.log("hey rerendering live map!");
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
    {
      (props.jwt == null)  &&
      <div>
        Login first.
      </div>
    }
    {
      (props.jwt) &&
      <div>
        <div>
          <IntervalExample></IntervalExample>
        </div>
        <div>
          {props.number}
        </div>
        <Fragment key={'livemap'}>
          {getMapByMarkers(props.livePaths)}
        </Fragment>
      </div>
    }
  </div>
  );
};

const mapStateToProps = (state:any) => ({
  ...state
});

export default connect(mapStateToProps)(LiveMap);