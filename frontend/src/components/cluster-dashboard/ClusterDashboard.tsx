import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import "./ClusterDashboard.scss";
import ClusterListView from "./cluster-list-view/ClusterListView";
import SimpleSnackBar from "../shared/simple-snack-bar/SimpleSnackBar";
import ClusterGraphView from "./cluster-graph-view/ClusterGraphView";
import { ClusterDashboardState } from "./ClusterDashboardReducer";

const ClusterDashboard: React.FC = () => {
  const snackBar = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.snackBar);

  return (
    <Fragment>
      <Grid container md
        item
        direction="row"
        className="home-body">
        <ClusterListView />
        <ClusterGraphView />
        <SimpleSnackBar message={snackBar.message} open={snackBar.open} />
      </Grid>
    </Fragment>
  );
};

export default ClusterDashboard;
