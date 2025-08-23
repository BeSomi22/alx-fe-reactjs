// import { Navigate, Outlet } from "react-router-dom";

// // Fake auth (replace with real auth in production)
// const isAuthenticated = false; // change to true to simulate login

// function ProtectedRoute() {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
//   return <Outlet />;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
