import React, { useEffect } from "react";
import { useUser } from "../app/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const AuthenticationMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  if (!user) {
  }

  useEffect(() => {
    if (user) {
      // Check the user's account type and redirect accordingly
      if (user.accountType === "Staff") {
        return navigate("/admin");
      } else if (user.accountType === "Student") {
        return navigate("/");
      } else {
        logout();
      }
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Render the children whether the user is logged in or not
  return children;
};

export default AuthenticationMiddleware;
