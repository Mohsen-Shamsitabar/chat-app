import "normalize.css";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./colors/dark.css";
import "./colors/light.css";
import "./colors/purple.css";
import "./colors/yellow.css";
import "./main.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("No root element found.");
const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
