import { User } from "entities/User";
import { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
  user: User,
  children: React.ReactElement
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};