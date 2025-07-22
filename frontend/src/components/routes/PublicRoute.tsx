import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

interface PublicRouteProps {
   children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token  = useSelector((state: RootState) => state.auth.token);

  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
