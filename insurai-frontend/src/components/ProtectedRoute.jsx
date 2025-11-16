import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

export default function ProtectedRoute({ element, role }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role && getUserRole() !== role) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
