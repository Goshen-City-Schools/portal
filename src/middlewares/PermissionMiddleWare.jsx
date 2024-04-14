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
    path: "/transactions",
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
    // Check if the route starts with "/admin"
    const isAdminRoute = location.pathname.startsWith("/admin");

    if (isAdminRoute) {
      // Allow access only for users with account type "staff"
      return user?.accountType === "staff";
    } else {
      // Allow access only for users with account type "student"
      return user?.accountType === "student";
    }
  }, [location.pathname, user?.accountType]);

  useEffect(() => {
    // Redirect to the appropriate route if the user is not allowed access
    if (!isUserAllowed) {
      navigate("/restricted-access");
      return;
    }

    // If the user is a staff member, check if they have the proper role for the current route
    if (user?.accountType === "staff" && isUserAllowed) {
      const currentRoute = routes.find(
        (route) => route.path === location.pathname
      );

      if (currentRoute && currentRoute.allowedRoles) {
        const hasProperRole = currentRoute.allowedRoles.some(
          (role) => user?.roles?.name.toLowerCase() === role.toLowerCase()
        );

        if (!hasProperRole) {
          navigate("/restricted-access");
        }
      }
    }

    if (user?.accountType === "student" && isUserAllowed) {
      const currentRoute = routes.find(
        (route) => route.path === location.pathname
      );

      if (
        !currentRoute ||
        !currentRoute.allowedAccountTypes.includes("student")
      ) {
        // Redirect to an appropriate page or show a message indicating no access
        navigate("/restricted-access");
      }
    }
  }, [
    isUserAllowed,
    location.pathname,
    navigate,
    user?.accountType,
    user?.roles,
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
  return isUserAllowed ? children : "Unauthorized";
};

export default PermissionMiddleware;
