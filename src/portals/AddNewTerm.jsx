import React from "react";

import { Text, FormControl, Input, FormLabel, Select } from "@chakra-ui/react";

export default function AddNewTerm() {
  return (
    <>
      <Text as={"h3"} fontWeight={"bold"} fontSize={"2xl"} mb={"12"}>
        Add New Term
      </Text>
      <form>
        <FormControl>
          <FormLabel>Name of Term</FormLabel>
          <Input
            type="text"
            name="userID"
            height={"48px"}
            placeholder="Enter name of term"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Code</FormLabel>
          <Select>
            <option value="">Select Term's Code</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select>
            <option value="">Select Status</option>
          </Select>
        </FormControl>
      </form>
    </>
  );
}
