import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, setLoginError } from "../app/redux/slices/formSlice";

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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import determineUserType from "../helpers/determinUserType";
import LoadingScreen from "./Loading.screen";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(false);

  const { userID, password, loginError } = useSelector((state) => state.form);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ fieldName: name, fieldValue: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Validate the userID and password
    if (!/^GSHN\/(STF|STU)\/\d{4}$/.test(userID) || password.trim() === "") {
      dispatch(setLoginError({ errorMessage: "Invalid login details" }));
      setTimeout(() => {
        dispatch(setLoginError({ errorMessage: "" }));
      }, 2000);
      return;
    }

    // Hit Backend Validate, if true and User type is STAFF, Send OTP

    // Clear any previous error message
    dispatch(setLoginError({ errorMessage: "" }));

    // Define typedUserID
    let typedUserID;

    // Set the userID based on what the user typed in
    dispatch(updateField({ fieldName: "userID", fieldValue: typedUserID }));

    // Simulate a successful login and set user data
    const userData = {
      "userID": typedUserID,
      "name": "Nkechinyere Harrison",
      "userType": determineUserType(userID),
      "isAuthenticated": true,
    };

    const userDataString = JSON.stringify(userData);

    localStorage.setItem("user", userDataString);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (userData.userType == "student") {
        navigate("/");
      } else navigate("/admin");
    }, 2000);
  }

  if (loggedInUser) {
    return <LoadingScreen navigateToPath={"/"} timer={1500} />;
  }

  return (
    <Grid height={"100vh"} templateColumns="repeat(2, 1fr)">
      <GridItem
        display={"flex"}
        height={"full"}
        bg={"brand.200"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          position={"relative"}
          height={"64"}
          width={"64"}
          overflow={"hidden"}
        >
          <img
            src="/Goshen-logo-trans.png"
            alt=""
            className="absolute object-contain w-full h-full"
          />
        </Box>
      </GridItem>
      <GridItem
        display={"flex"}
        padding={12}
        height={"full"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        {/* Welcome Text */}
        <Flex direction={"column"} marginBottom={12}>
          <Text as={"h3"} fontSize={"3xl"} fontWeight={"bold"}>
            Welcome back
          </Text>
          <Text as={"small"} fontSize={"sm"}>
            Fill in your details below to login
          </Text>
        </Flex>

        {/* Form Submission */}
        <form onSubmit={handleSubmit}>
          {/* UserID */}
          <FormControl mb={2}>
            <FormLabel fontSize={"sm"}>Student/Staff ID</FormLabel>
            <Input
              type="text"
              name="userID"
              value={userID}
              onChange={handleInputChange}
              placeholder="Enter your ID number"
            />
          </FormControl>

          {/* Password */}
          <FormControl>
            <FormLabel fontSize={"sm"}>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Error message */}
          <FormControl>
            <FormHelperText color={"error.700"}>{loginError}</FormHelperText>
          </FormControl>

          <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
            Login
          </Button>
        </form>
      </GridItem>
    </Grid>
  );
}
