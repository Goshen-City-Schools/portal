import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

export default function ViewResultForm({
  setSession,
  setTerm,
  setUserId,
  handleSubmit,
}) {
  return (
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
  );
}
