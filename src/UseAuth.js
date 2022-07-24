import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  let auth = localStorage.getItem("user");
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
