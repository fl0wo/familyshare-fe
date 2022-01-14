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
import useWindowDimensions from '../utils/window-dimensions';

const LiveMap = (props:any) => {

  const { height, width } = useWindowDimensions();

  function min(a:number,b:number){
    return a<b?a:b;
  }

  function getMapByMarkers(markers_array: any[]) {
    console.log("hey rerendering live map!");
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

      <div>
        width: {width} ~ height: {height}
      </div>

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