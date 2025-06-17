import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../../types/global";
import { useAuth } from "../../context/AuthProvider";

export default function ProtectedRoute({ roles }: { roles?: UserRole[] }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role as UserRole | undefined;
      if (!role || !roles.includes(role)) {
        return <Navigate to="/login" replace />;
      }
    } catch {
      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
}
