import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
import store from "./redux/store";
import { AuthProvider } from "./Components/AuthContext";

let currentThemeDark = false;
let selectedTheme = localStorage.getItem("selectedTheme");
if (selectedTheme === "dark") currentThemeDark = true;
if (selectedTheme === "light") currentThemeDark = false;

const root = ReactDOM.createRoot(document.getElementById("root"));
localStorage.getItem("selectedTheme");

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <App currentThemeDark={currentThemeDark} />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
