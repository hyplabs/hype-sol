import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

/**
 * Temporary Fix:
 * Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.Buffer" in client code.
 */
declare global {
  interface Window {
    Buffer: any;
  }
}

window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
