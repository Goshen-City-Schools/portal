import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../app/contexts/AuthContext";

const Auth = ({ allowedRoles, allowedAccountTypes }) => {
  const { auth } = useAuth;
  const location = useLocation();

  // Check if the user has the allowed role
  const hasAllowedRole = allowedRoles.some((role) => auth.roles.includes(role));

  // Check if the user has the allowed account type
  const hasAllowedAccountType = allowedAccountTypes.includes(auth.accountType);

  // If the user has both allowed role and account type, render the children
  if (hasAllowedRole && hasAllowedAccountType) {
    return <Outlet />;
  }

  // If the user doesn't have the allowed role or account type, redirect
  if (auth?.name) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // If the user is not logged in, redirect to the login page
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default Auth;
