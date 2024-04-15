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
      <FormLabel fontWeight={"bold"} fontSize={"xs"}>
        {label}
      </FormLabel>
      <Input
        type={type}
        name={name}
        fontSize={"sm"}
        value={data[name]}
        placeholder={placeholder}
        onChange={handleChange}
        bg={hasValue ? "gray.100" : "white"} // Set the background color based on whether there's a value
        {...params}
      />
    </FormControl>
  );
}
