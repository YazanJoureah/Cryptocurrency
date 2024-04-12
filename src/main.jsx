import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "antd/dist/antd.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import MenuContext from "./Context/MenueContext.jsx";
import WindowContext from "./Context/WindowContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <WindowContext>
        <MenuContext>
          <Provider store={store}>
            <App />
          </Provider>
        </MenuContext>
      </WindowContext>
    </Router>
  </React.StrictMode>
);
