import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {
  FETCH_CLUSTER_MEMBERS_BEGIN,
  FETCH_CLUSTER_MEMBERS_SUCCESS,
  FETCH_CLUSTER_MEMBERS_FAILURE,
  ClusterDashboardActionTypes,
  CHANGE_REFRESH_INTERVAL,
  FRAME_GRAPH_DATA,
  ADD_CLUSTER_NODE_BEGIN,
  ADD_CLUSTER_NODE_SUCCESS,
  ADD_CLUSTER_NODE_FAILURE,
  OPEN_CONFIRMATION_DIALOG,
  LEAVE_DOWN_CLUSTER_NODE_BEGIN,
  LEAVE_DOWN_CLUSTER_NODE_FAILURE,
  LEAVE_DOWN_CLUSTER_NODE_SUCCESS,
  CLOSE_CONFIRMATION_DIALOG
} from './ClusterDashboardActions';
import { Cluster } from './Cluster.model';
import GraphNodeTooltip from './graph-node-tooltip/GraphNodeTooltip';

export interface ClusterDashboardState {
  cluster: Cluster;
  refreshVal: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refInterval: any;
  loading: boolean;
  graph: {};
  openSnackBar: boolean;
  snackBarMessage: string;
  openConfDialog: boolean;
  confDialogTitle: string;
  confDialogContent: string;
  confDialogData: {};
}

export const initialState: ClusterDashboardState = {
  cluster: new Cluster(),
  loading: false,
  refInterval: null,
  refreshVal: 0,
  graph: { nodes: [], edges: [] },
  openSnackBar: false,
  snackBarMessage: "",
  openConfDialog: false,
  confDialogTitle: "",
  confDialogContent: "",
  confDialogData: {}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const frameGraph = (cluster: Cluster, styles: any, nodeUrl: string, clusterUrl: string): any => {
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

  if (!cluster || !cluster.members) {
    return graph;
  }

  cluster.members.forEach((member, index) => {
    const memberTitle = <GraphNodeTooltip member={member} clusterData={cluster} />;

    const memberConfig = {
      id: index + 1,
      label: `<b>o </b>${member.node.split("://")[1]}`,
      image: nodeUrl,
      title: ReactDOMServer.renderToString(memberTitle),
      font: {
        bold: {
          color: styles[`status${member.status}Color`],
          size: 16,
          vadjust: -0.5
        },
        multi: true
      },
      ...(member.node === cluster.leader && leader),
      ...(member.node === cluster.oldest && oldest)
    };

    graph.nodes.push(memberConfig);
    graph.edges.push({ from: 0, to: index + 1 });
  });

  return graph;
}

export default function ClusterDashboardReducer(state = initialState,
  action: ClusterDashboardActionTypes): ClusterDashboardState {
  let message = "";

  switch (action.type) {
    case FETCH_CLUSTER_MEMBERS_BEGIN:
      return {
        ...state,
        loading: true,
        openSnackBar: false,
        snackBarMessage: ""
      };

    case FETCH_CLUSTER_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        cluster: action.payload.cluster,
        openSnackBar: false,
        snackBarMessage: ""
      };

    case FETCH_CLUSTER_MEMBERS_FAILURE:
      message = action.payload.error.message && action.payload.error.message.message
        ? action.payload.error.message.message : action.payload.error.message
      return {
        ...state,
        loading: false,
        cluster: new Cluster(),
        openSnackBar: true,
        snackBarMessage: message
      };

    case CHANGE_REFRESH_INTERVAL:
      return {
        ...state,
        openSnackBar: false,
        snackBarMessage: "",
        refreshVal: action.payload.state.refreshVal,
        refInterval: action.payload.state.refInterval
      };

    case FRAME_GRAPH_DATA:
      return {
        ...state,
        graph: frameGraph(state.cluster, action.payload.styles,
          action.payload.nodeUrl, action.payload.clusterUrl)
      }

    case ADD_CLUSTER_NODE_BEGIN:
      return {
        ...state,
        loading: true,
        openSnackBar: false,
        snackBarMessage: ""
      };

    case ADD_CLUSTER_NODE_SUCCESS:
      return {
        ...state,
        loading: false,
        openSnackBar: true,
        snackBarMessage: action.payload.message
      };

    case ADD_CLUSTER_NODE_FAILURE:
      message = action.payload.error.message && action.payload.error.message.message
        ? action.payload.error.message.message : action.payload.error.message
      return {
        ...state,
        loading: false,
        openSnackBar: true,
        snackBarMessage: message
      };

    case OPEN_CONFIRMATION_DIALOG:
      return {
        ...state,
        confDialogContent: action.payload.content,
        confDialogTitle: action.payload.title,
        confDialogData: action.payload.data,
        openConfDialog: true
      };

    case LEAVE_DOWN_CLUSTER_NODE_BEGIN:
      return {
        ...state,
        loading: true,
        openSnackBar: false,
        snackBarMessage: "",
        openConfDialog: false,
        confDialogTitle: "",
        confDialogContent: "",
        confDialogData: {}
      };

    case LEAVE_DOWN_CLUSTER_NODE_SUCCESS:
      return {
        ...state,
        loading: false,
        openSnackBar: true,
        snackBarMessage: action.payload.message
      };

    case LEAVE_DOWN_CLUSTER_NODE_FAILURE:
      message = action.payload.error.message && action.payload.error.message.message
        ? action.payload.error.message.message : action.payload.error.message
      return {
        ...state,
        loading: false,
        openSnackBar: true,
        snackBarMessage: message
      };

    case CLOSE_CONFIRMATION_DIALOG:
      return {
        ...state,
        openConfDialog: false
      }

    default:
      return state;
  }
}