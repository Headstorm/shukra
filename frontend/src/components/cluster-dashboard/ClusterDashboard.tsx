import React, { useEffect, Fragment } from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import "./ClusterDashboard.scss";
import ClusterListView from "./cluster-list-view/ClusterListView";
import SimpleSnackBar from "../shared/simple-snack-bar/SimpleSnackBar";
import ClusterGraphView from "./cluster-graph-view/ClusterGraphView";
import { fetchClusterData } from "./ClusterDashboardActions";
import { ClusterDashboardState } from "./ClusterDashboardReducer";

const ClusterDashboard: React.FC = () => {
  const state: ClusterDashboardState = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClusterData());
  }, [dispatch]);

  return (
    <Fragment>
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
