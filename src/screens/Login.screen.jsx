import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import defaultConfigValues from "../data/defaultConfigValues";
import determineUserType from "../helpers/determineUserType";

import { useToast } from "@chakra-ui/react";
import { useAuth } from "../app/contexts/AuthContext";

export default function LoginScreen() {
  const toast = useToast();
  const { login, isLoading, setIsLoading } = useAuth();

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleInputChange = useCallback((e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "userID") {
      setUserID(value);
      setLoginError(""); // Clear login error when user interacts with the form
    } else if (name === "password") {
      setPassword(value);
      setLoginError("");
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!/^GSHN\/(STF|STU)\/\w{5}$/.test(userID) || password.trim() === "") {
      setLoginError("Invalid login format, try again.");
      return;
    }

    try {
      if (userID) {
        const userType = determineUserType(userID);
        const userToLogin = {
          username: userID,
          password: password,
        };

        if (userToLogin) {
          await login(userToLogin);
          setIsLoading(true);
        } else {
          setIsLoading(false);
          showToast(`${userType} not found`, "error");
        }
      } else {
        setIsLoading(false);
        showToast(`Account not found`, "error");
      }
    } catch (error) {
      // Handle the error and reset loading state
      console.error("Login failed:", error.message);
      setError("Invalid username or password");
    } finally {
      showToast(`Invalid login details`, "error");

      setIsLoading(false);
    }
  });

  const showToast = (message, status) => {
    toast({
      title: message,
      duration: "2000",
      position: "top-right",
      status: status,
      size: "sm",
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={defaultConfigValues.pageVariants}
    >
      <Grid
        height={"100vh"}
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      >
        <GridItem
          display={{ base: "none", md: "flex" }}
          flexDirection={"column"}
          height={"full"}
          bg={"brand.700"}
          justifyContent={"start"}
          alignItems={"center"}
          gap={8}
        >
          <Flex
            direction={"column"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              position={"relative"}
              height={"48"}
              width={"48"}
              overflow={"hidden"}
            >
              <img
                src="/Goshen-logo-trans.png"
                alt="Goshen group of Schools logo"
                className="absolute object-contain w-full h-full"
              />
            </Box>
            <Text as={"h3"} fontSize={"3xl"} fontWeight={"bold"}>
              GOSHEN GROUP OF SCHOOLS
            </Text>
            <Text as={"p"} fontSize={"sm"}>
              Wisdom, the principal thing
            </Text>{" "}
          </Flex>

          <Box
            w={"100%"}
            h={"380px"}
            mt={12}
            position={"relative"}
            overflow={"hidden"}
          >
            <img
              src="/Illustration.png"
              alt=""
              className="absolute top-0 h-full w-full object-contain"
            />
          </Box>
        </GridItem>

        <GridItem
          display={"flex"}
          padding={{ base: "6", md: "12" }}
          height={"full"}
          justifyContent={"center"}
          flexDirection={"column"}
          w={{ base: "100%", md: "80%" }}
          marginX={"auto"}
        >
          <Box
            position={"relative"}
            height={"48"}
            width={"48"}
            overflow={"hidden"}
            mx={{ base: "auto" }}
            display={{ base: "flex", md: "none" }}
          >
            <img
              src="/Goshen-logo-trans.png"
              alt="Goshen group of Schools logo"
              className="absolute object-contain w-full h-full"
            />
          </Box>
          <Flex
            direction={"column"}
            alignItems={{ base: "center", md: "start" }}
            marginBottom={12}
          >
            <Text
              as={"h3"}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight={"bold"}
            >
              Welcome back
            </Text>
            <Text as={"small"} fontSize={"md"}>
              Fill in your details below to login
            </Text>
          </Flex>

          <form onSubmit={handleSubmit}>
            <FormControl mb={2}>
              <FormLabel fontSize={"sm"}>Student / Staff ID</FormLabel>
              <Input
                type="text"
                name="userID"
                height={"56px"}
                value={userID}
                onChange={handleInputChange}
                placeholder="Enter your ID number"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={"sm"}>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                height={"56px"}
                placeholder="Enter password"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormHelperText color={"error.700"}>{loginError}</FormHelperText>
            </FormControl>

            <Button
              mt={4}
              bg={"brand.900"}
              color={"white"}
              isLoading={isLoading}
              type="submit"
              py={"6"}
              height={"48px"}
            >
              Login
            </Button>
          </form>
        </GridItem>
      </Grid>
    </motion.div>
  );
}
