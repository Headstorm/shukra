import {
  ClusterDashboardActionTypes,
  FETCH_CLUSTER_MEMBERS_BEGIN,
  FETCH_CLUSTER_MEMBERS_SUCCESS,
  FETCH_CLUSTER_MEMBERS_FAILURE,
  CHANGE_REFRESH_INTERVAL,
  FRAME_GRAPH_DATA,
  ADD_CLUSTER_NODE_BEGIN,
  ADD_CLUSTER_NODE_SUCCESS,
  ADD_CLUSTER_NODE_FAILURE,
  OPEN_CONFIRMATION_DIALOG,
  LEAVE_DOWN_CLUSTER_NODE_BEGIN,
  LEAVE_DOWN_CLUSTER_NODE_FAILURE,
  LEAVE_DOWN_CLUSTER_NODE_SUCCESS,
  CLOSE_CONFIRMATION_DIALOG,
  CHANGE_AKKA_URL,
  FETCH_AKKA_PROPS_BEGIN,
  FETCH_AKKA_PROPS_SUCCESS,
  FETCH_AKKA_PROPS_FAILURE
} from './ClusterDashboardActions';
import { Cluster } from './Cluster.model';

export interface ClusterDashboardState {
  loading: boolean;
  cluster: Cluster;
  akkaProps: {
    managementUrl: string;
  };
  autoRefresh: {
    value: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interval: any;
  };
  graph: {};
  snackBar: {
    open: boolean;
    message: string;
  };
  confirmationDialog: {
    open: boolean;
    title: string;
    content: string;
    data: {};
  };
}

export const initialState: ClusterDashboardState = {
  loading: false,
  cluster: new Cluster(),
  akkaProps: {
    managementUrl: "/ShukraCluster"
  },
  autoRefresh: {
    value: 0,
    interval: null
  },
  graph: {
    nodes: [],
    edges: []
  },
  snackBar: {
    open: false,
    message: ""
  },
  confirmationDialog: {
    open: false,
    title: "",
    content: "",
    data: {}
  }
};

export default function ClusterDashboardReducer(state = initialState,
  action: ClusterDashboardActionTypes): ClusterDashboardState {
  let message = "";

  switch (action.type) {
    case FETCH_CLUSTER_MEMBERS_BEGIN:
      return {
        ...state,
        loading: true,
        snackBar: {
          ...state.snackBar,
          open: false,
          message: ""
        }
      };

    case FETCH_CLUSTER_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        cluster: action.payload.cluster,
        snackBar: {
          ...state.snackBar,
          open: false,
          message: ""
        }
      };

    case FETCH_CLUSTER_MEMBERS_FAILURE:
      message = action.payload.error.message && action.payload.error.message.message
        ? action.payload.error.message.message : action.payload.error.message
      return {
        ...state,
        loading: false,
        cluster: new Cluster(),
        snackBar: {
          ...state.snackBar,
          open: true,
          message: message
        }
      };

    case CHANGE_REFRESH_INTERVAL:
      return {
        ...state,
        snackBar: {
          ...state.snackBar,
          open: false,
          message: ""
        },
        autoRefresh: {
          ...state.autoRefresh,
          value: action.payload.state.value,
          interval: action.payload.state.interval
        }
      };

    case FRAME_GRAPH_DATA:
      return {
        ...state,
        graph: action.payload.graph,
      }

    case ADD_CLUSTER_NODE_BEGIN:
      return {
        ...state,
        loading: true,
        snackBar: {
          ...state.snackBar,
          open: false,
          message: ""
        }
      };

    case ADD_CLUSTER_NODE_SUCCESS:
      return {
        ...state,
        loading: false,
        snackBar: {
          ...state.snackBar,
          open: true,
          message: action.payload.message
        }
      };

    case ADD_CLUSTER_NODE_FAILURE:
      message = action.payload.error.message && action.payload.error.message.message
        ? action.payload.error.message.message : action.payload.error.message
      return {
        ...state,
        loading: false,
        snackBar: {
          ...state.snackBar,
          open: true,
          message: message
        }
      };

    case OPEN_CONFIRMATION_DIALOG:
      return {
        ...state,
        confirmationDialog: {
          ...state.confirmationDialog,
          open: true,
          title: action.payload.title,
          content: action.payload.content,
          data: action.payload.data
        }
      };

    case LEAVE_DOWN_CLUSTER_NODE_BEGIN:
      return {
        ...state,
        loading: true,
        snackBar: {
          ...state.snackBar,
          open: false,
          message: ""
        },
        confirmationDialog: {
          ...state.confirmationDialog,
          open: false,
          title: "",
          content: "",
          data: {}
        }
      };

    case LEAVE_DOWN_CLUSTER_NODE_SUCCESS:
      return {
        ...state,
        loading: false,
        snackBar: {
          ...state.snackBar,
          open: true,
          message: action.payload.message
        }
      };

    case LEAVE_DOWN_CLUSTER_NODE_FAILURE:
      message = action.payload.error.message && action.payload.error.message.message
        ? action.payload.error.message.message : action.payload.error.message
      return {
        ...state,
        loading: false,
        snackBar: {
          ...state.snackBar,
          open: true,
          message: message
        }
      };

    case CLOSE_CONFIRMATION_DIALOG:
      return {
        ...state,
        confirmationDialog: {
          ...state.confirmationDialog,
          open: false
        }
      }

    case CHANGE_AKKA_URL:
      return {
        ...state,
        akkaProps: {
          ...state.akkaProps,
          managementUrl: action.payload.url
        }
      }

    case FETCH_AKKA_PROPS_BEGIN:
      return {
        ...state,
        loading: true,
        snackBar: {
          ...state.snackBar,
          open: false,
          message: ""
        }
      };

    case FETCH_AKKA_PROPS_SUCCESS:
      return {
        ...state,
        loading: false,
        akkaProps: {
          ...state.akkaProps,
          ...action.payload
        },
        snackBar: {
          ...state.snackBar,
          open: false,
          message: ""
        }
      };

    case FETCH_AKKA_PROPS_FAILURE:
      message = action.payload.error.message && action.payload.error.message.message
        ? action.payload.error.message.message : action.payload.error.message
      return {
        ...state,
        loading: false,
        snackBar: {
          ...state.snackBar,
          open: true,
          message: message
        }
      };

    default:
      return state;
  }
}
