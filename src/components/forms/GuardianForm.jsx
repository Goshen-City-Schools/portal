import { FormButton, FormInput, FormSelect, FormTextArea } from "../shared";
import { Grid, Flex, Button, Text, Stack } from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";
import { useModal } from "../../app/contexts/ModalContext";
import { useEffect, useState } from "react";
import DynamicSuggestionDropdown from "../shared/DynamicSuggestionDropdown";
import AddGuardianPortal from "../../portals/AddGuardian.portal";
import { useGuardians } from "../../hooks/Guardians";
import { registerGuardian } from "../../api/guardian.api";

// TODO: Get and display appropriate error response.

export function GuardianFormControlller({ formData, handleInputChange }) {
  const { openPortal } = useModal();

  // TODO: Set hook
  const { guardiansData } = useGuardians;

  // TODO: Set hook
  const guardianData = {};

  useEffect(() => {}, [guardianData]);

  function handleClick() {
    openPortal(<AddGuardianPortal />);
  }

  return (
    <Stack w={"full"}>
      <Button
        size={"sm"}
        ml={"auto"}
        display={"flex"}
        onClick={handleClick}
        leftIcon={<MdAdd />}
        colorScheme="facebook"
      >
        Add New Guardian
      </Button>
      <Flex w={"full"}>
        <DynamicSuggestionDropdown
          label="Search to select Guardian"
          placeholder="Type Guardian name to search"
          options={guardiansData}
          onChange={(selectedValue) => {
            // Handle the selected value
          }}
        />

        {formData?.guardian && (
          <FormSelect
            formData={formData}
            handleChange={handleInputChange}
            data={[{ name: "Mother", value: "mother" }]}
            data_item_name={"name"}
            data_item_value={"value"}
            label={"Relationship to Guardian"}
            name={"guardianId"}
          />
        )}
      </Flex>
    </Stack>
  );
}

export default function GuardianForm({ guardianData, action }) {
  const { closePortal } = useModal();

  const {
    title,
    firstName,
    lastName,
    occupation,
    maritalStatus,
    contactAddress,
    stateOfResidence,
    email,
    phoneNumber,
    whatsApp,
  } = guardianData || {};

  const [formData, setFormData] = useState({
    title: title || "",
    firstName: firstName || "",
    lastName: lastName || "",
    occupation: occupation || "",
    maritalStatus: maritalStatus || "",
    contactAddress: contactAddress || "",
    stateOfResidence: stateOfResidence || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    whatsApp: whatsApp || "",
  });

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    registerGuardian(formData);
    console.log("Form Submitted!", formData);
    closePortal();
  }

  return (
    <form
      className="flex gap-4 flex-col px-2 py-4 mt-4 "
      onSubmit={handleFormSubmit}

      // Create guardian account
    >
      <FormSelect
        disabled={action == "guardianEdit"}
        data={[
          { name: "Mr.", value: "mr" },
          { name: "Mrs.", value: "mrs" },
          { name: "Miss", value: "miss" },
          { name: "Dr.", value: "dr" },
          { name: "Dr.", value: "dr" },
          { name: "Engr.", value: "engr" },
          { name: "Prof.", value: "prof" },
        ]}
        label={"Title"}
        name={"title"}
        formData={formData}
        data_item_name={"name"}
        data_item_value={"value"}
        handleChange={handleInputChange}
      />

      {/* Title, Firstname, Lastname */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormInput
          disabled={action == "guardianEdit"}
          name={"firstName"}
          label={"First name"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          action={"guardianEdit"}
          name={"lastName"}
          label={"Surname"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Relationship Status */}
      <FormSelect
        disabled={action == "guardianEdit"}
        data={[
          { name: "Single", value: "single" },
          { name: "Married", value: "married" },
          { name: "Divorced", value: "divorced" },
        ]}
        label={"Marital Status"}
        name={"maritalStatus"}
        formData={formData}
        data_item_name={"name"}
        data_item_value={"value"}
        handleChange={handleInputChange}
      />

      {/* Occupation */}
      <FormSelect
        disabled={action == "guardianEdit"}
        data={[
          { name: "Business Owner", value: "business" },
          { name: "Civil Servant", value: "civil" },
          { name: "Office Worker", value: "worker" },
          { name: "Others", value: "others" },
        ]}
        label={"Occupation"}
        name={"occupation"}
        formData={formData}
        data_item_name={"name"}
        data_item_value={"value"}
        handleChange={handleInputChange}
      />

      {/* </Grid> */}

      {/* Contact Address*/}
      <FormTextArea
        disabled={action == "guardianEdit"}
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
        handleChange={handleInputChange}
      />

      <FormInput
        action={"guardianEdit"}
        name={"email"}
        label={"Email"}
        data={formData}
        type="email"
        handleChange={handleInputChange}
      />
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormInput
          action={"guardianEdit"}
          type="tel"
          name={"phoneNumber"}
          label={"Tel. Number"}
          data={formData}
          handleChange={handleInputChange}
        />
        <FormInput
          action={"guardianEdit"}
          type="tel"
          name={"whatsappNumber"}
          label={"Whatsapp Number"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Email & Whatsapp Number */}

      {!action && <FormButton label={"Create Guardian Data"} />}
    </form>
  );
}
