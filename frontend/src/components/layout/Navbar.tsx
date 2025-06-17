import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-200 p-4">
      <div className="container mx-auto flex space-x-4">
        <Link to="/">Calls</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
