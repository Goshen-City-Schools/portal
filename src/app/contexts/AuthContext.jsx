// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "../../api/axios";
import { useState } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { getUser, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
  });

  const login = async (credentials) => {
    try {
      setIsLoading(!isLoading);
      const response = await axios.post(
        "/api/v1/auth/login",
        JSON.stringify(credentials),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data[0]);

      if (!response.data[0]) {
        console.error("Login failed:", response.data.message);
        setIsLoading(false);
        return;
      }

      setUser(response.data[0]);
      setIsLoading(false);
      dispatch({ type: "LOGIN" });

      // Redirect to appropriate route based on user type
      navigateBasedOnUserType(response.data[0]);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    getUser(); // Reset the user in useUser context
    navigate("/auth");
  };

  const navigateBasedOnUserType = (user) => {
    // Add logic to navigate based on user type using `navigate` from useNavigate
    if (user.accountType === "staff") {
      navigate("/admin");
    } else if (user.accountType === "student") {
      navigate("/");
    } else {
      navigate("/default"); // Default route for other account types
    }
  };

  useEffect(() => {
    // Redirect unauthenticated users to the login page
    if (!state.isAuthenticated && window.location.pathname !== "/auth") {
      navigate("/auth");
    }
  }, [state.isAuthenticated, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
