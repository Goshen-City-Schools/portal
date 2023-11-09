import React from "react";
import { useUser } from "../app/contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const routes = [
  {
    path: "/admin",
    allowedRoles: [
      "IT Personnel",
      "Class Teacher",
      "Subject Teacher",
      "School Teacher",
      "Bursar",
    ],
  },
  {
    path: "/admin/students",
    allowedRoles: ["IT Personnel", "Class Teacher", "Subject Teacher"],
  },
  {
    path: "/admin/staff/",
    allowedRoles: ["IT Personnel", "Teacher", "School Teacher"],
  },
  {
    path: "/admin/staff/new",
    allowedRoles: ["IT Personnel"],
  },
  {
    path: "/admin/staff/*", // Match any subpath under /admin/staff
    allowedRoles: ["IT Personnel", "Teacher", "School Teacher"],
  },
  // Add more routes here
];

const PermissionMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const currentPath = window.location.pathname;

  const isRouteAllowed = React.useMemo(() => {
    if (!user || !user.roles || user.roles.length === 0) {
      return false; // User is not logged in or has no roles
    }

    const allowedRoles = routes
      .filter((route) => currentPath.startsWith(route.path))
      .map((route) => route.allowedRoles)
      .flat();

    return allowedRoles.some((allowedRole) => user.roles.includes(allowedRole));
  }, [currentPath, user]);

  React.useEffect(() => {
    if (!isRouteAllowed) {
      navigate("/restricted-access");
    }
  }, [isRouteAllowed, navigate]);

  return isRouteAllowed ? children : null;
};

export default PermissionMiddleware;
