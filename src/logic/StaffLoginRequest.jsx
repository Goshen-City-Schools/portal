import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

const useStaffLogin = (login, isLoading, setIsLoading) => {
  const toast = useToast();

  const showToast = (message, status) => {
    toast({
      title: message,
      duration: "2000",
      position: "top-right",
      status: status,
      size: "sm",
    });
  };

  const staffLogin = useCallback(
    async (username, password) => {
      const userType = "staff";

      if (!username || !password) return;

      const userToLogin = {
        username: username,
        password: password,
        accountType: userType,
      };

      console.log(userToLogin);

      try {
        setIsLoading(true);
        await login(userToLogin);
      } catch (error) {
        console.error("Login failed:", error.message);
        showToast("Invalid username or password", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [login, isLoading]
  );

  return staffLogin;
};

export default useStaffLogin;
