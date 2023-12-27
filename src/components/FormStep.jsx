import React, { useState } from "react";
import { Box, Button, Text, Flex, Spacer, VStack } from "@chakra-ui/react";
import {
  StudentGuardianUpdateForm,
  StudentPersonalDetailsUpdateForm,
} from "../screens/StudentUpdateScreen";

const PrevButton = ({ onPrev }) => {
  return (
    <Button
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

const Step2 = ({ onPrev, onFinish, formComponent }) => (
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

const ThreeStepForm = ({ studentData }) => {
  const forms = [
    {
      title: "Personal Information",
      component: (
        <StudentPersonalDetailsUpdateForm
          action={"edit"}
          studentData={studentData}
        />
      ),
      step: 1,
    },
    {
      title: "Guardian Information",
      component: <StudentGuardianUpdateForm guardianData={studentData} />,
      step: 2,
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
          onFinish={handleFinish}
          formComponent={currentForm.component}
        />
      )}
    </VStack>
  );
};

export default ThreeStepForm;
