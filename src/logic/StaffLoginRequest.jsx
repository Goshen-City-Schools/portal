import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

const useStaffLogin = (login, isLoading, setIsLoading) => {
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

  const staffLogin = useCallback(
    async (username, password) => {
      const userType = "staff";

      if (!username || !password)
        return showToast("Invalid credentials!", "error");

      const userToLogin = {
        username: username,
        password: password,
        accountType: userType,
      };

      try {
        setIsLoading(true);
        await login(userToLogin);
      } catch (error) {
        showToast("Login failed", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [login, isLoading]
  );

  return staffLogin;
};

export default useStaffLogin;
