import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/store";

const ProtectedRoute = ({ children }) => {
  const authToken = useAuthStore((state) => state.authToken);

  if (!authToken) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
