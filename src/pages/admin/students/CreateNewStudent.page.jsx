import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdArrowForward, MdKeyboard, MdUpload } from "react-icons/md";
import schoolData from "../../../data/school.data";
import ReactPortal from "../../../widgets/ReactPortal";
import { useModal } from "../../../app/contexts/ModalContext";
import CreateStudentPortal from "../../../portals/CreateStudent.portal";
import generateId from "../../../utilities/generateId";
import { useEffect } from "react";
import AccountCreatedScreen from "../../../screens/AccountCreatedScreen";

const FirstForm = ({
  activeFormIndex,
  setActiveFormIndex,
  formData,
  handleChange,
  handleNextForm,
  loading,
}) => {
  return (
    <Flex direction={"column"} rowGap={6} columnGap={8} pb={6}>
      <Flex gap={6}>
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            First name
          </FormLabel>
          <Input
            type="text"
            name="firstName"
            fontSize={"sm"}
            value={formData.firstName}
            placeholder={"First name"}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Surname
          </FormLabel>
          <Input
            type="text"
            name="lastName"
            fontSize={"sm"}
            value={formData.lastName}
            placeholder={"Last name"}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>

      {/* Date of Birth & Gneder*/}
      <Flex gap={6}>
        <FormControl id="time">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Gender
          </FormLabel>
          <Select
            py={1}
            name="gender"
            fontSize={"sm"}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </FormControl>
        <FormControl id="time">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Date of Birth
          </FormLabel>
          <Input
            type="date"
            fontSize={"sm"}
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>

      {/* Class */}
      <FormControl id="date">
        <FormLabel fontWeight={"bold"} fontSize={"sm"}>
          Class
        </FormLabel>
        <Select
          py={1}
          name="class"
          fontSize={"sm"}
          onChange={handleChange}
          value={formData.class}
        >
          <option value="">-- Select class --</option>
          {schoolData.schoolClasses.map((schoolClass, index) => (
            <option key={index} value={schoolClass}>
              {schoolClass}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Class */}
      <FormControl id="date">
        <FormLabel fontWeight={"bold"} fontSize={"sm"}>
          Student Type
        </FormLabel>
        <Select
          py={1}
          name="type"
          fontSize={"sm"}
          onChange={handleChange}
          value={formData.type}
        >
          <option value="">-- Select Student Type --</option>
          <option value="new">New Student</option>
          <option value="returning">Returning Student</option>
        </Select>
      </FormControl>

      <Text
        as="small"
        textAlign={"center"}
        letterSpacing={0.5}
        color={"warning.900"}
        fontWeight={"bold"}
      >
        Student ID is generated on successful account creation.
      </Text>

      <Button
        w={"full"}
        id="upload"
        rightIcon={<MdArrowForward />}
        colorScheme="teal"
        type="button"
        onClick={() => handleNextForm(activeFormIndex)}
        isLoading={loading}
        //   onClick={handleUploadQuestions}
      >
        Next
      </Button>
    </Flex>
  );
};

const SecondForm = ({ formData, handleChange, loading }) => {
  return (
    <Flex direction={"column"} rowGap={6} columnGap={8} pb={6}>
      <Flex gap={6}>
        <FormControl id="date" w={"220px"}>
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Title
          </FormLabel>
          <Select
            name="guardianTitle"
            fontSize={"sm"}
            onChange={handleChange}
            value={formData.guardianTitle}
          >
            <option value="">-- Select Title --</option>
            <option value="mr">Mr.</option>
            <option value="mr">Mrs.</option>
            <option value="mr">Miss.</option>
            <option value="mr">Dr.</option>
            <option value="mr">Prof.</option>
            <option value="mr">Engr.</option>
          </Select>
        </FormControl>

        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            First name
          </FormLabel>
          <Input
            type="text"
            name="guardianFirstName"
            fontSize={"sm"}
            value={formData.guardianFirstName}
            placeholder={"First name"}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>{" "}
      <Flex gap={6}>
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Surname
          </FormLabel>
          <Input
            type="text"
            name="guardianLastName"
            fontSize={"sm"}
            value={formData.guardianLastName}
            placeholder={"Last name"}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Relationship
          </FormLabel>
          <Select
            name="relationshipToGuardian"
            fontSize={"sm"}
            onChange={handleChange}
            value={formData.relationshipToGuardian}
          >
            <option value="">-- Select Relationship --</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="brother">Brother</option>
            <option value="sister">Sister</option>
            <option value="aunt">Aunt</option>
            <option value="Uncle">Uncle</option>
            <option value="Others">Others</option>
          </Select>
        </FormControl>
      </Flex>
      <Flex gap={6}>
        <FormControl id="date" maxW={"40%"}>
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Whatsapp Number
          </FormLabel>
          <Input
            type="tel"
            name="guardianWhatsappNumber"
            fontSize={"sm"}
            value={formData.guardianWhatsappNumber}
            placeholder={"Whatsapp Number"}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Tel. Number
          </FormLabel>
          <Input
            type="tel"
            name="guardianPhoneNumber"
            fontSize={"sm"}
            value={formData.guardianPhoneNumber}
            placeholder={"Tel. Number"}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>
      <FormControl id="date">
        <FormLabel fontWeight={"bold"} fontSize={"sm"}>
          Email
        </FormLabel>
        <Input
          type="email"
          name="guardianEmail"
          fontSize={"sm"}
          value={formData.guardianEmail}
          placeholder={"Email"}
          onChange={handleChange}
        />
      </FormControl>
      <Text
        as="small"
        textAlign={"center"}
        letterSpacing={0.5}
        color={"warning.900"}
        fontWeight={"bold"}
      >
        An email will be sent with login details, on successful account
        creation.
      </Text>
      <Button
        w={"full"}
        id="upload"
        leftIcon={<MdUpload />}
        colorScheme="teal"
        type="submit"
        isLoading={loading}
        //   onClick={handleUploadQuestions}
      >
        Create Student Account
      </Button>
    </Flex>
  );
};

export default function CreateNewStudent() {
  const { openPortal } = useModal();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    class: "",
    dateOfBirth: "",
    gender: "",
    type: "",
    guardianTitle: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianPhoneNumber: "",
    guardianWhatsappNumber: "",
    relationshipToGuardian: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.class ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.type
    ) {
      toast({
        status: "error",
        position: "top-right",
        title: "All Student's details is required!",
        duration: 3000,
      });
      setLoading(false);
      setActiveFormIndex(activeFormIndex - 1);
      return;
    }

    if (
      !formData.guardianFirstName ||
      !formData.guardianLastName ||
      !formData.guardianTitle ||
      !formData.guardianPhoneNumber ||
      !formData.relationshipToGuardian ||
      !formData.guardianEmail
    ) {
      toast({
        status: "error",
        position: "top-right",
        title: "All Guardian's details is requuied!",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    const studentData = {
      id: generateId(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      class: formData.class,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      guardianTitle: formData.guardianTitle,
      guardianFirstName: formData.guardianFirstName,
      guardianLastName: formData.guardianLastName,
      guardianEmail: formData.guardianEmail,
      guardianPhoneNumber: formData.guardianPhoneNumber,
      guardianWhatsappNumber: formData.guardianWhatsappNumber,
      relationshipToGuardian: formData.relationshipToGuardian,
    };

    // Simulating Backend Actions
    const existingStudentsData =
      JSON.parse(localStorage.getItem("studentsData")) || [];

    const newStudentsData = [...existingStudentsData, studentData];

    localStorage.setItem("studentsData", JSON.stringify(newStudentsData));

    // Simulate data from Backend API
    setTimeout(() => {
      setLoading(false);
      toast({
        status: "success",
        position: "top-right",
        title: "Account Successfully Created!",
        duration: 2000,
      });
    }, 2000);

    setTimeout(() => {
      openPortal(
        <AccountCreatedScreen
          type={"student"}
          data={studentData}
          email={studentData.guardianEmail}
        />
      );

      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        class: "",
        dateOfBirth: "",
        gender: "",
        type: "",
        guardianTitle: "",
        guardianFirstName: "",
        guardianLastName: "",
        guardianEmail: "",
        guardianPhoneNumber: "",
        guardianWhatsappNumber: "",
        relationshipToGuardian: "",
      });
    }, 3000);

    // Clears form data
  }

  function handleSetFormIndex(formTab) {
    return setActiveFormIndex(formTab);
  }

  function handleNextForm(formTab) {
    setLoading(true);
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.class ||
      !formData.dateOfBirth ||
      !formData.gender
    ) {
      toast({
        status: "error",
        position: "top-right",
        title: "All Student's details is required!",
        duration: 3000,
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setActiveFormIndex(formTab + 1);
    return;
  }

  const formTabs = [
    {
      id: 1,
      name: "Student's Details",
    },
    {
      id: 2,
      name: "Guardian's Details",
    },
  ];

  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader
        pageTitle={"Create Student Account"}
        pageCrumb={"Home / Students / New"}
      />

      <Box
        w={"full"}
        mt={8}
        maxW={"2xl"}
        shadow={"sm"}
        mx={"auto"}
        px={8}
        bg={"white"}
        rounded={"lg"}
        fontSize={"sm"}
      >
        <Flex id="formTabIndex" mb={8} pt={2}>
          {formTabs.map((formTab) => (
            <Box
              key={formTab.id}
              p={2}
              py={4}
              px={4}
              fontSize={"sm"}
              fontWeight={"bold"}
              borderBottom={"3px solid transparent"}
              borderColor={
                formTab.id === activeFormIndex ? "brand.900" : "gray.200"
              }
              color={formTab.id === activeFormIndex ? "brand.900" : "gray.600"}
              cursor="pointer"
              onClick={() => handleSetFormIndex(formTab.id)}
            >
              {formTab.name}
            </Box>
          ))}
        </Flex>

        <form onSubmit={handleFormSubmit}>
          {activeFormIndex === 1 && (
            <FirstForm
              formData={formData}
              handleChange={handleChange}
              handleNextForm={handleNextForm}
              loading={loading}
              activeFormIndex={activeFormIndex}
              setActiveFormIndex={setActiveFormIndex}
            />
          )}

          {activeFormIndex === 2 && (
            <SecondForm
              formData={formData}
              handleChange={handleChange}
              handleFormSubmit={handleFormSubmit}
              loading={loading}
              activeFormIndex={activeFormIndex}
              setActiveFormIndex={setActiveFormIndex}
            />
          )}
        </form>
      </Box>
    </PageWrapper>
  );
}
