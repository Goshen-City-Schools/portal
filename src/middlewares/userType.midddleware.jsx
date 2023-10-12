// userTypeMiddleware.js

import { useNavigate } from "react-router-dom";
import defaultConfigValues from "../data/defaultConfigValues";

const userTypeMiddleware = (to, next, allowedUserTypes) => {
  const navigate = useNavigate();
  const user = defaultConfigValues.user;

  if (user && allowedUserTypes.includes(user.userType)) {
    // If the user's userType is in the allowedUserTypes array, allow access
    next();
  } else {
    // Handle unauthorized user types here
    // For example, you can redirect unauthenticated users to the login page
    navigate("/auth");
  }
};

export default userTypeMiddleware;
