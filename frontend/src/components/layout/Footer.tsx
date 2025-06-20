import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm py-4 mt-auto">
      <div className="space-x-4">
        <Link to="/terms" className="hover:underline">
          Terms of Use
        </Link>
        <span>|</span>
        <Link to="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
