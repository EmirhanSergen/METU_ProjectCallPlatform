import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../../types/global";
import { useAuth } from "../../context/AuthProvider";

function decodeBase64Url(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

export default function AuthRoute({ roles }: { roles?: UserRole[] }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    try {
      const payload = JSON.parse(decodeBase64Url(token.split(".")[1]));
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
