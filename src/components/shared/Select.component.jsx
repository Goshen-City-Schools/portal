import React from "react";
import { Box, Select, IconButton } from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// CustomSelect component
const CustomSelect = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Select {...props} flex="1" fontSize={"sm"} />
    </Box>
  );
};

export default CustomSelect;
