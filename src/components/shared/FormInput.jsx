import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function FormInput({
  name,
  label,
  handleChange,
  type = "text",
  data,
  placeholder = label,
  ...params
}) {
  const hasValue = !!data[name];

  return (
    <FormControl id={name}>
      <FormLabel fontWeight={"semibold"} fontSize={"base"}>
        {label}
      </FormLabel>
      <Input
        type={type}
        name={name}
        px={4}
        py={3}
        fontSize={"sm"}
        value={data[name]}
        placeholder={placeholder}
        border={"1px"}
        borderColor={"gray.300"}
        onChange={handleChange}
        bg={hasValue ? "gray.100" : "white"} // Set the background color based on whether there's a value
        {...params}
      />
    </FormControl>
  );
}
