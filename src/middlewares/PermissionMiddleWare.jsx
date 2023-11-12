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
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/home",
    allowedRoles: [
      "IT Personnel",
      "Class Teacher",
      "Subject Teacher",
      "School Teacher",
      "Bursar",
    ],
    allowedAccountTypes: ["Staff"],
  },

  {
    path: "/admin/profile",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },

  {
    path: "/admin/students",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/students/:studentId",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/staff",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/staff/new",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/staff/roles",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/staff/:staffId",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/transactions",
    allowedRoles: ["Bursar"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/classes",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/classes/:classId",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/admin/notifications",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["Staff"],
  },
  {
    path: "/",
    allowedAccountTypes: ["Staff"],
  },
  // Add more routes here
];

const PermissionMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  if (
    !user ||
    user === "undefined" ||
    !user.roles ||
    user.roles.length === 0 ||
    !user.accountType
  ) {
    // User is not logged in or has no roles or account type
    return navigate("/auth");
  }

  const isUserAllowed = useMemo(() => {
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
    const allowedAccountTypes = currentRoute.allowedAccountTypes;

    return (
      allowedRoles.some((role) => user.roles.includes(role)) &&
      allowedAccountTypes.includes(user.accountType)
    );
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
  }, [navigate, user.roles, user.accountType]);

  // Function to handle NavLink access
  const handleNavLinkAccess = (path) => {
    const currentRoute = routes.find((route) => {
      const pathRegex = new RegExp(
        `^${route.path.replace(/:[^/]+/g, "[^/]+")}$`
      );
      return pathRegex.test(path);
    });

    if (currentRoute) {
      const isAllowed =
        currentRoute.allowedRoles.some((role) => user.roles.includes(role)) &&
        currentRoute.allowedAccountTypes.includes(user.accountType);

      if (!isAllowed) {
        navigate("/restricted-access");
      }
    }
  };

  return isUserAllowed ? children : null;
};

export default PermissionMiddleware;