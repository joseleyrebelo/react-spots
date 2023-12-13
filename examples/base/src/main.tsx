import React from "react";
import ReactDOM from "react-dom/client";
import { Spot } from "./spots/spot";
import Printer from "./components/Printer";
import AutoUpdater from "./components/AutoUpdater";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Spot>
      <Printer />
      <AutoUpdater />
    </Spot>
  </React.StrictMode>
);
