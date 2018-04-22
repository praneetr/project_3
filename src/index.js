import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import "./styles.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
