import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 py-20">
      <h1 className="text-4xl font-bold">Page not found.</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Go back home
      </Link>
    </div>
  );
}
