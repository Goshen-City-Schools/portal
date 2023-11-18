// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../../configs/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "../../api/axios";

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

  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
  });

  const login = async (credentials) => {
    try {
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

      if (!response.data.success) {
        console.error("Login failed:", response.data.message);
        return;
      }

      setUser(response.data.user);
      dispatch({ type: "LOGIN" });

      // Redirect to appropriate route based on user type
      navigateBasedOnUserType(response.data.user);
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
