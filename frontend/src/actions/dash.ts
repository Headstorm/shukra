/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import axios from "axios";
import querystring from "query-string";
import { Cluster } from "../models/Cluster.model";
import { ClusterDashboardState, initialState } from "../reducers/dash";

import stripJsonComments from "strip-json-comments";

import {
  FETCH_CLUSTER_MEMBERS_BEGIN,
  FETCH_CLUSTER_MEMBERS_SUCCESS,
  FETCH_CLUSTER_MEMBERS_FAILURE,
  CHANGE_REFRESH_INTERVAL,
  ADD_CLUSTER_NODE_BEGIN,
  ADD_CLUSTER_NODE_SUCCESS,
  ADD_CLUSTER_NODE_FAILURE,
  OPEN_CONFIRMATION_DIALOG,
  LEAVE_DOWN_CLUSTER_NODE_BEGIN,
  LEAVE_DOWN_CLUSTER_NODE_SUCCESS,
  LEAVE_DOWN_CLUSTER_NODE_FAILURE,
  CLOSE_CONFIRMATION_DIALOG,
  CHANGE_AKKA_URL,
  FETCH_AKKA_PROPS_BEGIN,
  FETCH_AKKA_PROPS_SUCCESS,
  FETCH_AKKA_PROPS_FAILURE,
} from '../constants/dash'

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

export type ClusterDashboardActionTypes = FetchClusterMembersBeginAction |
  FetchClusterMembersSuccessAction | FetchClusterMembersFailureAction |
  ChangeRefreshIntervalAction | AddClusterNodeBeginAction |
  AddClusterNodeSuccessAction | AddClusterNodeFailureAction | OpenConfirmationDialogAction |
  LeaveDownClusterNodeBeginAction | LeaveDownClusterNodeSuccessAction |
  LeaveDownClusterNodeFailureAction | CloseConfirmationDialogAction | ChangeAkkaUrlAction |
  FetchAkkaPropsBeginAction | FetchAkkaPropsSuccessAction | FetchAkkaPropsFailureAction;

