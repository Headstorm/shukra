import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";
import rootReducer from "./rootReducer";
import "./index.scss";
import App from "./components/app/App";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
