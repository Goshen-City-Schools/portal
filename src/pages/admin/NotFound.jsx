import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the home page and replace the URL
    navigate("/admin", { replace: true });
  }, [navigate]);

  return <div>Page Not Found. Redirecting to Home...</div>;
}
