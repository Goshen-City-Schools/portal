import React from "react";

import { Select, FormControl, FormLabel } from "@chakra-ui/react";

export default function FormSelect({
  label,
  name,
  formData,
  data, // the data to map throup to display options
  action,
  data_item_name, // the option name displayed in the option
  data_item_value, // the option value to be stored when selected
  handleChange,
  children, // If data is not passed then allow for children to be manually typed in
}) {
  return (
    <FormControl id={name}>
      <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
        {label}
      </FormLabel>
      <Select
        fontSize={"sm"}
        name={name}
        disabled={action === "edit"}
        value={formData[name]}
        onChange={handleChange}
      >
        <option value="">-- Select {label} --</option>

        {action === "edit"
          ? children
          : data?.map((data_item) => (
              <option
                key={data_item[data_item_value]}
                value={data_item[data_item_value]}
              >
                {data_item[data_item_name]}
              </option>
            ))}
      </Select>
    </FormControl>
  );
}
