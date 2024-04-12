import React, { useState } from "react";
import { useAuth } from "../../../app/contexts/AuthContext";
import useStaffLogin from "../../../logic/StaffLoginRequest";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";

const StaffLoginForm = () => {
  const { login, isLoading, setIsLoading } = useAuth();
  const staffLogin = useStaffLogin(login, isLoading, setIsLoading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await staffLogin(username, password);
  };

  return (
    <>
      {/* Username */}
      <FormControl mb={4}>
        <FormLabel fontWeight={"bold"} color={"accent.700"} fontSize={"sm"}>
          Username
        </FormLabel>
        <Input
          type="text"
          name="username"
          height={"56px"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          border={"1px"}
          borderColor={"brand.900"}
        />
      </FormControl>

      {/* Password */}
      <FormControl mb={4}>
        <FormLabel fontWeight={"bold"} color={"accent.700"} fontSize={"sm"}>
          Password
        </FormLabel>
        <Input
          type="password"
          name="password"
          height={"56px"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          border={"1px"}
          borderColor={"brand.900"}
        />
      </FormControl>

      {/* Login Button */}
      <Button
        mt={8}
        bg={"brand.900"}
        border={"3px solid transparent"}
        _hover={{
          bg: "transparent",
          borderColor: "brand.900",
          color: "brand.900",
        }}
        onClick={handleLogin}
        color={"white"}
        isLoading={isLoading}
        disabled={isLoading}
        type="submit"
        py={"6"}
        width={"full"}
        height={"48px"}
        className="flex items-center gap-4"
      >
        {isLoading ? "Logging in..." : "Login"} <MdArrowForward />
      </Button>
    </>
  );
};

export default StaffLoginForm;
