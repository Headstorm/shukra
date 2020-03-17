import { combineReducers } from "redux";

import dashboard from "./components/cluster-dashboard/ClusterDashboardReducer";

const rootReducer = combineReducers({
  dashboard
});

export default rootReducer;