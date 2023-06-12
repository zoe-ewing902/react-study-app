import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import StudySets from "./components/StudySets";
import EditSet, { action as saveAction } from "./components/EditSet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <StudySets /> },
      { path: "new-set", element: <EditSet />, action: saveAction }
    ]
  }
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

export function uuid() {
  return crypto.randomUUID();
}
