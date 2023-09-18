import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "@/context/ModalContext";
import { SystemEventsProvider } from "@/context/SystemEventsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SystemEventsProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SystemEventsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
