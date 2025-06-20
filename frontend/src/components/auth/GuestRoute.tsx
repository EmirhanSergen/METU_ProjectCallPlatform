import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function GuestRoute() {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/call" replace />;
  }
  return <Outlet />;
}
