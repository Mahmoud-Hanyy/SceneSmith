import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "60vh" }}
    >
      <h1 className="mb-4">404 - Page Not Found</h1>
      <p className="mb-3">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}
