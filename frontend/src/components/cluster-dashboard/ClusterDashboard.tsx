import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";

import { akkaClusterProps } from "./../../assets/properties/akkaClusterProps";
import "./ClusterDashboard.scss";
import ClusterListView from "./cluster-list-view/ClusterListView";
import { Cluster } from "./Cluster.model";
import SimpleSnackBar from "../shared/simple-snack-bar/SimpleSnackBar";

const ClusterDashboard: React.FC = () => {
  const [cluster, setCluster]: [
    Cluster,
    Dispatch<SetStateAction<Cluster>>
  ] = useState(new Cluster());
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

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
        .catch(function(error) {
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

  useEffect(loadClusterData, []);

  return (
    <React.Fragment>
      <Grid container md item direction="row" className="shukra-body">
        <ClusterListView
          clusterData={cluster}
          refreshClusterData={loadClusterData}
        />
        <Grid item xs={9} className="shukra-right-container"></Grid>
        <SimpleSnackBar
          message={snackBarMessage}
          open={openSnackBar}
          setOpen={setOpenSnackBar}
        />
      </Grid>
    </React.Fragment>
  );
};

export default ClusterDashboard;
