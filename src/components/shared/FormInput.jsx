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
  return (
    <FormControl id={name}>
      <FormLabel fontWeight={"bold"} fontSize={"sm"}>
        {label}
      </FormLabel>
      <Input
        type={type}
        name={name}
        fontSize={"sm"}
        value={data[name]}
        placeholder={placeholder}
        onChange={handleChange}
        {...params}
      />
    </FormControl>
  );
}
