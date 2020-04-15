import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { 
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from "redux";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./components/app/App";

import dashboard from "./components/cluster-dashboard/ClusterDashboardReducer";

const reducer = combineReducers({
  dashboard,
});

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
