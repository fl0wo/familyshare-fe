import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { PageDefault } from './components/PageDefault';

import { AppContext, ThemeModeContext } from './contexts';
import { AppClient } from './clients';
import { routes } from './config';
import { Route as AppRoute } from './types';
import { getAppTheme } from './styles/theme';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from './utils/constants';
import { connect } from 'react-redux';
import { getMyKids } from './containers/api';
import { setFirstTimeOnly, setLivePaths, startAction } from './utils/actions';

function App(props: any) {
  const [mode, setMode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(DARK_MODE_THEME);
  const appClient = new AppClient();

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode: string) => (prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME));
      }
    }),
    []
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  useEffect(() => {
    let x = 1;

    function addNewPosToCurrentMarkers() {
      return getMyKids().then(kids => {
        if (kids == null) return [];
        if (kids.data.length <= 0) return kids.data;
        return kids.data.map(kid =>
          kid.positions.map(pos => {
              return {
                lat: pos.coords.lat,
                long: pos.coords.long,
                color: kid.color
              };
            }
          )
        );
      });
    }


    function checkUpdates() {
      count();

      addNewPosToCurrentMarkers()
        .then(kids_locations => {
          if (kids_locations.length > 0) {
            props.setLivePaths(kids_locations);
          }
        });
    }

    return () => {
      setInterval(checkUpdates, 1000);
    };

    function count() {
      console.log('ehyyy' + x);
      x++;
    }
  }, [props.user]);

  const addRoute = (route: AppRoute) => (
    <Route
      key={route.key}
      path={route.path}
      component={route.component || PageDefault}
      exact />
  );

  return (
    <AppContext.Provider
      value={appClient}>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Layout>
                {routes
                  .filter((route: AppRoute) => !route.isLoginRequired || props.jwt)
                  .map((route: AppRoute) =>
                      route.subRoutes ? route.subRoutes.map((item: AppRoute) => addRoute(item)) : addRoute(route)
                  )
                }
              </Layout>
            </Switch>
          </Router>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </AppContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  ...state
});

const mapDispatchToProps = (dispatch: any) => ({
  setLivePaths: (paths: any) => {
    dispatch(setLivePaths(paths));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
