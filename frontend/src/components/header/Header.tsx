import React, { Fragment } from "react";
import { Grid, AppBar, Divider, Button, Toolbar, Typography, Slider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, LinkProps } from "react-router-dom";

import "./Header.scss";
import { ClusterDashboardState } from "../cluster-dashboard/ClusterDashboardReducer";
import {
  fetchClusterData,
  changeRefreshInterval
} from "../cluster-dashboard/ClusterDashboardActions";

const Header: React.FC = () => {
  const refreshVal = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.refreshVal);
  const refInterval = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.refInterval);
  const dispatch = useDispatch();

  const refreshIntervalSeconds = [
    { value: 0 },
    { value: 2 },
    { value: 5 },
    { value: 10 },
    { value: 30 },
    { value: 60 }
  ];

  const onRefreshIntervalChange = (event: React.ChangeEvent<{}>, value: number): void => {
    if (refreshVal === value) {
      return;
    }

    clearInterval(refInterval);

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
                marks={refreshIntervalSeconds}
                min={refreshIntervalSeconds[0].value}
                max={refreshIntervalSeconds[refreshIntervalSeconds.length - 1].value}
                step={null}
                track={false}
                valueLabelFormat={(value: number): string => `${value}s`}
                onChange={(event, value): void => {
                  typeof value == 'number' && onRefreshIntervalChange(event, value)
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