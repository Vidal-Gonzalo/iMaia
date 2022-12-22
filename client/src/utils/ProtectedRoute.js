import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ userLogged }) {
  return userLogged ? <Outlet /> : <Navigate to="/" replace={true} />;
}
