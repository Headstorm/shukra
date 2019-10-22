import React from 'react';
import './ClusterDashboard.scss';
import { Grid, Paper } from '@material-ui/core';

const ClusterDashboard: React.FC = () => {
  return (
    <React.Fragment>
      <Grid container md item direction="row" className="shukra-body">
        <Grid item xs={3}>
          <Paper></Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ClusterDashboard;