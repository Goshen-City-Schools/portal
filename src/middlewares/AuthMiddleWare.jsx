// AuthMiddleware.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../app/contexts/AuthContext";

import { useUser } from "../app/contexts/UserContext";
// import { useAuth } from './AuthContext';

const AuthMiddleware = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();

  const navigateBasedOnUserType = (user) => {
    // Add logic to navigate based on user type using `window.location.href`
    if (user.accountType === "staff") {
      navigate("/admin");
    } else if (user.accountType === "student") {
      navigate("/");
    } else {
      navigate("/default"); // Default route for other account types)
    }
  };

  useEffect(() => {
    // Redirect unauthenticated users to the login page
    if (!isAuthenticated && window.location.pathname !== "/auth") {
      navigate("/auth");
    } else if (isAuthenticated) {
      // If authenticated, navigate based on user type
      navigateBasedOnUserType(user);
    }
  }, [isAuthenticated, navigate, navigateBasedOnUserType]);

  return <>{children}</>;
};

export default AuthMiddleware;
