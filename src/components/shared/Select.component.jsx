import React from "react";
import { Box, Select } from "@chakra-ui/react";

// CustomSelect component
const CustomSelect = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Select {...props} flex="1" fontSize={"sm"} />
    </Box>
  );
};

export default CustomSelect;
