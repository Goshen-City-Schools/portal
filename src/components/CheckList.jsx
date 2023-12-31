import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  CheckboxGroup,
  Checkbox,
  Grid,
} from "@chakra-ui/react";

const Checklist = ({
  items,
  selectedItems,
  handleAssignItems,
  title,
  buttonText,
  colorScheme,
}) => {
  const [selectedItemsState, setSelectedItemsState] = useState(
    selectedItems || []
  );

  console.log(items);

  const handleCheckboxChange = (selectedValues, cmd) => {
    setSelectedItemsState((prevSelectedItems) => {
      // Assuming you want to perform some logic based on cmd (add or remove)
      // For simplicity, we'll use selectedValues directly
      console.log(selectedItems, selectedValues);
      return selectedValues;
    });
  };

  return (
    <Box mb={6}>
      <Text as="h2" mb={4} fontWeight="bold" color="neutral.700" mt={0}>
        {title}
      </Text>
      <CheckboxGroup value={selectedItemsState} onChange={handleCheckboxChange}>
        <Grid gridTemplateColumns="repeat(2, 1fr)" align="start" gap={2}>
          {items?.map((item) => (
            <Checkbox key={item.name || item} value={item._id}>
              {typeof item === "object" ? item.name : item}
            </Checkbox>
          ))}
        </Grid>
      </CheckboxGroup>

      <Button
        onClick={() => handleAssignItems(selectedItemsState, "classes")}
        size="sm"
        mt={4}
        display="grid"
        w="full"
        ml="auto"
        colorScheme={colorScheme}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default Checklist;
