import React, { useMemo, useEffect } from "react";
import { useUser } from "../app/contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

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
  { path: "/admin/students", allowedRoles: ["IT Personnel"] },
  { path: "/admin/students/:studentId", allowedRoles: ["IT Personnel"] },
  { path: "/admin/staff", allowedRoles: ["IT Personnel"] },
  { path: "/admin/staff/new", allowedRoles: ["IT Personnel"] },
  { path: "/admin/staff/:staffId", allowedRoles: ["IT Personnel"] },
  { path: "/admin/transactions", allowedRoles: ["Bursar"] },
  // Add more routes here
];

const PermissionMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const isUserAllowed = useMemo(() => {
    if (!user || !user.roles || user.roles.length === 0) {
      return false; // User is not logged in or has no roles
    }

    const currentRoute = routes.find((route) => {
      const pathRegex = new RegExp(
        `^${route.path.replace(/:[^/]+/g, "[^/]+")}$`
      );
      return pathRegex.test(location.pathname);
    });

    if (!currentRoute) {
      return false; // Route not found in the defined routes
    }

    const allowedRoles = currentRoute.allowedRoles;
    return allowedRoles.some((role) => user.roles.includes(role));
  }, [location.pathname, user]);

  useEffect(() => {
    // Redirect to /restricted-access if the route is not allowed
    if (!isUserAllowed) {
      navigate("/restricted-access");
    }
  }, [isUserAllowed, navigate]);

  useEffect(() => {
    // Event listener for handling NavLink clicks
    const handleNavLinkClick = (event) => {
      if (event.target.tagName === "A" && event.target.href) {
        const path = new URL(event.target.href).pathname;
        handleNavLinkAccess(path);
      }
    };

    // Attach the event listener
    window.addEventListener("click", handleNavLinkClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleNavLinkClick);
    };
  }, [navigate, user.roles]);

  // Function to handle NavLink access
  const handleNavLinkAccess = (path) => {
    const currentRoute = routes.find((route) => {
      const pathRegex = new RegExp(
        `^${route.path.replace(/:[^/]+/g, "[^/]+")}$`
      );
      return pathRegex.test(path);
    });

    if (currentRoute) {
      const isAllowed = currentRoute.allowedRoles.some((role) =>
        user.roles.includes(role)
      );

      if (!isAllowed) {
        navigate("/restricted-access");
      }
    }
  };

  return isUserAllowed ? children : null;
};

export default PermissionMiddleware;
