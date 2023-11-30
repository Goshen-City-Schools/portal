import { useState } from "react";

import {
  FormControl,
  Input,
  FormLabel,
  Grid,
  Textarea,
  Select,
  Text,
} from "@chakra-ui/react";

import ngStates from "../data/nigeria_states.json";
import Avatar from "../components/Avatar.component";
import UpdateAvatarButton from "../components/Buttons/UpdateAvatarButton";
import { useClassDetails, useClasses } from "../hooks";

export function StudentPersonalDetailsUpdateForm({ action, studentData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { schoolClasses } = useClasses();

  const {
    firstName,
    lastName,
    otherName,
    gender,
    dateOfBirth,
    stateOfOrigin,
    LGA,
    avatarImageURL,
    studentType,
    schoolClass,
    subClass,
    bloodGroup,
    genoType,
    contactAddress,
  } = studentData;

  const { classDetails } = useClassDetails(schoolClass);

  console.log(studentData, schoolClasses, classDetails);

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
      <Grid gap={2} placeItems={"center"}>
        <Avatar
          width={108}
          height={108}
          imageUrl={
            selectedFile
              ? URL.createObjectURL(selectedFile)
              : avatarImageURL
              ? avatarImageURL
              : "/avatar.png"
          }
        />

        <UpdateAvatarButton
          selectedFile={selectedFile}
          theUser={studentData}
          setSelectedFile={setSelectedFile}
        />
      </Grid>

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {/* First name */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            First name
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Surname */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Surname
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FormControl>
      </Grid>

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        {/* Middle name */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Middle name
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="otherName"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Gender */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Gender
          </FormLabel>

          <Select
            size={"sm"}
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male </option>
            <option value="female">Female </option>
          </Select>
        </FormControl>

        {/* Date of Birth */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Date of Birth
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </FormControl>
      </Grid>

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {/* Blood Group*/}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Blood Group
          </FormLabel>
          <Select
            fontSize={"sm"}
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
          >
            <option value="">A+</option>
            <option value="">A-</option>
            <option value="">O+</option>
          </Select>
        </FormControl>

        {/* Genotype */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Genotype
          </FormLabel>
          <Select name="genoType" value={formData.genoType}>
            <option value="">AA</option>
            <option value="">AS</option>
            <option value="">SS</option>
          </Select>
        </FormControl>
      </Grid>

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        {/* Middle name */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Student Type
          </FormLabel>
          <Select
            disabled={action === "edit"}
            size={"sm"}
            name="studentType"
            value={formData.studentType}
            onChange={handleInputChange}
          >
            <option value="">-- Select Student Type --</option>
            <option value="new">New </option>
            <option value="existing">Existing </option>
          </Select>
        </FormControl>

        {/* Gender */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Class
          </FormLabel>

          <Select
            fontSize={"sm"}
            name="schoolClass"
            disabled={action === "edit"}
            size={"sm"}
            value={formData.schoolClass}
            onChange={handleInputChange}
          >
            <option value="">-- Select Class --</option>
            {schoolClasses.map((SchoolClass) => (
              <option key={SchoolClass?._id} value={SchoolClass?._id}>
                {SchoolClass?.name}{" "}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Date of Birth */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Sub Class
          </FormLabel>
          <Select
            fontSize={"sm"}
            name="subClass"
            disabled={action === "edit"}
            size={"sm"}
            value={formData.subClass}
            onChange={handleInputChange}
          >
            <option value="">-- Select Sub Class --</option>
            {classDetails?.subClasses?.map((subClass) => (
              <option key={subClass?._id} value={subClass?._id}>
                {subClass?.name}{" "}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
          Contact Address
        </FormLabel>
        <Textarea name="contactAddress" height={30} />
      </FormControl>

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {/* State of Origin */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            State of Origin
          </FormLabel>
          <Select
            fontSize={"sm"}
            name="stateOfOrigin"
            value={formData.stateOfOrigin}
            onChange={handleInputChange}
          >
            <option value="">-- Select State of Origin --</option>

            {ngStates.map((ngState) => (
              <option key={ngState.alias} value={ngState.alias}>
                {ngState.state}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Local Government Area */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Local Government Area
          </FormLabel>
          <Select
            fontSize={"sm"}
            name="LGA"
            value={formData.LGA}
            onChange={handleInputChange}
          >
            <option value="">-- Local Government Area --</option>

            {LGAs.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </Select>
        </FormControl>
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
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        {/* Title */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Title
          </FormLabel>

          <Select name="firstname" fontSize={"sm"}>
            <option value="mr">Mr.</option>
            <option value="mrs">Mrs.</option>
            <option value="Miss">Miss</option>
            <option value="dr">Dr.</option>
            <option value="engr">Engr.</option>
            <option value="prof">Prof.</option>
          </Select>
        </FormControl>

        {/* Firstname */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            First name
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* lastname */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Surname
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FormControl>
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

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {/* State of Residence */}
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

        {/* Phone Number */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Phone number
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="phoneNumber"
            value={formData.phoneNumber}
          />
        </FormControl>
      </Grid>

      {/* State of Residence */}
      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
          Contact Address
        </FormLabel>
        <Textarea name="contactAddress" value={formData.contactAddress} />
      </FormControl>

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
