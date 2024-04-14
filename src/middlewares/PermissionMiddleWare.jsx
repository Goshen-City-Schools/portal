import { useMemo, useEffect } from "react";
import { useUser } from "../app/contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import roles from "../constants/roles";

const { ROLES, allowedRoles } = roles;

const routes = [
  {
    path: "/admin",
    allowedRoles: [
      ROLES.IT_PERSONNEL,
      ROLES.CLASS_TEACHER,
      ROLES.SUBJECT_TEACHER,
      ROLES.BURSAR,
    ],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/home",
    allowedRoles: [
      ROLES.IT_PERSONNEL,
      ROLES.CLASS_TEACHER,
      ROLES.SUBJECT_TEACHER,
      ROLES.BURSAR,
    ],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/profile",
    allowedRoles: [
      ROLES.IT_PERSONNEL,
      ROLES.CLASS_TEACHER,
      ROLES.SUBJECT_TEACHER,
      ROLES.BURSAR,
    ],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/results",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/parents",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/parents/new",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/articles",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/articles/new",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/articles/:articleId",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/students",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/students/:studentId",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/students/:studentId/edit",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config",
    allowedRoles: [ROLES.IT_PERSONNEL],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config/:id",
    allowedRoles: [ROLES.IT_PERSONNEL],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config/:id/:id/edit",
    allowedRoles: [ROLES.IT_PERSONNEL],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/config/:id/:id",
    allowedRoles: [ROLES.IT_PERSONNEL],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/staff/:staffId",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },

  {
    path: "/admin/transactions",
    allowedRoles: [ROLES.BURSAR],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/subjects",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.CLASS_TEACHER],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/subjects/new",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.CLASS_TEACHER],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/subjects/:subjectId/edit",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.CLASS_TEACHER],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/classes",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.CLASS_TEACHER],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/classes/:classId",
    allowedRoles: [ROLES.IT_PERSONNEL],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/notifications",
    allowedRoles: [ROLES.IT_PERSONNEL],
    allowedAccountTypes: ["staff"],
  },

  // Finance Routes

  {
    path: "/admin/finance",
    allowedRoles: [ROLES.BURSAR, ROLES.PRINCIPAL],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/finance/fees",
    allowedRoles: [ROLES.BURSAR, ROLES.PRINCIPAL],
    allowedAccountTypes: ["staff"],
  },
  {
    path: "/admin/finance/fees/settings",
    allowedRoles: [ROLES.BURSAR, ROLES.PRINCIPAL],
    allowedAccountTypes: ["staff"],
  },

  // Results
  {
    path: "/admin/results",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.PRINCIPAL],
    allowedAccountTypes: ["staff"],
  },

  // Events
  {
    path: "/admin/events",
    allowedRoles: [ROLES.IT_PERSONNEL, ROLES.PRINCIPAL],
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
          (role) => user?.roles?.id === role.toLowerCase()
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
