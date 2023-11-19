// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getSingleStaff } from "../../api/staff.api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [infoIsUpdated, setInfoIsUpdated] = useState(false);

  const getUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(storedUser);
    return storedUser;
  };

  const setUserAndStorage = async (newUser) => {
    await setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (infoIsUpdated) {
      if (user && user.accountType === "staff") {
        const updateAndSetUser = async () => {
          try {
            const updatedUser = await getSingleStaff(user.portalId);
            setUser(updatedUser);
          } catch (error) {
            console.error("Error updating user:", error.message);
          }
        };

        updateAndSetUser();
      }

      setInfoIsUpdated(false);
    }
  }, [infoIsUpdated, user]);

  useEffect(() => {
    console.log("...");
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        infoIsUpdated,
        setInfoIsUpdated,
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
