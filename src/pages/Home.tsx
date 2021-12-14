import { styled, Typography } from '@mui/material';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

import logo from '../logo.svg';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
// @ts-ignore
import App from '../containers/app/app.js'

export const Home = () => {
  const context = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <App
        key={'app'}/>
    </>
  );
};