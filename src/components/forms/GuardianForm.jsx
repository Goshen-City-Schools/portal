import { FormButton, FormInput, FormSelect, FormTextArea } from "../shared";
import { Grid, Flex, Button, Text, Stack } from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";
import { useModal } from "../../app/contexts/ModalContext";
import { useEffect, useState } from "react";
import DynamicSuggestionDropdown from "../shared/DynamicSuggestionDropdown";
import AddGuardianPortal from "../../portals/AddGuardian.portal";
import { useGuardians } from "../../hooks/Guardians";
import { registerGuardian } from "../../api/guardian.api";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// TODO: Get and display appropriate error response.
export function GuardianFormController({ formData, handleInputChange }) {
  const { openPortal, closePortal } = useModal();
  const { guardiansData, error, isLoading } = useGuardians();

  const [guardianData, setGuardianData] = useState({});

  useEffect(() => {
    if (guardiansData) {
      setGuardianData(guardiansData);
    }
  }, [guardiansData]);

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
  const navigate = useNavigate();
  const toast = useToast();

  const {
    title,
    firstName,
    lastName,
    occupation,
    maritalStatus,
    contactAddress,
    email,
    telNumber,
    whatsApp,
  } = guardianData || {};

  const [formData, setFormData] = useState({
    title: title || "",
    firstName: firstName || "",
    lastName: lastName || "",
    occupation: occupation || "",
    maritalStatus: maritalStatus || "",
    contactAddress: contactAddress || "",
    email: email || "",
    telNumber: telNumber || "",
    whatsApp: whatsApp || "",
  });

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.occupation ||
      !formData.maritalStatus ||
      !formData.contactAddress ||
      !formData.email ||
      !formData.telNumber
    ) {
      const registrationError = toast({
        title: "Account Creation Error",
        description: "All fields are required for guardian account creation!",
        status: "error",
        position: "top-right",
        duration: 1000,
      });
      return;
    }

    registerGuardian(formData)
      .then((response) => {
        closePortal();
        const registrationSuccess = toast({
          title: "Account Creation Successful!",
          description: "Guardian registered successfully!",
          status: "success",
          position: "top-right",
          duration: 1000,
        });
        navigate("/admin/parents");
      })
      .catch((error) => {
        const registrationeror = toast({
          title: "Error registering guardian",
          description: error,
          status: "error",
          position: "top-right",
          duration: 1000,
        });
      });
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
          name={"telNumber"}
          label={"Tel. Number"}
          data={formData}
          handleChange={handleInputChange}
        />
        <FormInput
          action={"guardianEdit"}
          type="tel"
          name={"whatsApp"}
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
