import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"
import router from "./router/router";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );