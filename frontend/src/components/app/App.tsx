import React, { Fragment } from 'react';
import {
  Toolbar, AppBar, Grid, CssBaseline,
  Button, Divider, Typography, Slider
} from '@material-ui/core';
import { BrowserRouter as Router, Link, LinkProps } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import AppRouting from './AppRouting';
import { ClusterDashboardState } from '../cluster-dashboard/ClusterDashboardReducer';
import {
  fetchClusterData,
  changeRefreshInterval
} from '../cluster-dashboard/ClusterDashboardActions';

const App: React.FC = () => {
  const state: ClusterDashboardState = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard);
  const dispatch = useDispatch();
  const refreshIntervals = [
    { value: 0 },
    { value: 2 },
    { value: 5 },
    { value: 10 },
    { value: 30 },
    { value: 60 }
  ];

  const onRefreshIntervalChange = (event: React.ChangeEvent<{}>, value: number): void => {
    if (state.refreshVal === value) {
      return;
    }

    clearInterval(state.refInterval);

    let interval = null;
    if (value !== 0) {
      interval = setInterval(() => {
        dispatch(fetchClusterData());
      }, value * 1000);
    }

    dispatch(changeRefreshInterval({ refreshVal: value, refInterval: interval }));
  };

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
                    <img className="vert-align-middle" src="invertedlogo.png"
                      alt="Shukra logo"></img>
                  </a>
                  <Divider orientation="vertical" />
                  <div className="nav-button-group">
                    <Button color="default" component={RouteLink}
                      to="/home">Home</Button>
                  </div>
                  <div className="auto-refresh-wrapper">
                    <Typography className="disp-inline-blk">
                      REFRESH RATE
                      </Typography>
                    <span className="refresh-slider-label disp-inline-blk">OFF</span>
                    <Slider
                      defaultValue={0}
                      valueLabelDisplay="auto"
                      marks={refreshIntervals}
                      min={refreshIntervals[0].value}
                      max={refreshIntervals[refreshIntervals.length - 1].value}
                      step={null}
                      track={false}
                      valueLabelFormat={(value: number): string => `${value}s`}
                      onChange={(event, value): void => {
                        typeof value == 'number' && onRefreshIntervalChange(event, value)
                      }}
                    />
                    <span className="refresh-slider-label disp-inline-blk">
                      {`${refreshIntervals[refreshIntervals.length - 1].value}s`}
                    </span>
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
