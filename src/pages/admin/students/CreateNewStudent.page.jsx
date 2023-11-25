import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import ReactPortal from "../../../widgets/ReactPortal";
import { useModal } from "../../../app/contexts/ModalContext";
import { useEffect } from "react";
import AccountCreatedScreen from "../../../screens/AccountCreatedScreen";
import allowedUserRoles from "../../../helpers/allowedUserRoles";
import { registerStudent } from "../../../api/student.api";
import { useUser } from "../../../app/contexts/UserContext";
import StudentForm from "../../../components/forms/StudentForm";
import { useClasses } from "../../../hooks/SchoolClasses";

export default function CreateNewStudent() {
  const { openPortal } = useModal();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [availableSubclasses, setAvailableSubclasses] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);

  const { schoolClasses } = useClasses();

  console.log(schoolClasses);

  const { user } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    class: "",
    subclass: "",
    dateOfBirth: "",
    gender: "",
    studentType: "",
    guardianTitle: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianPhoneNumber: "",
    guardianWhatsappNumber: "",
    relationshipToGuardian: "",
  });

  // Update available subclasses based on the selected class
  useEffect(() => {
    if (formData.class) {
      const selectedClass = schoolClasses?.find(
        (classData) => classData._id === formData.class
      );
      setAvailableSubclasses(selectedClass ? selectedClass?.subClasses : []);
    } else {
      setAvailableSubclasses([]);
    }
  }, [formData.class]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.class ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.studentType
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

    // Simulating Backend Actions
    if (allowedUserRoles(user, ["IT Personnel"])) {
      try {
        const studentData = {
          accountType: "student",
          firstName: formData.firstName,
          lastName: formData.lastName,
          schoolClass: formData.class,
          subClass: formData.subclass ? formData.subclass : "",
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          studentType: formData.studentType,
          guardianTitle: formData.guardianTitle,
          guardianFirstName: formData.guardianFirstName,
          guardianLastName: formData.guardianLastName,
          guardianEmail: formData.guardianEmail,
          guardianPhoneNumber: formData.guardianPhoneNumber,
          guardianWhatsappNumber: formData.guardianWhatsappNumber,
          guardianRelationshipToStudent: formData.relationshipToGuardian,
        };

        console.log(studentData);

        const result = await registerStudent(studentData);
        console.log("Student registration successful:", result);
        // Handle success, e.g., show a success message to the user

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
              data={result.user}
              email={studentData.guardianEmail}
            />
          );
          // Simulate data from Backend API

          setFormData({
            id: "",
            firstName: "",
            lastName: "",
            class: "",
            subclass: "",
            dateOfBirth: "",
            gender: "",
            studentType: "",
            guardianTitle: "",
            guardianFirstName: "",
            guardianLastName: "",
            guardianEmail: "",
            guardianPhoneNumber: "",
            guardianWhatsappNumber: "",
            relationshipToGuardian: "",
          });
        }, 3000);
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error("Error registering student:", error.message);
      }
    } else {
      // Simulate data from Backend API
      setTimeout(() => {
        setLoading(false);
        toast({
          status: "error",
          position: "top-right",
          title: "no-access!",
          duration: 2000,
        });
      }, 2000);
    }

    // Clears form data
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      class: "",
      subclass: "",
      dateOfBirth: "",
      gender: "",
      studentType: "",
      guardianTitle: "",
      guardianFirstName: "",
      guardianLastName: "",
      guardianEmail: "",
      guardianPhoneNumber: "",
      guardianWhatsappNumber: "",
      relationshipToGuardian: "",
    });
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
        pageTitle={"Student Enroll"}
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

        <StudentForm
          formData={formData}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          loading={loading}
          availableSubclasses={availableSubclasses}
          schoolData={schoolClasses}
          handleNextForm={handleNextForm}
        />
      </Box>
    </PageWrapper>
  );
}
