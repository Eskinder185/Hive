import React from "react";
import ReactDOM from "react-dom/client";
import "./honey.css";
import App from "./app.jsx";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <div className="honeycomb-overlay"></div>
      <div className="bee">🐝</div><div className="bee">🐝</div><div className="bee">🐝</div>
      <App />
    </React.StrictMode>
  );
}
