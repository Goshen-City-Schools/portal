import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
// import { useLocalStorage } from "./useLocalStorage"; // Import the useLocalStorage hook

const UserContext = createContext();

export function UserProvider({ children }) {
  const { getItem, setItem } = useLocalStorage("user"); // Replace "userData" with your key
  const storedUserData = getItem();

  const [user, setUser] = React.useState(storedUserData);

  const login = (userData) => {
    setUser(userData);
    setItem(userData); // Store the user data in localStorage
  };

  const logout = () => {
    setUser(null);
    setItem(null); // Clear user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
