import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthWrapper } from "./utils/auth.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthWrapper>
    <App />
  </AuthWrapper>
);
