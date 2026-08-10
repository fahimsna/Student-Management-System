import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let token = localStorage.getItem("token");

  if (token) {
    return children;
  }

  return <Navigate to="/login" />;
}
