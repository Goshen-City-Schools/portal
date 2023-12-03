import React, { useState } from "react";
import { Select, Input, Stack, FormControl, FormLabel } from "@chakra-ui/react";

const SelectWithSearch = ({ options, label, placeholder, onSelect, name }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <Select
          name={name}
          value={selectedValue}
          onChange={handleSelectChange}
          placeholder="Select an option"
        >
          {filteredOptions?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

// // Example usage
// const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

// function YourComponent() {
//   const handleSelect = (value) => {
//     console.log("Selected:", value);
//     // Add your logic for handling the selected value
//   };

//   return (
//     <SelectWithSearch
//       options={options}
//       label="Select an option"
//       placeholder="Search options"
//       onSelect={handleSelect}
//     />
//   );
// }

export default SelectWithSearch;
