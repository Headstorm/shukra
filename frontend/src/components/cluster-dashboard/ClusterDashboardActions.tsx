/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import axios from "axios";
import querystring from "query-string";

import { Cluster } from "./Cluster.model";
import { ClusterDashboardState } from "./ClusterDashboardReducer";

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
  payload: { state: { refreshVal: number; refInterval: any } };
}

interface FrameGraphDataAction {
  type: typeof FRAME_GRAPH_DATA;
  payload: { styles: any; nodeUrl: string; clusterUrl: string };
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

export const fetchClusterMembersBegin = (): FetchClusterMembersBeginAction => ({
  type: FETCH_CLUSTER_MEMBERS_BEGIN
});

export const fetchClusterMembersSuccess = (cluster: Cluster): FetchClusterMembersSuccessAction => ({
  type: FETCH_CLUSTER_MEMBERS_SUCCESS,
  payload: { cluster: cluster }
});

export const fetchClusterMembersFailure = (error: any): FetchClusterMembersFailureAction => ({
  type: FETCH_CLUSTER_MEMBERS_FAILURE,
  payload: { cluster: new Cluster(), error: error }
});

export const changeRefreshInterval =
  (state: { refreshVal: number; refInterval: any }): ChangeRefreshIntervalAction => ({
    type: CHANGE_REFRESH_INTERVAL,
    payload: { state: state }
  });

export const frameGraphData = (styles: any, nodeUrl: string, clusterUrl: string):
  FrameGraphDataAction => ({
    type: FRAME_GRAPH_DATA,
    payload: { styles: styles, nodeUrl: nodeUrl, clusterUrl: clusterUrl }
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

export function fetchClusterData() {
  return (dispatch: Dispatch<ClusterDashboardActionTypes>,
    getState: () => { dashboard: ClusterDashboardState }): any => {
    dispatch(fetchClusterMembersBegin());
    const akkaManagementUrl = getState().dashboard.akkaManagementUrl;
    return axios
      .get(`${akkaManagementUrl}/cluster/members`)
      .then(response => dispatch(fetchClusterMembersSuccess(response.data)))
      .catch(error => dispatch(fetchClusterMembersFailure(error)));
  };
}

export function addClusterNode(nodeAddress: string) {
  return (dispatch: Dispatch<ClusterDashboardActionTypes>,
    getState: () => { dashboard: ClusterDashboardState }): any => {
    dispatch(addClusterNodeBegin());
    const akkaManagementUrl = getState().dashboard.akkaManagementUrl;
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
    const akkaManagementUrl = getState().dashboard.akkaManagementUrl;
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

export type ClusterDashboardActionTypes = FetchClusterMembersBeginAction |
  FetchClusterMembersSuccessAction | FetchClusterMembersFailureAction |
  ChangeRefreshIntervalAction | FrameGraphDataAction | AddClusterNodeBeginAction |
  AddClusterNodeSuccessAction | AddClusterNodeFailureAction | OpenConfirmationDialogAction |
  LeaveDownClusterNodeBeginAction | LeaveDownClusterNodeSuccessAction |
  LeaveDownClusterNodeFailureAction | CloseConfirmationDialogAction | ChangeAkkaUrlAction;

