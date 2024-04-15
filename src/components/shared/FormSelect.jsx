import React from "react";

import { Select, FormControl, FormLabel } from "@chakra-ui/react";

export default function FormSelect({
  label,
  name,
  formData,
  data,
  action,
  data_item_name,
  data_item_value,
  handleChange,
  children,
}) {
  const renderOptions = (options) => {
    return options.map((option) => {
      if (Array.isArray(option)) {
        // If the option is an array, recursively render its items
        const [groupLabel, groupOptions] = option;
        return (
          <optgroup key={groupLabel} label={groupLabel}>
            {renderOptions(groupOptions)}
          </optgroup>
        );
      } else {
        // If the option is a simple object, render it
        return (
          <option key={option[data_item_value]} value={option[data_item_value]}>
            {option[data_item_name]}
          </option>
        );
      }
    });
  };

  const hasValue = !!formData[name];

  return (
    <FormControl id={name} className="">
      <FormLabel fontSize={"xs"} fontWeight={"semibold"}>
        {label}
      </FormLabel>
      <Select
        fontSize={"sm"}
        name={name}
        disabled={action === "edit"}
        value={formData[name]}
        onChange={handleChange}
        className="capitalize"
        bg={hasValue ? "gray.100" : "white"}
      >
        <option value="">-- Select {label} --</option>

        {action === "edit" ? children : data && renderOptions(data)}
      </Select>
    </FormControl>
  );
}
