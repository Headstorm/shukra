import React, { useState, useEffect, Dispatch, SetStateAction, Fragment } from "react";
import { Grid, Typography, Slider } from "@material-ui/core";
import axios from "axios";

import { akkaClusterProps } from "./../../assets/properties/akkaClusterProps";
import "./ClusterDashboard.scss";
import ClusterListView from "./cluster-list-view/ClusterListView";
import { Cluster } from "./Cluster.model";
import SimpleSnackBar from "../shared/simple-snack-bar/SimpleSnackBar";
import ClusterGraphView from "./cluster-graph-view/ClusterGraphView";

const ClusterDashboard: React.FC = () => {
  const [cluster, setCluster]: [
    Cluster,
    Dispatch<SetStateAction<Cluster>>
  ] = useState(new Cluster());
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const refreshIntervals = [
    { value: 0 },
    { value: 2 },
    { value: 5 },
    { value: 10 },
    { value: 30 },
    { value: 60 }
  ];
  const [refreshVal, setRefreshVal] = useState(0);
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [refInterval, setRefInterval]: [any, Dispatch<SetStateAction<any>>] = useState(null);

  const loadClusterData = (): void => {
    const akkaGetClusterMembersUrl = `${akkaClusterProps["akka.management.url"]}/cluster/members`;
    const getClusterResponse = (): void => {
      axios
        .get(akkaGetClusterMembersUrl)
        .then(response => {
          if (response.status === 200) {
            const clusterData: Cluster = response.data;
            setCluster(clusterData);
          }
        })
        .catch(function (error) {
          console.log(error);
          setSnackBarMessage(
            error.message && error.message.message
              ? error.message.message
              : error.message
          );
          setOpenSnackBar(true);
        });
    };
    getClusterResponse();
  };

  const onRefreshIntervalChange = (event: React.ChangeEvent<{}>, value: number): void => {
    if (refreshVal === value) {
      return;
    }
    clearInterval(refInterval);
    setRefreshVal(value);

    if (value === 0) {
      setRefInterval(null);
      return;
    }
    setRefInterval(setInterval(loadClusterData, value * 1000));
  };

  useEffect(loadClusterData, []);

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
        <ClusterListView
          clusterData={cluster}
          refreshClusterData={loadClusterData}
        />
        <ClusterGraphView clusterData={cluster} />
        <SimpleSnackBar message={snackBarMessage} open={openSnackBar} />
      </Grid>
    </Fragment>
  );
};

export default ClusterDashboard;
