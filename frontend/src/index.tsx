import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import "./index.scss";
import App from "./components/app/App";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
