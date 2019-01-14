import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import Store from "./Store";
import { initMiddleware } from "devise-axios";

initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
