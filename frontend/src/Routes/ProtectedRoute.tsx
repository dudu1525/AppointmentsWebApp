import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/UserAuth";

type Props = { 
  children: React.ReactNode;
  allowedRoles?: string[];  
};

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;