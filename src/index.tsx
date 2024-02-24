import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./assets/styles/global-styles.scss";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
