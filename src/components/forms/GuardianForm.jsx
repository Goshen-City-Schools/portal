import React from "react";
import { FormButton, FormInput, FormSelect } from "../shared";

import { Grid } from "@chakra-ui/react";

import ngStates from "../data/nigeria_states.json";

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
  } = guardianData;

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
    <form className="flex gap-8 flex-col">
      {/* Title, Firstname, Lastname */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <FormSelect
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

        <FormInput
          name={"firstName"}
          label={"First name"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          name={"lastName"}
          label={"Surname"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Occupation & Relationship to Student */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          data={[{ name: "Mr.", value: "mr" }]}
          label={"Occupation"}
          name={"occupation"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"value"}
          handleChange={handleInputChange}
        />

        <FormSelect
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
      </Grid>

      {/* State of Residence & Phone Number */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          data={ngStates}
          label={"State of Residence"}
          name={"stateOfResidence"}
          formData={formData}
          data_item_name={"state"}
          data_item_value={"alias"}
          handleChange={handleInputChange}
        />

        <FormInput
          type="tel"
          name={"phoneNumber"}
          label={"Tel. Number"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Contact Address*/}
      <FormTextArea
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
      />

      {/* Email & Whatsapp Number */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormInput
          name={"email"}
          label={"Email"}
          data={formData}
          type="email"
          handleChange={handleInputChange}
        />

        <FormInput
          type="tel"
          name={"whatsappNumber"}
          label={"Whatsapp Number"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      <FormButton label={"Add Guardian to Student"} />
    </form>
  );
}
