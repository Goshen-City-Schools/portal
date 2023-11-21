import React from "react";

import {
  FormControl,
  FormLabel,
  Button,
  Text,
  Flex,
  Input,
} from "@chakra-ui/react";
import CustomSelect from "../shared/Select.component";
import { useState } from "react";

export default function FeeForm() {
  const [requestData, setRequestData] = useState({
    session: "",
    term: "",
    accountType: "",
    studentType: "",
    feeName: "",
  });
  function handleFormSubmit() {}

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Select session */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Session
        </FormLabel>
        <CustomSelect name={requestData.session}>
          <option value="20232024">2023 - 2024</option>
          <option value="20232024">2024 - 2025</option>
          <option value="20232024">2025 - 2026</option>
        </CustomSelect>
      </FormControl>

      {/* Select term */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Term
        </FormLabel>
        <CustomSelect name={requestData.session}>
          <option value="term1">First Term</option>
          <option value="term2">Second Term</option>
          <option value="term3">Third Term</option>
        </CustomSelect>
      </FormControl>

      {/* Select fee type */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Type of Fee
        </FormLabel>
        <CustomSelect name={requestData.session}>
          <option value="term1">First Term</option>
          <option value="term2">Second Term</option>
          <option value="term3">Third Term</option>
        </CustomSelect>
      </FormControl>

      <Flex w={"full"} justifyContent={"flex-end"}>
        <Text as={"small"}>New fee type</Text>
      </Flex>

      {/* Select Account Type fee is for */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Fee for
        </FormLabel>
        <CustomSelect name={requestData.session}>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </CustomSelect>
      </FormControl>

      {/* If Account Type is student, select student type */}
      {requestData.accountType === "student" && (
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"bold"}>
            Student Type
          </FormLabel>
          <CustomSelect name={requestData.session}>
            <option value="new">New Student</option>
            <option value="returning">Returning Student</option>
          </CustomSelect>
        </FormControl>
      )}

      {/* Fee name */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"bold"}>
          Fee Name
        </FormLabel>
        <Input name={requestData.feeName} type="text" />
      </FormControl>

      {/* Submit request button */}
      <Button mb={4} fontSize={"sm"} colorScheme={"blue"} type="submit">
        Complete fee Setup
      </Button>
    </form>
  );
}
