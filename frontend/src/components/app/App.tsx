import React, { Fragment } from 'react';
import { Toolbar, AppBar, Grid, CssBaseline, Typography, Button, Divider } from '@material-ui/core';
import { BrowserRouter as Router, Link, LinkProps } from "react-router-dom";

import './App.scss';
import AppRouting from './AppRouting';

const App: React.FC = () => {

  const RouteLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  RouteLink.displayName = "";

  return (
    <Fragment>
      <CssBaseline />
      <div className="app-container">
        <Router>
          <Grid container direction="column"
            justify="flex-start" alignItems="stretch">
            <Grid item md
              className="app-header">
              <AppBar position="static">
                <Toolbar>
                  <a className="logo" href="/home">
                    <img className="vert-align-middle" src="logo.jpg"
                      alt="Shukra logo"></img>
                  </a>
                  <Typography className="heading" variant="h5"
                    noWrap>
                    SHUKRA
                  </Typography>
                  <Divider orientation="vertical" />
                  <div className="nav-button-group">
                    <Button color="default" component={RouteLink}
                      to="/home">Home</Button>
                  </div>
                </Toolbar>
              </AppBar>
            </Grid>
            <AppRouting></AppRouting>
            <Grid item md
              className="app-footer">
              <AppBar position="fixed">
                <Toolbar>
                  <div className="brand">Powered By
                    <a href="https://www.headstorm.com">HEADSTORM, LLC.</a>
                  </div>
                </Toolbar>
              </AppBar>
            </Grid>
          </Grid>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
