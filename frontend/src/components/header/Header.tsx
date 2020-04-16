import React, { Fragment, useEffect, useCallback } from "react";
import { Grid, AppBar, Divider, Button, Toolbar, Typography, Slider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, LinkProps } from "react-router-dom";

import "./Header.scss";
import { ClusterDashboardState } from "../../reducers/dash";
import {
  fetchClusterData,
  changeRefreshInterval
} from "../../actions/dash";

const Header: React.FC = () => {

  const dispatch = useDispatch();
  const autoRefresh = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.autoRefresh);

  const refreshIntervalSeconds = [
    { value: 0 },
    { value: 2 },
    { value: 5 },
    { value: 10 },
    { value: 30 },
    { value: 60 }
  ];

  const onRefreshIntervalChange = useCallback((value: number): void => {
    if (autoRefresh.value === value) {
      return;
    }

    clearInterval(autoRefresh.interval);

    let interval = null;
    if (value !== 0) {
      interval = setInterval(() => {
        dispatch(fetchClusterData());
      }, value * 1000);
    }

    dispatch(changeRefreshInterval({ value: value, interval: interval }));
  }, [autoRefresh.interval, autoRefresh.value, dispatch]);

  useEffect(() => {
    // Sets refresh interval when component renders for the first time
    onRefreshIntervalChange(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RouteLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  RouteLink.displayName = "";

  return (
    <Fragment>
      <Grid item md
        className="app-header">
        <AppBar position="static">
          <Toolbar>
            <a className="logo" href="/">
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
                defaultValue={2}
                valueLabelDisplay="auto"
                marks={refreshIntervalSeconds}
                min={refreshIntervalSeconds[0].value}
                max={refreshIntervalSeconds[refreshIntervalSeconds.length - 1].value}
                step={null}
                track={false}
                valueLabelFormat={(value: number): string => `${value}s`}
                onChange={(event, value): void => {
                  typeof value == 'number' && onRefreshIntervalChange(value)
                }}
              />
              <span className="refresh-slider-label disp-inline-blk">
                {`${refreshIntervalSeconds[refreshIntervalSeconds.length - 1].value}s`}
              </span>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
    </Fragment>
  );
}

export default Header;