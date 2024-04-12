import { useMemo, useEffect } from "react";
import { useUser } from "../app/contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const routes = [
  {
    path: "/admin",
    allowedRoles: [
      "IT personnel",
      "Class Teacher",
      "Subject Teacher",
      "School Teacherx",
      "Bursar",
    ],
    allowedAccountTypes: ["staff"],
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
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/profile",
    allowedRoles: [
      "IT Personnel",
      "Class Teacher",
      "Subject Teacher",
      "School Teacher",
      "Bursar",
    ],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/results",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/parents",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/parents/new",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/articles",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/articles/new",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/articles/:articleId",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/students",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/students/:studentId",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/students/:studentId/edit",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config/:id",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config/:id/:id/edit",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config/:id/:id",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/staff/:staffId",
    allowedRoles: ["IT Personnel", "Bursar"],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/transactions",
    allowedRoles: ["Bursar"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/subjects",
    allowedRoles: ["IT Personnel", "Class Teacher"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/subjects/new",
    allowedRoles: ["IT Personnel", "Class Teacher"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/subjects/:subjectId/edit",
    allowedRoles: ["IT Personnel", "Class Teacher"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/classes",
    allowedRoles: ["IT Personnel", "Class Teacher"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/classes/:classId",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/notifications",
    allowedRoles: ["IT Personnel"],
    allowedAccountTypes: ["staff"],
  },

  // Finance Routes

  {
    path: "/admin/finance",
    allowedRoles: ["Bursar", "Principal"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/finance/fees",
    allowedRoles: ["Bursar", "Principal"],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/finance/fees/settings",
    allowedRoles: ["Bursar", "Principal"],
    allowedAccountTypes: ["staff"],
  },

  // Results
  {
    path: "/admin/results",
    allowedRoles: ["IT Personnel", "Principal"],
    allowedAccountTypes: ["staff"],
  },

  // Events
  {
    path: "/admin/events",
    allowedRoles: ["IT Personnel", "Principal"],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/",
    allowedAccountTypes: ["student"],
  },
  {
    path: "/fees",
    allowedAccountTypes: ["student"],
  },
  {
    path: "/fees/tuition",
    allowedAccountTypes: ["student"],
  },

  // Add more routes here
];

const PermissionMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  if (!user || user === "undefined" || !user.accountType) {
    // User is not logged in or has no account type
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

    // If it's a staff member, allow access to all routes
    if (user?.accountType === "staff") {
      return true;
    }

    const allowedRoles = currentRoute.allowedRoles;
    const allowedAccountTypes = currentRoute.allowedAccountTypes;

    // Additional checks...
    const isAllowed =
      (!user.roles ||
        allowedRoles.some((role) => user?.roles?.name === role)) &&
      allowedAccountTypes.includes(user?.accountType);

    if (!isAllowed) {
      return false; // Return false if the current route is not allowed
    }

    // Check if the current route is a parent route, and if yes, check child routes
    if (!currentRoute.path.endsWith("/") && location.pathname.endsWith("/")) {
      const childRoute = routes.find(
        (route) =>
          route.path.startsWith(currentRoute.path) &&
          route.path !== currentRoute.path
      );

      // If there is a child route, check its permissions
      if (childRoute) {
        const isChildAllowed =
          (!user.roles ||
            childRoute.allowedRoles.some((role) =>
              user.roles.includes(role)
            )) &&
          childRoute.allowedAccountTypes.includes(user.accountType);

        return isChildAllowed;
      }
    }

    return true; // Allow access to the current route
  }, [location.pathname, user?.accountType, user?.roles, routes]);

  useEffect(() => {
    // Redirect to /restricted-access if the route is not allowed
    if (!isUserAllowed) {
      // Check if the current route is defined in the routes array
      const currentRoute = routes.find((route) => {
        const pathRegex = new RegExp(
          `^${route.path.replace(/:[^/]+/g, "[^/]+")}$`
        );
        return pathRegex.test(location.pathname);
      });

      if (currentRoute) {
        // Check if the user is a staff member with the proper role
        const isStaffWithProperRole =
          user.accountType === "staff" &&
          user.roles.some((role) =>
            currentRoute.allowedRoles.includes(role.name.toLowerCase())
          );

        if (isStaffWithProperRole) {
          // Allow staff with proper role to access the route
          return;
        }

        // If the user is not allowed, redirect to /restricted-access
        navigate("/restricted-access");
      } else {
        // If the route is not defined, handle accordingly (e.g., redirect to home)
        navigate("/"); // Change this to the desired fallback route
      }
    } else if (user.accountType === "staff" && location.pathname === "/") {
      // Additional check for staff account type to prevent automatic redirect to "/admin"
      navigate("/admin/home");
    }
  }, [
    isUserAllowed,
    navigate,
    user.accountType,
    user.roles,
    location.pathname,
  ]);

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
        (!user.roles ||
          currentRoute.allowedRoles.some((role) =>
            user.roles.map((userRole) => userRole.name === role.name)
          )) &&
        currentRoute.allowedAccountTypes.includes(user.accountType);

      if (!isAllowed) {
        navigate("/restricted-access");
      }
    }
  };

  return isUserAllowed ? children : "k";
};

export default PermissionMiddleware;
