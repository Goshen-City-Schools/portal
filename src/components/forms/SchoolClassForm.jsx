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
import CustomSelect from "../shared/Select.component";
import useClasses from "../../hooks/useClasses";

export default function SchoolClassForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { schoolClasses } = useClasses();
  const [formData, setFormData] = useState({
    schoolClass_name: "",
    schoolClass_subClass_name: "",
  });

  const toast = useToast();
  const { closePortal } = useModal();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmitCreateEvent(e) {
    e.preventDefault();

    if (!formData.schoolClass_name || !formData.schoolClass_subClass_name) {
      toast({
        title: "All fields are required!",
        position: "top-right",
        status: "error",
        duration: "1100",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: `${
          schoolClasses.find(
            (schoolClass) => schoolClass.value === formData.schoolClass_name
          ).name
        } ${formData.schoolClass_subClass_name} class created successfully!`,
        position: "top-right",
        status: "success",
        duration: "1200",
      });
      closePortal();
    }, 1600);
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
            name="schoolClass_name"
            onChange={handleChange}
            value={formData.schoolClass_name}
          >
            <option value="">-- School Class --</option>

            {schoolClasses.map((classCategory) => (
              <option value={classCategory.value}>{classCategory.name}</option>
            ))}
          </CustomSelect>
        </FormControl>

        {formData.schoolClass_name && (
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
                name="schoolClass_subClass_name"
                onChange={handleChange}
                value={formData.schoolClass_subClass_name}
              />
            </FormControl>
          </>
        )}

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
