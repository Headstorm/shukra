import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Grid } from "@material-ui/core";
import Graph from "react-graph-vis";
import "./../../../../node_modules/vis-network/dist/vis-network.css";

import "./ClusterGraphView.scss";
import styles from "./ClusterGraphView.module.scss";
import { Cluster } from "../Cluster.model";

type ClusterGraphViewProps = {
  clusterData: Cluster;
};

const ClusterGraphView: React.FC<ClusterGraphViewProps> = (
  props: ClusterGraphViewProps
) => {
  const clusterSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">' +
    '<foreignObject x="8.5" y="17" width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml" ' +
    "style=\"font-size:10px; font-family:'Segoe UI'; font-weight:bold; font-style:italic\">" +
    '<span style="color:' +
    styles.primaryColor +
    '">' +
    " Cluster</span>" +
    "</div>" +
    "</foreignObject>" +
    "</svg>";
  const clusterUrl =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(clusterSvg);
  const nodeSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">' +
    '<foreignObject x="10" y="15" width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml" ' +
    "style=\"font-size:12px; font-family:'Segoe UI'; font-weight:bold;  font-style:italic\">" +
    '<span style="color:' +
    styles.secondaryThemeColor +
    '">' +
    " Node</span>" +
    "</div>" +
    "</foreignObject>" +
    "</svg>";
  const nodeUrl =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(nodeSvg);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

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

  const loadGraphData = (): void => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const frameGraphData = (clusterData: Cluster): any => {
      const leader = {
        shadow: {
          enabled: true,
          color: styles.leaderNodeColor,
          size: 15,
          x: 1,
          y: 1
        }
      };
      const oldest = {
        borderWidth: 3,
        borderWidthSelected: 0,
        color: {
          border: styles.oldestNodeColor,
          highlight: { border: styles.oldestNodeColor },
          hover: { border: styles.oldestNodeColor }
        },
        shapeProperties: { borderDashes: [10, 10] }
      };
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      const graph: any = {
        nodes: [
          {
            id: 0,
            label: "Akka Cluster",
            image: clusterUrl,
            size: 40,
            borderWidth: 1,
            borderWidthSelected: 2,
            color: {
              border: styles.primaryColor,
              background: styles.secondaryColor,
              highlight: {
                border: styles.primaryColor,
                background: styles.secondaryColorLighter
              },
              hover: {
                border: styles.primaryColor,
                background: styles.secondaryColorLighter
              }
            }
          }
        ],
        edges: []
      };

      if (!clusterData || !clusterData.members) {
        return graph;
      }

      clusterData.members.forEach((member, index) => {
        const memberTitle = (
          <React.Fragment>
            <div>
              <span className="font-bold disp-inline-blk">node : </span>
              <span
                className={
                  "status disp-inline-blk " + member.status.toLowerCase()
                }
              ></span>
              <span className="disp-inline-blk">{member.node}</span>
            </div>
            <div>
              <span className="font-bold">nodeUid : </span>
              <span>{member.nodeUid}</span>
            </div>
            <div>
              <span className="font-bold">status : </span>
              <span>{member.status.toLowerCase()}</span>
            </div>
            <div>
              <span className="font-bold">roles : </span>
              <span>{member.roles.join(", ")}</span>
            </div>
            <div>
              {member.node === clusterData.oldest && (
                <span className="type oldest disp-inline-blk">Oldest</span>
              )}
              {member.node === clusterData.leader && (
                <span className="type leader disp-inline-blk">Leader</span>
              )}
            </div>
          </React.Fragment>
        );

        const memberConfig = {
          id: index + 1,
          label: "<b>o </b>" + member.node.split("://")[1],
          image: nodeUrl,
          title: ReactDOMServer.renderToString(memberTitle),
          font: {
            bold: {
              color: styles[`status${member.status}Color`],
              size: 16
            },
            multi: true
          },
          ...(member.node === clusterData.leader && leader),
          ...(member.node === clusterData.oldest && oldest)
        };

        graph.nodes.push(memberConfig);
        graph.edges.push({ from: 0, to: index + 1 });
      });

      setGraphData(graph);
    };

    frameGraphData(props.clusterData);
  };

  useEffect(loadGraphData, [props.clusterData]);

  return (
    <React.Fragment>
      <Grid item xs={9} className="shukra-right-container">
        <div className="shukra-visual-title">CLUSTER VISUAL VIEW</div>
        <div className="shukra-visual-wrapper">
          <Graph graph={graphData} options={options} events={{}} />
          <div className="legend-wrapper">
            <div className="legend-content">
              <span className="legend-icon disp-inline-blk leader"></span>
              <span className="legend-text disp-inline-blk">Oldest Node</span>
            </div>
            <div className="legend-content">
              <span className="legend-icon disp-inline-blk oldest"></span>
              <span className="legend-text disp-inline-blk">Leader Node</span>
            </div>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default ClusterGraphView;
