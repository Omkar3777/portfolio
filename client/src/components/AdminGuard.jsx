import { Navigate, useLocation } from "react-router-dom";

function AdminGuard({ children }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get("key");

  // 🔐 Change this secret to something strong
  const SECRET_KEY = "omkar-super-secret-2026";

  if (key !== SECRET_KEY) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminGuard;