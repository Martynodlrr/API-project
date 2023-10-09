import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import ReactGA from 'react-ga';
import React from "react";

import { ModalProvider, Modal } from './components/Modal/context/Modal.js';
import { restoreCSRF, csrfFetch } from "./redux/csrf";
import * as sessionActions from "./redux/session";
import configureStore from "./redux/index.js";
import App from "./App";

import "./index.css";

const store = configureStore();
ReactGA.initialize('G-XRK0MCEZZS');

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
