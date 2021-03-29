import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//importing bootstrap css
import "bootstrap/dist/css/bootstrap.css";
//importing font-awesome-css
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";

// process is the current process object and env is its enviroment variable property
console.log("SUPERMAN", process.env.REACT_APP_NAME);

console.log(process.env);

ReactDOM.render(
  // BrowserRouter wraps the history object and passes to the components
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
