/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import axios from "axios";
import querystring from "query-string";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import GraphNodeTooltip from './graph-node-tooltip/GraphNodeTooltip';
import { Cluster } from "./Cluster.model";
import { ClusterDashboardState, initialState } from "./ClusterDashboardReducer";
import stripJsonComments from "strip-json-comments";

export const FETCH_CLUSTER_MEMBERS_BEGIN = 'FETCH_CLUSTER_MEMBERS_BEGIN';
export const FETCH_CLUSTER_MEMBERS_SUCCESS = 'FETCH_CLUSTER_MEMBERS_SUCCESS';
export const FETCH_CLUSTER_MEMBERS_FAILURE = 'FETCH_CLUSTER_MEMBERS_FAILURE';
export const CHANGE_REFRESH_INTERVAL = 'CHANGE_REFRESH_INTERVAL';
export const FRAME_GRAPH_DATA = 'FRAME_GRAPH_DATA';
export const ADD_CLUSTER_NODE_BEGIN = 'ADD_CLUSTER_NODE_BEGIN';
export const ADD_CLUSTER_NODE_SUCCESS = 'ADD_CLUSTER_NODE_SUCCESS';
export const ADD_CLUSTER_NODE_FAILURE = 'ADD_CLUSTER_NODE_FAILURE';
export const OPEN_CONFIRMATION_DIALOG = 'OPEN_CONFIRMATION_DIALOG';
export const LEAVE_DOWN_CLUSTER_NODE_BEGIN = 'LEAVE_DOWN_CLUSTER_NODE_BEGIN';
export const LEAVE_DOWN_CLUSTER_NODE_SUCCESS = 'LEAVE_DOWN_CLUSTER_NODE_SUCCESS';
export const LEAVE_DOWN_CLUSTER_NODE_FAILURE = 'LEAVE_DOWN_CLUSTER_NODE_FAILURE';
export const CLOSE_CONFIRMATION_DIALOG = 'CLOSE_CONFIRMATION_DIALOG';
export const CHANGE_AKKA_URL = 'CHANGE_AKKA_URL';
export const FETCH_AKKA_PROPS_BEGIN = 'FETCH_AKKA_PROPS_BEGIN';
export const FETCH_AKKA_PROPS_SUCCESS = 'FETCH_AKKA_PROPS_SUCCESS';
export const FETCH_AKKA_PROPS_FAILURE = 'FETCH_AKKA_PROPS_FAILURE';

interface FetchClusterMembersBeginAction {
  type: typeof FETCH_CLUSTER_MEMBERS_BEGIN;
}

interface FetchClusterMembersSuccessAction {
  type: typeof FETCH_CLUSTER_MEMBERS_SUCCESS;
  payload: { cluster: Cluster };
}

interface FetchClusterMembersFailureAction {
  type: typeof FETCH_CLUSTER_MEMBERS_FAILURE;
  payload: { cluster: Cluster; error: any };
}

interface ChangeRefreshIntervalAction {
  type: typeof CHANGE_REFRESH_INTERVAL;
  payload: { state: { value: number; interval: any } };
}

interface FrameGraphDataAction {
  type: typeof FRAME_GRAPH_DATA;
  payload: { graph: {nodes: any[], edges: any[]} };
}

interface AddClusterNodeBeginAction {
  type: typeof ADD_CLUSTER_NODE_BEGIN;
}

interface AddClusterNodeSuccessAction {
  type: typeof ADD_CLUSTER_NODE_SUCCESS;
  payload: { message: string };
}

interface AddClusterNodeFailureAction {
  type: typeof ADD_CLUSTER_NODE_FAILURE;
  payload: { error: any };
}

interface OpenConfirmationDialogAction {
  type: typeof OPEN_CONFIRMATION_DIALOG;
  payload: { title: string; content: string; data: {} };
}

interface LeaveDownClusterNodeBeginAction {
  type: typeof LEAVE_DOWN_CLUSTER_NODE_BEGIN;
}

interface LeaveDownClusterNodeSuccessAction {
  type: typeof LEAVE_DOWN_CLUSTER_NODE_SUCCESS;
  payload: { message: string };
}

