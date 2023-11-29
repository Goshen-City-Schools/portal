import { useState } from "react";

import {
  FormControl,
  Input,
  FormLabel,
  Grid,
  Textarea,
  Select,
  Text,
  // Avatar,
} from "@chakra-ui/react";

import ngStates from "../data/nigeria_states.json";
import Avatar from "../components/Avatar.component";
import UpdateAvatarButton from "../components/Buttons/UpdateAvatarButton";
import { useClassDetails, useClasses } from "../hooks";
import { SchoolClass } from "../components/tables/shared";

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
    portalId,
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

      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        {/* Middle name */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Student Type
          </FormLabel>
          <Select
            disabled
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
            name="schoolClass"
            disabled
            size={"sm"}
            value={formData.schoolClass}
            onChange={handleInputChange}
          >
            <option value="">-- Select Class --</option>
            {schoolClasses.map((SchoolClass) => (
              <option value={SchoolClass?._id}>{SchoolClass?.name} </option>
            ))}
          </Select>
        </FormControl>

        {/* Date of Birth */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Sub Class
          </FormLabel>
          <Select
            name="subClass"
            disabled
            size={"sm"}
            value={formData.subClass}
            onChange={handleInputChange}
          >
            <option value="">-- Select Sub Class --</option>
            {classDetails?.subClasses?.map((subClass) => (
              <option value={subClass?._id}>{subClass?.name} </option>
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

function StudentGuardianUpdateForm({ action, studentData }) {
  const {
    guardianTitle,
    guardianFirstName,
    guardianLastName,
    guardianRelationshipToStudent,
    guardianAddress,
    guardianEmail,
    guardianPhoneNumber,
    guardianWhatsApp,
    LGA,
  } = studentData;

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    otherName: otherName || "",
    gender: gender || "",
    dateOfBirth: dateOfBirth || "",
    stateOfOrigin: stateOfOrigin || "",
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
    <form>
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
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

        {/* Middle name */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Middle name
          </FormLabel>
          <Input
            fontSize={"sm"}
            name="middleName"
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
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* State of Origin */}
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            State of Origin
          </FormLabel>
          <Select value={formData.stateOfOrigin} onChange={handleInputChange}>
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
          <Select value={formData.LGA} onChange={handleInputChange}>
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

export default function StudentUpdateScreen({ studentData }) {
  return <StudentPersonalDetailsUpdateForm studentData={studentData} />;
}
