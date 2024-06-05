import React, { useState } from "react";
import useStudentLogin from "../../../logic/StudentLoginRequest";
import { useAuth } from "../../../app/contexts/AuthContext";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";

const StudentLoginForm = () => {
  const { login, isLoading, setIsLoading } = useAuth();
  const studentLogin = useStudentLogin(login, isLoading, setIsLoading);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await studentLogin(studentId, password);
  };

  return (
    <>
      {/* Portal Id */}
      <FormControl mb={6}>
        <FormLabel fontWeight={"bold"} fontSize={"sm"}>
          Portal Id
        </FormLabel>
        <Input
          type="text"
          name="username"
          height={"56px"}
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Portal Id"
          border={"1px"}
          bg={"neutral.100"}
          borderColor={"#C6C6C6"}
        />
      </FormControl>

      {/* Password */}
      <FormControl mb={4}>
        <FormLabel fontWeight={"bold"} fontSize={"sm"}>
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
          bg={"neutral.100"}
          borderColor={"#C6C6C6"}
        />
      </FormControl>

      <FormControl mb={4}>
        <Checkbox colorScheme={"blue"} fontSize={"sm"}>
          Remember me
        </Checkbox>
      </FormControl>

      {/* Login Button */}
      <Button
        mt={16}
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
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </>
  );
};

export default StudentLoginForm;
