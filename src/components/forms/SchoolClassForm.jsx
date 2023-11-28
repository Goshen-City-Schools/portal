import React from "react";

import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useModal } from "../../app/contexts/ModalContext";
import { useClasses } from "../../hooks/";

import CustomSelect from "../shared/Select.component";

import { createSubClass } from "../../api/school_class.api";

export default function SchoolClassForm() {
  const toast = useToast();
  const { closePortal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { schoolClasses } = useClasses();
  const [formData, setFormData] = useState({
    schoolClass: "",
    name: "",
    color: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmitCreateEvent(e) {
    e.preventDefault();

    if (!formData.schoolClass || !formData.name || !formData.color) {
      toast({
        title: "All fields are required!",
        position: "top-right",
        status: "error",
        duration: "1100",
      });
      return;
    }

    setIsLoading(true);

    // Assuming createSubClass API function is available
    createSubClass(formData)
      .then((response) => {
        setIsLoading(false);
        console.log(response);

        toast({
          title: `${
            schoolClasses.find(
              (schoolClass) => schoolClass.value === formData.schoolClass
            ).name
          } ${response.name} class created successfully!`,
          position: "top-right",
          status: "success",
          duration: "1200",
        });
        closePortal();
      })
      .catch((error) => {
        setIsLoading(false);

        toast({
          title: "Error creating class. Please try again.",
          position: "top-right",
          status: "error",
          duration: "1200",
        });
        console.error("Error creating class:", error);
      });
  }

  return (
    <form onSubmit={handleSubmitCreateEvent}>
      <Stack spacing={4} mb={4}>
        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Select Class
          </FormLabel>

          <CustomSelect
            name="schoolClass"
            onChange={handleChange}
            value={formData.schoolClass}
          >
            <option value="">-- School Class --</option>

            {schoolClasses.map((classCategory) => (
              <option value={classCategory.value}>{classCategory.name}</option>
            ))}
          </CustomSelect>
        </FormControl>

        {formData.schoolClass && (
          <>
            <FormControl
              my={2}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
                New Sub Class Name
              </FormLabel>

              <Input
                type="text"
                size={"sm"}
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </FormControl>
          </>
        )}

        <FormControl
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Select Color
          </FormLabel>

          <CustomSelect
            name="color"
            onChange={handleChange}
            value={formData.color}
          >
            <option value="">-- Select Color --</option>

            <option value="blue">Blue</option>
          </CustomSelect>
        </FormControl>

        <Button
          colorScheme={"green"}
          w={"max-content"}
          fontSize={"sm"}
          mx={"auto"}
          isLoading={isLoading}
          mt={2}
          type="submit"
        >
          Add New Subclass
        </Button>
      </Stack>
    </form>
  );
}
