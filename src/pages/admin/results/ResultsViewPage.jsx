import React, { useState } from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

export default function ResultsViewPage() {
  const [session, setSession] = useState("");
  const [term, setTerm] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can perform an action here, such as fetching results based on the user's selections
    // For this example, we'll just log the values
    console.log("Session:", session);
    console.log("Term:", term);
    console.log("User ID:", userId);

    navigate(`/admin/results/${session}/${term}/${userId}`);
  };

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"View Results"}
        pageCrumb={"Home / Results / View Results"}
      />
      <Box width={"full"} maxW={"lg"} mx={"auto"}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Session</FormLabel>
              <Select
                placeholder="Select Session"
                value={session}
                onChange={(e) => setSession(e.target.value)}
              >
                <option value="session1">2022 - 2023</option>
                <option value="session2">2023 - 2024</option>
                <option value="session3">2024 - 2025</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Term</FormLabel>
              <Select
                placeholder="Select Term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              >
                <option value="term1">First Term</option>
                <option value="term2">Second Term</option>
                <option value="term3">Third Term</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>User ID</FormLabel>
              <Input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" onClick={handleSubmit}>
              View Results
            </Button>
          </Stack>
        </form>
      </Box>
    </PageWrapper>
  );
}
