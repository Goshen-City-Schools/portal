import { FormInput, FormSelect, FormcContainer, FormTextArea } from "../shared";

import { Grid } from "@chakra-ui/react";
import AvatarUpload from "../shared/AvatarUpload";
import ngStates from "../../data/nigeria_states.json";

const StudentDetailsForm = ({
  studentData,
  action,
  formData,
  handleInputChange,
}) => {
  const LGAs =
    ngStates
      .find((ngState) => ngState.alias === formData.stateOfOrigin)
      ?.lgas.map((lga) => ({ name: lga, value: lga })) || [];

  return (
    <FormcContainer>
      {/* Avatar Upload, Active on Edit Mode */}
      {action === "edit" && (
        <AvatarUpload
          formData={formData}
          imgUrl={"avatarImageURL"}
          thisUser={studentData}
        />
      )}

      {/* Firstname & Lastname */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormInput
          name={"firstName"}
          label={"First name"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          name={"lastName"}
          label={"Last name"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Middle name, Gender & Date of Birth */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormInput
          name={"gender"}
          label={"Gender"}
          data={formData}
          handleChange={handleInputChange}
        />

        <FormInput
          name={"dateOfBirth"}
          type="date"
          label={"Date of Birth"}
          data={formData}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Blood Group & Genotype */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          data={[
            { name: "A+", value: "a+" },
            { name: "A-", value: "a-" },
            { name: "O+", value: "o+" },
          ]}
          label={"Blood Group"}
          name={"bloodGroup"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"value"}
          handleChange={handleInputChange}
        />

        <FormSelect
          data={[
            { name: "AA", value: "aa" },
            { name: "AS", value: "as" },
            { name: "ss", value: "ss" },
          ]}
          label={"Genotype"}
          name={"genoType"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"value"}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* State of Origin & LGA */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          data={ngStates}
          label={"State of Origin"}
          name={"stateOfOrigin"}
          formData={formData}
          data_item_name={"state"}
          data_item_value={"alias"}
          handleChange={handleInputChange}
        />

        <FormSelect
          data={LGAs}
          label={"Local Government Area"}
          name={"LGA"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"alias"}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Contact Address */}
      <FormTextArea
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
        handleChange={handleInputChange}
      />
    </FormcContainer>
  );
};

export default StudentDetailsForm;
