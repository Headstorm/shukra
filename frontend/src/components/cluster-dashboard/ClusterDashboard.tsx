import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';

import { akkaClusterProps } from './../../assets/properties/akkaClusterProps';
import './ClusterDashboard.scss';
import ClusterListView from './cluster-list-view/ClusterListView';
import { Cluster } from './Cluster.model';

const ClusterDashboard: React.FC = () => {
  
  const [cluster, setCluster]: [Cluster, Dispatch<SetStateAction<Cluster>>] = useState(new Cluster());

  const loadClusterData = (): void => {
    const akkaGetClusterMembersUrl = akkaClusterProps["akka.management.url"] + "/cluster/members";
    const getClusterResponse = (): void => {
      axios.get(akkaGetClusterMembersUrl)
        .then(response => {
          if(response.status === 200) { 
            //console.log(response.data)
            const clusterData: Cluster = response.data;
            setCluster(clusterData)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    };
    getClusterResponse();
  }

  useEffect(loadClusterData, []);

  return (
    <React.Fragment>
      <Grid container md item direction="row" className="shukra-body">
        <ClusterListView clusterData={cluster} refreshClusterData={loadClusterData}/>
        <Grid item xs={9} className="shukra-right-container">
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ClusterDashboard;