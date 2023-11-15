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
import { useNavigate } from "react-router-dom";
import defaultConfigValues from "../data/defaultConfigValues";
import determineUserType from "../helpers/determineUserType";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUser } from "../app/contexts/UserContext";
import { useToast } from "@chakra-ui/react";

export default function LoginScreen() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, setUser, login } = useUser();
  const studentsData = useLocalStorage("studentsData").getItem();
  const staffData = useLocalStorage("staffData").getItem();

  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [extractedID, setExtractedID] = useState("");

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

  const extractID = (userID) => {
    const parts = userID.split("/");
    return parts[parts.length - 1];
  };

  // Function to handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const extracted = extractID(userID); // Extract the ID from the user's input
    setExtractedID(extracted);

    if (!/^GSHN\/(STF|STU)\/\w{5}$/.test(userID) || password.trim() === "") {
      setLoginError("Invalid login details");
      showToast("Invalid login details", "error");
      return;
    }

    if (userID) {
      const userType = determineUserType(userID);
      const userData = userType === "Staff" ? staffData : studentsData;
      const userToLogin = {
        id: userID,
        password: password,
      };

      if (userToLogin) {
        login(userToLogin);
        setIsLoading(true);
      } else {
        showToast(`${userType} not found`, "error");
      }
    }
  });

  const showToast = (message, status) => {
    toast({
      title: message,
      duration: "2000",
      position: "top-right",
      status: status,
    });
  };

  // Effect to navigate on successful login
  useEffect(() => {
    if (user) {
      const userType = determineUserType(userID);
      const path = userType === "Staff" ? "/admin" : "/";
      navigate(path);
    }
  }, [user, userID, navigate, extractedID]);

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
