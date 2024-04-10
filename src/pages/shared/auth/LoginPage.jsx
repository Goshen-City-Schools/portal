import React, { useState, useCallback } from "react";
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
  useToast,
  Link,
  TabList,
  Tab,
} from "@chakra-ui/react";
import defaultConfigValues from "../../../data/defaultConfigValues";
import determineUserType from "../../../helpers/determineUserType";

import { MdArrowForward } from "react-icons/md";
import { useAuth } from "../../../app/contexts/AuthContext";

export default function LoginPage() {
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
      // showToast(`Invalid login details`, "error");
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
            <Link
              className="flex flex-col justify-center items-center no-underline !active:no-underline !hover:no-underline"
              href="https://gshnsch.vercel.com"
              _hover={{ textDecoration: "none" }}
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
              <Text
                as={"h3"}
                fontSize={"3xl"}
                fontWeight={"bold"}
                color={"brand.100"}
              >
                GOSHEN GROUP OF SCHOOLS
              </Text>
              <Text
                as={"p"}
                fontSize={"sm"}
                fontWeight={"bolder"}
                className="tracking-wider"
                color={"accent.100"}
              >
                CRE . NUR . BASIC . SEC
              </Text>
            </Link>
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
          padding={{ base: "6" }}
          height={"full"}
          justifyContent={"center"}
          flexDirection={"column"}
          w={{ base: "100%", md: "82%" }}
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
              color={"brand.900"}
              as={"h3"}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight={"bolder"}
            >
              Welcome back
            </Text>
            <Text color={"brand.900"} as={"small"} fontSize={"md"}>
              Fill in your details below to login
            </Text>
          </Flex>

          {/* Use ChakraUI Tabs and it's TAB Contexts */}
          {/* 
          <TabList>
            <Tab>Staff</Tab>
            <Tab>Student</Tab>
            <Tab>Parent</Tab>
          </TabList> */}

          <form onSubmit={handleSubmit}>
            <FormControl mb={2}>
              <FormLabel
                fontWeight={"bold"}
                color={"accent.700"}
                fontSize={"sm"}
              >
                Student / Staff ID
              </FormLabel>
              <Input
                type="text"
                name="userID"
                height={"56px"}
                value={userID}
                onChange={handleInputChange}
                placeholder="Enter your ID number"
                border={"1px"}
                borderColor={"brand.900"}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color={"accent.700"}
                fontWeight={"bold"}
                fontSize={"sm"}
              >
                Password
              </FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                height={"56px"}
                placeholder="Enter password"
                onChange={handleInputChange}
                border={"1px"}
                borderColor={"brand.900"}
              />
            </FormControl>

            <FormControl>
              <FormHelperText color={"error.700"}>{loginError}</FormHelperText>
            </FormControl>

            <Button
              mt={4}
              bg={"brand.900"}
              border={"3px solid transparent"}
              _hover={{
                bg: "transparent",
                borderColor: "brand.900",
                color: "brand.900",
              }}
              color={"white"}
              isLoading={isLoading}
              type="submit"
              py={"6"}
              height={"48px"}
              className="flex items-center gap-4"
            >
              Login <MdArrowForward />
            </Button>
          </form>

          <div className="flex mt-4 gap-4 justify-between">
            <Link
              className="mt-4"
              href={"https://gshnsch.vercel.app"}
              color={"accent.800"}
              fontSize={"sm"}
              textDecoration={"underline"}
              textUnderlineOffset={4}
              fontWeight={"600"}
            >
              Visit Website
            </Link>
            <Link
              href={"/password-reset"}
              color={"accent.800"}
              fontSize={"sm"}
              textDecoration={"underline"}
              textUnderlineOffset={4}
              fontWeight={"600"}
            >
              Reset Password
            </Link>
          </div>
        </GridItem>
      </Grid>
    </motion.div>
  );
}
