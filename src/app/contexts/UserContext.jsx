// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(storedUser);
    return storedUser;
  };

  const setUserAndStorage = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  useEffect(() => {
    getUser(); // Set the user when the component mounts
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        setUser: setUserAndStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
