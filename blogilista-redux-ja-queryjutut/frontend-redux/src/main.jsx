import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import currUserReducer from "./reducers/currUserReducer";
import { BrowserRouter as Router } from "react-router-dom";
import usersReducer from "./reducers/usersReducer";
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    currUser: currUserReducer,
    users: usersReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
