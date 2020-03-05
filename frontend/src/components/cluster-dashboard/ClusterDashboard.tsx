import React, { useEffect, Fragment } from "react";
import { Grid, Typography, Slider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import "./ClusterDashboard.scss";
import ClusterListView from "./cluster-list-view/ClusterListView";
import SimpleSnackBar from "../shared/simple-snack-bar/SimpleSnackBar";
import ClusterGraphView from "./cluster-graph-view/ClusterGraphView";
import { fetchClusterData, changeRefreshInterval } from "./ClusterDashboardActions";
import { ClusterDashboardState } from "./ClusterDashboardReducer";

const ClusterDashboard: React.FC = () => {
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

  useEffect(() => {
    dispatch(fetchClusterData());
  }, [dispatch]);

  return (
    <Fragment>
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
      <Grid container md
        item
        direction="row"
        className="home-body">
        <ClusterListView />
        <ClusterGraphView />
        <SimpleSnackBar message={state.snackBarMessage} open={state.openSnackBar} />
      </Grid>
    </Fragment>
  );
};

export default ClusterDashboard;
