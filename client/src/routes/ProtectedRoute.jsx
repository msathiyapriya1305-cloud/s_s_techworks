import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // If token exists → allow access
  if (token) {
    return children;
  }

  // Else → redirect to admin login
  return <Navigate to="/admin" replace />;
}
