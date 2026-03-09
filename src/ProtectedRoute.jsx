import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" replace />;
  }

  return children;
}