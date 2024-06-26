import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

const useStudentLogin = (login, isLoading, setIsLoading) => {
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

  const studentLogin = useCallback(
    async (studentId, password) => {
      const userType = "student";

      if (!studentId || !password)
        return showToast("Invalid credentials!", "error");

      const userToLogin = {
        username: studentId,
        password: password,
        accountType: userType,
      };

      try {
        setIsLoading(true);
        await login(userToLogin);
      } catch (error) {
        console.error("Login failed:", error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [login, isLoading]
  );

  return studentLogin;
};

export default useStudentLogin;
