import { useState } from "react";

import { FormControl, Input, FormLabel, Grid, Select } from "@chakra-ui/react";

import ngStates from "../data/nigeria_states.json";
import { useClassDetails, useClasses } from "../hooks";
import { FormSelect, FormTextArea, AvatarUpload } from "../components/shared";

export function StudentPersonalDetailsUpdateForm({ action, studentData }) {
  const { schoolClasses } = useClasses();

  const {
    firstName,
    lastName,
    otherName,
    gender,
    dateOfBirth,
    stateOfOrigin,
    LGA,
    studentType,
    schoolClass,
    subClass,
    bloodGroup,
    genoType,
    contactAddress,
  } = studentData;

  const { classDetails } = useClassDetails(schoolClass);

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    otherName: otherName || "",
    gender: gender || "",
    dateOfBirth: dateOfBirth || "",
    stateOfOrigin: stateOfOrigin || "",
    studentType: studentType || "",
    schoolClass: schoolClass || "",
    subClass: subClass || "",
    bloodGroup: bloodGroup || "",
    genoType: genoType || "",
    contactAddress: contactAddress || "",
    LGA: LGA || "",
  });

  function handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  }

  const LGAs =
    ngStates.find((ngState) => ngState.alias === formData.stateOfOrigin)
      ?.lgas || [];

  return (
    <form className="flex flex-col gap-8">
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
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <FormInput
          name={"middleName"}
          label={"Middle name"}
          data={formData}
          handleChange={handleInputChange}
        />

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

      {/* Student Type, Class and Sub Class */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <FormSelect
          name={"studentType"}
          label={"Student Type"}
          data={[
            { name: "New", value: "new" },
            { name: "Existing", value: "existing" },
          ]}
          data_item_name={"name"}
          data_item_value={"value"}
          formData={formData}
          action={action}
          handleInputChange={handleInputChange}
        />

        <FormSelect
          name={"schoolClass"}
          label={"Class"}
          data={schoolClasses}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          action={action}
          handleChange={handleInputChange}
        />

        <FormSelect
          name={"subClass"}
          label={"Sub Class"}
          data={classDetails?.subClasses}
          data_item_name={"name"}
          data_item_value={"_id"}
          formData={formData}
          action={action}
          handleChange={handleInputChange}
        />
      </Grid>

      {/* Contact Address */}
      <FormTextArea
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
      />

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
    </form>
  );
}

export function StudentGuardianUpdateForm({ action, guardianData }) {
  const {
    students,
    title,
    firstName,
    lastName,
    occupation,
    relationshipToStudent,
    contactAddress,
    stateOfResidence,
    email,
    phoneNumber,
    whatsApp,
  } = guardianData;

  const [formData, setFormData] = useState({
    students: students || [],
    title: title || "",
    firstName: firstName || "",
    lastName: lastName || "",
    occupation: occupation || "",
    relationshipToStudent: relationshipToStudent || "",
    contactAddress: contactAddress || "",
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

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {/* Occupation */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Occupation
          </FormLabel>

          <Select
            fontSize={"sm"}
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
          >
            <option value="">-- Select Occupation --</option>
          </Select>
        </FormControl>

        {/* Relationship to Student */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Relationship to Student
          </FormLabel>
          <Select
            fontSize={"sm"}
            name="relationshipToStudent"
            value={formData.relationshipToStudent}
            onChange={handleInputChange}
          >
            <option value="">-- Select Relationship --</option>
          </Select>
        </FormControl>
      </Grid>

      {/*State of Residence & Phone Number */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            State of Residence
          </FormLabel>
          <Select
            fontSize={"sm"}
            value={formData.stateOfResidence}
            onChange={handleInputChange}
          >
            <option value="">-- Select State of Residence --</option>

            {ngStates.map((ngState) => (
              <option key={ngState.alias} value={ngState.alias}>
                {ngState.state}
              </option>
            ))}
          </Select>
        </FormControl>

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

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {/* Email */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Email
          </FormLabel>
          <Input fontSize={"sm"} name="email" value={formData.email} />
        </FormControl>

        {/* Whatsapp Number */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Whatsapp number
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="whatsappNumber"
            value={formData.whatsappNumber}
          />
        </FormControl>
      </Grid>
    </form>
  );
}

export default function StudentUpdateScreen({ studentData }) {
  return (
    <StudentPersonalDetailsUpdateForm action="edit" studentData={studentData} />
  );
}
