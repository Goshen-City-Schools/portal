import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { API_BASE_URL, API_ENDPOINTS } from "../../configs/api";
import { useToast } from "@chakra-ui/react";
// import { useLocalStorage } from "./useLocalStorage"; // Import the useLocalStorage hook

const UserContext = createContext();

export function UserProvider({ children }) {
  const { getItem, setItem } = useLocalStorage("user"); // Replace "userData" with your key
  const storedUserData = getItem();
  const toast = useToast();

  const [user, setUser] = React.useState(storedUserData);

  const login = async (userToLogin) => {
    console.log(userToLogin);
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: "POST", // Adjust the method as needed
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers required for your API
        },
        // Add any body parameters required for your login API
        body: JSON.stringify({
          username: userToLogin.id,
          password: userToLogin.password,
        }),
      });

      const data = await response.json();

      // Handle the response, e.g., redirect to a different page upon successful login
      if (response.ok) {
        window.location.href = "/dashboard"; // Replace with your desired redirect path
      } else {
        // Handle login failure
        toast({
          title: `Login failed:,${data.message}`,
          duration: "2000",
          position: "top-right",
          status: "error",
        });
      }
    } catch (error) {
      // Handle API call error
      console.error("Error during login:", error);
    }
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
