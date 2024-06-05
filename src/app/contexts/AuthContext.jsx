// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "../../api/axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

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

  const toast = useToast();

  const showToast = (message, status, description) => {
    toast({
      title: message,
      duration: "2000",
      position: "top-right",
      description: description,
      status: status,
      size: "sm",
    });
  };

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

      const user = await response.data;

      if (!user) {
        showToast("Login failed", "error");
        setIsLoading(false);
        return;
      }

      setUser(user);
      setIsLoading(false);
      dispatch({ type: "LOGIN" });
      showToast("Login successful", "success");

      // Redirect to appropriate route based on user type
      navigateBasedOnUserType(user);
    } catch (error) {
      showToast("Login failed", "error");
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
