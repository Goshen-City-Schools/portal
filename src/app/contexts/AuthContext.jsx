import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    roles: [], // Array of user roles
    accountType: "", // User account type (e.g., "Staff", "Student")
  });

  // Function to set or update authentication information
  const setAuthInfo = (newAuth) => {
    setAuth((prevAuth) => ({ ...prevAuth, ...newAuth }));
  };

  // Function to check if the user has specific roles
  const hasRoles = (requiredRoles) => {
    return requiredRoles.every((role) => auth.roles.includes(role));
  };

  // Function to check if the user belongs to specific account types
  const hasAccountTypes = (requiredAccountTypes) => {
    return requiredAccountTypes.includes(auth.accountType);
  };

  // Combine both role and account type checks
  const hasAccess = (requiredRoles, requiredAccountTypes) => {
    const roleCheck = hasRoles(requiredRoles);
    const accountTypeCheck = hasAccountTypes(requiredAccountTypes);

    return roleCheck && accountTypeCheck;
  };

  const contextValue = {
    auth,
    setAuthInfo,
    hasRoles,
    hasAccountTypes,
    hasAccess,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
