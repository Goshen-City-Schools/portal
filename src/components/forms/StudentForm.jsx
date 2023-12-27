import React, { useState } from "react";

import { VStack, Flex, Box, Text, Button, Spacer } from "@chakra-ui/react";

import { GuardianFormControlller } from "./GuardianForm";
import StudentDetailsForm from "./StudentDetailsForm";
import StudentSubjectsTableForm from "./StudentSubjectsTableForm";
import { useSubjects } from "../../hooks/Subjects";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { handleInputChange } from "../../helpers/handleInputChange";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PrevButton = ({ onPrev }) => {
  return (
    <Button
      leftIcon={<MdChevronLeft />}
      size={"sm"}
      variant={"outline"}
      colorScheme="facebook"
      onClick={onPrev}
    >
      Previous
    </Button>
  );
};

const Step1 = ({ onNext, formComponent }) => (
  <VStack align="start" spacing={4}>
    {formComponent}
    <Button
      rightIcon={<MdChevronRight />}
      mt={4}
      mx={"auto"}
      size={"sm"}
      colorScheme="facebook"
      onClick={onNext}
    >
      Next
    </Button>
  </VStack>
);

const Step2 = ({ onPrev, onNext, formComponent }) => (
  <VStack align="start" spacing={4}>
    {formComponent}
    <Flex
      gap={4}
      mt={4}
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
    >
      <PrevButton onPrev={onPrev} />

      <Spacer />
      <Button
        rightIcon={<MdChevronRight />}
        size={"sm"}
        colorScheme="facebook"
        onClick={onNext}
      >
        Next
      </Button>
    </Flex>
  </VStack>
);

const Step3 = ({ onPrev, onFinish, formComponent }) => (
  <VStack align="start" spacing={4}>
    {formComponent}
    <Flex
      gap={4}
      mt={4}
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
    >
      <PrevButton onPrev={onPrev} />

      <Spacer />
      <Button size={"sm"} colorScheme="facebook" onClick={onFinish}>
        Finish
      </Button>
    </Flex>
  </VStack>
);

export default function StudentForm({ action, studentData }) {
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
    guardian,
    contactAddress,
    subjects,
  } = studentData || {};
  const navigate = useNavigate();

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
    guaurdianId: guardian?.id || "",
    guardianRelationship: guardian?.relationship || "",
    contactAddress: contactAddress || "",
    LGA: LGA || "",
    subjects: subjects || "",
  });

  const handleChange = useCallback((e) => {
    handleInputChange(e, setFormData);
  }, []);

  const { subjectsData } = useSubjects();

  const forms = [
    {
      title: "Student Details",
      component: (
        <StudentDetailsForm
          action={action}
          handleInputChange={handleChange}
          formData={formData}
          studentData={studentData}
        />
      ),
      step: 1,
    },
    {
      title: "Guardian Information",
      component: (
        <GuardianFormControlller
          handleInputChange={handleChange}
          formData={formData}
        />
      ),
      step: 2,
    },
    {
      title: "Class Subjects",
      component: (
        <StudentSubjectsTableForm
          subjectsData={subjectsData}
          setFormData={setFormData}
          studentData={studentData}
          formData={formData}
          handleUserInputChange={handleChange}
        />
      ),
      step: 3,
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    alert("Form submitted successfully!");

    navigate("/admin/students");
    // Add logic to handle form submission or navigation after the final step
  };

  const currentForm = forms.find((form) => form.step === currentStep);

  return (
    <VStack spacing={4} align="stretch">
      {/* Circular progress indicators with connecting lines */}
      <Flex align="center" mb={4}>
        {forms.map(({ step, title }) => (
          <React.Fragment key={step}>
            {step !== 1 && <Box flex="1" h="2px" bgColor="gray.200" />}
            <VStack align="center">
              <Box
                w="30px"
                h="30px"
                borderRadius="50%"
                bgColor={currentStep === step ? "blue.500" : "gray.200"}
                color={currentStep === step ? "white" : "black"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                zIndex={1}
              >
                {step}
              </Box>
              <Text
                fontSize="xs"
                whiteSpace={"pre-wrap"}
                wordBreak={"break-all"}
              >
                {currentStep === step ? <strong>{title}</strong> : title}
              </Text>
            </VStack>
          </React.Fragment>
        ))}
      </Flex>

      {/* Render the current step */}
      {currentStep === 1 && (
        <Step1 onNext={handleNext} formComponent={currentForm.component} />
      )}
      {currentStep === 2 && (
        <Step2
          onPrev={handlePrev}
          onNext={handleNext}
          formComponent={currentForm.component}
        />
      )}
      {currentStep === 3 && (
        <Step3
          onPrev={handlePrev}
          onFinish={handleFinish}
          formComponent={currentForm.component}
        />
      )}
    </VStack>
  );
}
