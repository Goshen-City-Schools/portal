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
import ViewResultForm from "../../../components/forms/ViewResultForm";

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

    if (!session || !term || !userId) {
      return alert("Invalid Request!");
    }
    navigate(`/admin/results/${session}/${term}/${userId}`);
  };

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"View Results"}
        pageCrumb={"Home / Results / View Results"}
      />
      <Box width={"full"} maxW={"lg"} mx={"auto"}>
        <ViewResultForm
          setSession={setSession}
          setTerm={setTerm}
          setUserId={setUserId}
          handleSubmit={handleSubmit}
        />
      </Box>
    </PageWrapper>
  );
}
