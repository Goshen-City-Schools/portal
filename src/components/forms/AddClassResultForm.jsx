import React from "react";
import { useState } from "react";

import { Stack, FormControl, FormLabel } from "@chakra-ui/react";
import CustomSelect from "../shared/Select.component";

function AddClassResultForm() {
  const [formData, setFormData] = useState({
    schoolClass: "",
    term: "",
    session: "",
  });
  return (
    <form action="">
      <Stack>
        {/* Select Clss */}
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Class
          </FormLabel>

          <CustomSelect
            name="fullName"
            onChange={handleFormChange}
            value={formData.schoolClass}
          >
            <option value="">-- Select Class --</option>
          </CustomSelect>
        </FormControl>

        {/* Select Session */}
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Class
          </FormLabel>

          <CustomSelect
            name="fullName"
            onChange={handleFormChange}
            value={formData.schoolClass}
          >
            <option value="">-- Select Class --</option>
          </CustomSelect>
        </FormControl>

        {/* Select Term */}
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Class
          </FormLabel>

          <CustomSelect
            name="fullName"
            onChange={handleFormChange}
            value={formData.schoolClass}
          >
            <option value="">-- Select Class --</option>
          </CustomSelect>
        </FormControl>
      </Stack>
    </form>
  );
}

export default AddClassResultForm;
