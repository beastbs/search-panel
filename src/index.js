import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";

import { firebaseConfig } from "../config/firebaseConfig/firebaseConfig";

import "./index.scss";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.Fragment>
      <App />
    </React.Fragment>
);
