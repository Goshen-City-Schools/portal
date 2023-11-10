import React, { useEffect } from "react";
import { useUser } from "../app/contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const AuthenticationMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user) {
      return navigate("/auth");
    }
  });

  useEffect(() => {
    if (user && location.pathname === "/auth") {
      // Redirect to the appropriate page based on the user's account type
      if (user.accountType === "Staff") {
        navigate("/admin");
      } else if (user.accountType === "Student") {
        navigate("/");
      } else {
        // Handle unexpected account type or other conditions
        logout();
      }

      return;
    }
  }, [user, location.pathname, navigate, logout]);

  // Render the children whether the user is logged in or not
  return children;
};

export default AuthenticationMiddleware;
