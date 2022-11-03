import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { Provider } from "react-redux";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
