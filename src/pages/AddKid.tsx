import { TextField, Button} from '@mui/material';
import { useContext,useState } from 'react';
import { Helmet } from 'react-helmet';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
// @ts-ignore

import {registerKid} from '../containers/api'

export const AddKid = () => {
  const context = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <AddKidComponent
        key={'addkid'}/>
    </>
  );
};

const AddKidComponent = () => {

  let [kidName,setKidName]= useState('pippo')
  let [kidId,setKidId]= useState('bimbo3')

  const registerChildren = ()=>{
    if(kidName.length>0 && kidId.length>0)
      registerKid(kidName,kidId,
        45.500517,12.260485)
        .then(res=>alert(JSON.stringify(res)))
  }

  return <div>

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

  </div>
}