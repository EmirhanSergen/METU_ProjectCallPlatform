import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function Navbar() {
  const { token, role, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center py-3 px-4">
        {/* Logo */}
        <div className="mb-2 sm:mb-0">
          <Link to="/" className="text-lg font-semibold hover:underline">
            Project Call Platform
          </Link>
        </div>

        {/* Main Links */}
        <div className="flex flex-wrap gap-x-6 mb-2 sm:mb-0 justify-center">
          <Link to="/" className="hover:underline">Home</Link>
          {token && <Link to="/calls" className="hover:underline">Calls</Link>}
          <Link to="/about" className="hover:underline">About</Link>
          {token && role === "applicant" && (
            <Link to="/my-applications" className="hover:underline">My Applications</Link>
          )}
          {token && (role === "admin" || role === "super_admin") && (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/calls/manage" className="hover:underline">Manage Calls</Link>
            </>
          )}
          {token && role === "reviewer" && (
            <Link to="/reviewer" className="hover:underline">My Reviews</Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-3">
          {token ? (
            <button
              onClick={logout}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
