import React, { useState } from "react";
import {
  Select,
  Stack,
  Checkbox,
  CheckboxGroup,
  Button,
  VStack,
} from "@chakra-ui/react";

const MultiSelect = ({
  options,
  selectedItems,
  setSelectedItems,
  label,
  value,
}) => {
  const handleCheckboxChange = (selected) => {
    setSelectedItems(selected);
  };

  return (
    <VStack align="start" spacing={4}>
      {/* Using Checkbox Group */}
      <CheckboxGroup
        colorScheme="teal"
        onChange={handleCheckboxChange}
        value={selectedItems}
      >
        <Stack direction="row">
          {options.map((option) => (
            <Checkbox key={option[value]} value={option[value]}>
              {option[label]}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      {/* Button to submit selected items */}
      <Button colorScheme="teal" onClick={handleButtonClick}>
        Submit
      </Button>
    </VStack>
  );
};

export default MultiSelect;
