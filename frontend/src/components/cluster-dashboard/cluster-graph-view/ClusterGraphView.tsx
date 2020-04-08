import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Graph from "react-graph-vis";
import "./../../../../node_modules/vis-network/dist/vis-network.css";

import "./ClusterGraphView.scss";
import styles from "./ClusterGraphView.module.scss";
import { ClusterDashboardState } from "../ClusterDashboardReducer";
import { frameGraphData } from "./../ClusterDashboardActions";

const ClusterGraphView: React.FC = () => {
  const cluster = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.cluster);
  const graph = useSelector(
    (state: { dashboard: ClusterDashboardState }) => state.dashboard.graph);
  const dispatch = useDispatch();
  const [env] = useState(process.env.NODE_ENV);

  const clusterSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
      <foreignObject x="8.5" y="17" width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml"  
          style="font-size:10px; font-family:'Segoe UI'; font-weight:bold; font-style:italic">
          <span style="color:${styles.primaryColor}">Cluster</span>
        </div>
      </foreignObject>
    </svg>`;
  const clusterUrl =
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(clusterSvg)}`;
  const nodeSvg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
      <foreignObject x="10" y="15" width="100%" height="100%"> 
        <div xmlns="http://www.w3.org/1999/xhtml" 
          style="font-size:12px; font-family:'Segoe UI'; font-weight:bold;  font-style:italic">
          <span style="color:${styles.secondaryThemeColor}">Node</span>
        </div>
      </foreignObject>
    </svg>`;
  const nodeUrl =
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(nodeSvg)}`;

  const options = {
    nodes: {
      shape: "circularImage",
      borderWidth: 0.5,
      borderWidthSelected: 1,
      color: {
        border: "transparent",
        background: styles.primaryThemeColor,
        highlight: {
          border: styles.primaryThemeColor,
          background: styles.primaryThemeColorLighter
        },
        hover: {
          border: styles.primaryThemeColor,
          background: styles.primaryThemeColorLighter
        }
      },
      font: {
        color: styles.primaryColor
      },
      shadow: false
    },
    edges: {
      color: {
        color: styles.secondaryColor,
        hover: styles.primaryColor,
        highlight: styles.primaryColor,
        opacity: 0.8
      },
      width: 2,
      selectionWidth: 0.5,
      hoverWidth: 0.5
    },
    interaction: {
      hover: true,
      navigationButtons: true
    },
    physics: {
      barnesHut: {
        avoidOverlap: 0.2
      },
      minVelocity: 0.75
    }
  };

  useEffect(() => {
    dispatch(frameGraphData(styles, nodeUrl, clusterUrl));
  }, [cluster, dispatch, nodeUrl, clusterUrl]);

  return (
    <Fragment>
      <Grid item xs={9}
        className="home-right-container">
        <div className="home-visual-title">CLUSTER VISUAL VIEW</div>
        <div className="home-visual-wrapper">
          {
            env !== "test" && (<Graph graph={graph} options={options}
              events={{}} />)
          }
          <div className="legend-wrapper">
            <div className="legend-content">
              <span className="legend-icon disp-inline-blk leader"></span>
              <span className="legend-text disp-inline-blk">Leader Node</span>
            </div>
            <div className="legend-content">
              <span className="legend-icon disp-inline-blk oldest"></span>
              <span className="legend-text disp-inline-blk">Oldest Node</span>
            </div>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

export default ClusterGraphView;
