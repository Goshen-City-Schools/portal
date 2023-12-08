import { FormButton, FormInput, FormSelect, FormTextArea } from "../shared";
import { Grid, Flex, Button, Text, Stack } from "@chakra-ui/react";

import ngStates from "../../data/nigeria_states.json";
import { MdAdd } from "react-icons/md";
import { useModal } from "../../app/contexts/ModalContext";
import { useEffect, useState } from "react";
import DynamicSuggestionDropdown from "../shared/DynamicSuggestionDropdown";
import AddGuardianPortal from "../../portals/AddGuardian.portal";
import { useGuardians } from "../../hooks/Guardians";

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
        colorScheme="blue"
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
  const {
    title,
    firstName,
    lastName,
    occupation,
    relationshipStatus,
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
    relationshipStatus: relationshipStatus || "",
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

  return (
    <form className="flex gap-8 flex-col px-2 py-4 mt-4">
      <FormSelect
        disabled={action == "studentEdit"}
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
          disabled={action == "studentEdit"}
          name={"firstName"}
          label={"First name"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          action={"studentEdit"}
          name={"lastName"}
          label={"Surname"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      <FormSelect
        disabled={action == "studentEdit"}
        data={[{ name: "Mr.", value: "mr" }]}
        label={"Occupation"}
        name={"occupation"}
        formData={formData}
        data_item_name={"name"}
        data_item_value={"value"}
        handleChange={handleInputChange}
      />

      {/* Occupation & Relationship to Student */}
      {/* <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}> */}
      <FormSelect
        disabled={action == "studentEdit"}
        data={[
          { name: "Single", value: "single" },
          { name: "Married", value: "married" },
          { name: "Divorced", value: "divorced" },
        ]}
        label={"Relationship Status"}
        name={"relationshipStatus"}
        formData={formData}
        data_item_name={"name"}
        data_item_value={"value"}
        handleChange={handleInputChange}
      />
      {/* </Grid> */}

      <FormInput
        action={"studentEdit"}
        name={"email"}
        label={"Email"}
        data={formData}
        type="email"
        handleChange={handleInputChange}
      />
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormInput
          action={"studentEdit"}
          type="tel"
          name={"phoneNumber"}
          label={"Tel. Number"}
          data={formData}
          handleChange={handleInputChange}
        />
        <FormInput
          action={"studentEdit"}
          type="tel"
          name={"whatsappNumber"}
          label={"Whatsapp Number"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* State of Residence & Phone Number */}

      {/* Contact Address*/}
      <FormTextArea
        disabled={action == "studentEdit"}
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
      />

      <FormSelect
        disabled={action == "studentEdit"}
        data={ngStates}
        label={"State of Residence"}
        name={"stateOfResidence"}
        formData={formData}
        data_item_name={"state"}
        data_item_value={"alias"}
        handleChange={handleInputChange}
      />

      {/* Email & Whatsapp Number */}

      {!action && <FormButton label={"Create Guardian Data"} />}
    </form>
  );
}