interface LeaveDownClusterNodeFailureAction {
  type: typeof LEAVE_DOWN_CLUSTER_NODE_FAILURE;
  payload: { error: any };
}

interface CloseConfirmationDialogAction {
  type: typeof CLOSE_CONFIRMATION_DIALOG;
}

interface ChangeAkkaUrlAction {
  type: typeof CHANGE_AKKA_URL;
  payload: { url: string };
}

interface FetchAkkaPropsBeginAction {
  type: typeof FETCH_AKKA_PROPS_BEGIN;
}

interface FetchAkkaPropsSuccessAction {
  type: typeof FETCH_AKKA_PROPS_SUCCESS;
  payload: typeof initialState.akkaProps;
}

interface FetchAkkaPropsFailureAction {
  type: typeof FETCH_AKKA_PROPS_FAILURE;
  payload: { error: any };
}

export const fetchClusterMembersBegin = (): FetchClusterMembersBeginAction => ({
  type: FETCH_CLUSTER_MEMBERS_BEGIN
});

export const fetchClusterMembersSuccess = (cluster: Cluster): FetchClusterMembersSuccessAction => {
  return({
  type: FETCH_CLUSTER_MEMBERS_SUCCESS,
  payload: { cluster: cluster }
})};

export const fetchClusterMembersFailure = (error: any): FetchClusterMembersFailureAction => ({
  type: FETCH_CLUSTER_MEMBERS_FAILURE,
  payload: { cluster: new Cluster(), error: error }
});

export const changeRefreshInterval =
  (state: { value: number; interval: any }): ChangeRefreshIntervalAction => ({
    type: CHANGE_REFRESH_INTERVAL,
    payload: { state: state }
  });

export const frameGraphData = (graph: {nodes: any[], edges: any[]}):
  FrameGraphDataAction => ({
    type: FRAME_GRAPH_DATA,
    payload: { graph },
  });

export const addClusterNodeBegin = (): AddClusterNodeBeginAction => ({
  type: ADD_CLUSTER_NODE_BEGIN
});

export const addClusterNodeSuccess = (message: string): AddClusterNodeSuccessAction => ({
  type: ADD_CLUSTER_NODE_SUCCESS,
  payload: { message: message }
});

export const addClusterNodeFailure = (error: any): AddClusterNodeFailureAction => ({
  type: ADD_CLUSTER_NODE_FAILURE,
  payload: { error: error }
});

export const openConfirmationDialog = (title: string, content: string, data: {}):
  OpenConfirmationDialogAction => ({
    type: OPEN_CONFIRMATION_DIALOG,
    payload: { title: title, content: content, data: data }
  });

export const leaveDownClusterNodeBegin = (): LeaveDownClusterNodeBeginAction => ({
  type: LEAVE_DOWN_CLUSTER_NODE_BEGIN
});

export const leaveDownClusterNodeSuccess = (message: string):
  LeaveDownClusterNodeSuccessAction => ({
    type: LEAVE_DOWN_CLUSTER_NODE_SUCCESS,
    payload: { message: message }
  });

export const leaveDownClusterNodeFailure = (error: any): LeaveDownClusterNodeFailureAction => ({
  type: LEAVE_DOWN_CLUSTER_NODE_FAILURE,
  payload: { error: error }
});

export const closeConfirmationDialog = (): CloseConfirmationDialogAction => ({
  type: CLOSE_CONFIRMATION_DIALOG
});

export const changeAkkaUrl = (url: string): ChangeAkkaUrlAction => ({
  type: CHANGE_AKKA_URL,
  payload: { url: url }
});

export const fetchAkkaPropsBegin = (): FetchAkkaPropsBeginAction => ({
  type: FETCH_AKKA_PROPS_BEGIN
});

export const fetchAkkaPropsSuccess = (akkaProps: typeof initialState.akkaProps):
  FetchAkkaPropsSuccessAction => ({
    type: FETCH_AKKA_PROPS_SUCCESS,
    payload: akkaProps
  });

