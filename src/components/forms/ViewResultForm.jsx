import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useClasses } from "../../hooks";

export default function ViewResultForm({
  setSession,
  setTerm,
  setUserId,
  handleSubmit,
}) {
  const { schoolClasses } = useClasses();
  return (
    <form onSubmit={handleSubmit} method="GET">
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
          <FormLabel>Class</FormLabel>
          <Select
            placeholder="Select Term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="term1">Select Class</option>

            {schoolClasses.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {schoolClass.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select
            placeholder="Select Term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="term1">-- Select Type --</option>
            <option value="term2">Exam</option>
            <option value="term3">Second Test</option>
            <option value="term3">First Test</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal" onClick={handleSubmit}>
          View Results
        </Button>
      </Stack>
    </form>
  );
}