export const fetchAkkaPropsFailure = (error: any): FetchAkkaPropsFailureAction => ({
  type: FETCH_AKKA_PROPS_FAILURE,
  payload: { error: error }
});

export function fetchClusterData() {
  return (dispatch: Dispatch<ClusterDashboardActionTypes>,
    getState: () => { dashboard: ClusterDashboardState }): any => {
    dispatch(fetchClusterMembersBegin());
    const akkaManagementUrl = getState().dashboard.akkaProps.managementUrl;
    return axios
      .get(`${akkaManagementUrl}/cluster/members`)
      .then(response => {
				console.log("TCL: fetchClusterData -> response ", response)
        dispatch(fetchClusterMembersSuccess(response.data))
      })
      .catch(error => dispatch(fetchClusterMembersFailure(error)));
  };
}

export function addClusterNode(nodeAddress: string) {
  return (dispatch: Dispatch<ClusterDashboardActionTypes>,
    getState: () => { dashboard: ClusterDashboardState }): any => {
    dispatch(addClusterNodeBegin());
    const akkaManagementUrl = getState().dashboard.akkaProps.managementUrl;
    return axios
      .post(
        `${akkaManagementUrl}/cluster/members`,
        querystring.stringify({ address: nodeAddress.trim() }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(response => {
        if (response.status === 200) dispatch(addClusterNodeSuccess(response.data.message));
        setTimeout(() => { fetchClusterData()(dispatch, getState); }, 1000);
      })
      .catch(error => {
        dispatch(addClusterNodeFailure(error));
      });
  };
}

export function leaveDownClusterNode(nodeAddress: string, mode: string) {
  return (dispatch: Dispatch<ClusterDashboardActionTypes>,
    getState: () => { dashboard: ClusterDashboardState }): any => {
    dispatch(leaveDownClusterNodeBegin());
    const akkaManagementUrl = getState().dashboard.akkaProps.managementUrl;
    return axios
      .put(
        `${akkaManagementUrl}/cluster/members/${nodeAddress.split("://")[1]}`,
        querystring.stringify({ operation: mode }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(response => {
        if (response.status === 200) dispatch(leaveDownClusterNodeSuccess(response.data.message));
        setTimeout(() => { fetchClusterData()(dispatch, getState); }, 1000);
      })
      .catch(error => dispatch(leaveDownClusterNodeFailure(error)));
  };
}

export function fetchAkkaProps() {
  return (dispatch: Dispatch<ClusterDashboardActionTypes>,
    getState: () => { dashboard: ClusterDashboardState }): any => {
    dispatch(fetchAkkaPropsBegin());
    return axios
      .get('properties/akkaClusterProps.json')
      .then(response => {
        const props = JSON.parse(stripJsonComments(response.data));
        const akkaProps: typeof initialState.akkaProps = {
          managementUrl: props["akka.management.url"],
        }
        dispatch(fetchAkkaPropsSuccess(akkaProps));
        setTimeout(() => { fetchClusterData()(dispatch, getState); }, 10);
      })
      .catch(error => dispatch(fetchAkkaPropsFailure(error)));
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupGraph = 
(cluster: Cluster, styles: any, nodeUrl: string, clusterUrl: string): any => 
(dispatch: any) => {
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

    
		console.log("TCL: memberconfig", memberConfig, cluster);

    graph.nodes.push(memberConfig);
    graph.edges.push({ from: 0, to: index + 1 });
  });

  dispatch(frameGraphData(graph));
}

export type ClusterDashboardActionTypes = FetchClusterMembersBeginAction |
  FetchClusterMembersSuccessAction | FetchClusterMembersFailureAction |
  ChangeRefreshIntervalAction | FrameGraphDataAction | AddClusterNodeBeginAction |
  AddClusterNodeSuccessAction | AddClusterNodeFailureAction | OpenConfirmationDialogAction |
  LeaveDownClusterNodeBeginAction | LeaveDownClusterNodeSuccessAction |
  LeaveDownClusterNodeFailureAction | CloseConfirmationDialogAction | ChangeAkkaUrlAction |
  FetchAkkaPropsBeginAction | FetchAkkaPropsSuccessAction | FetchAkkaPropsFailureAction;

