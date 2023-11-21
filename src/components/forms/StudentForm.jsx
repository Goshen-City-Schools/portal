import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

import { MdArrowForward, MdUpload } from "react-icons/md";

const FirstForm = ({
  activeFormIndex,
  formData,
  handleChange,
  handleNextForm,
  loading,
  availableSubclasses,
  schoolData,
}) => {
  return (
    <Flex direction={"column"} rowGap={6} columnGap={8} pb={6}>
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
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
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
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

      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        {/* Class */}
        <FormControl id="class">
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
            {schoolData?.schoolClasses.map((schoolClass, index) => (
              <option key={index} value={schoolClass.name}>
                {schoolClass.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Subclass */}
        {availableSubclasses.length > 0 && (
          <FormControl id="subclass">
            <FormLabel fontWeight={"bold"} fontSize={"sm"}>
              Subclass
            </FormLabel>
            <Select
              py={1}
              name="subclass"
              fontSize={"sm"}
              onChange={handleChange}
              value={formData.subclass}
            >
              <option value="">-- Select subclass --</option>
              {availableSubclasses?.map((subclass, index) => (
                <option key={index} value={subclass}>
                  {subclass}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </Flex>

      {/* Class */}
      <FormControl id="date">
        <FormLabel fontWeight={"bold"} fontSize={"sm"}>
          Student Type
        </FormLabel>
        <Select
          py={1}
          name="studentType"
          fontSize={"sm"}
          onChange={handleChange}
          value={formData.studentType}
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
        w={"max-content"}
        id="upload"
        rightIcon={<MdArrowForward />}
        mx={"auto"}
        size={"sm"}
        colorScheme="blue"
        type="button"
        onClick={() => handleNextForm(activeFormIndex)}
        isLoading={loading}
      >
        Next
      </Button>
    </Flex>
  );
};

const SecondForm = ({ formData, handleChange, loading }) => {
  return (
    <Flex direction={"column"} rowGap={6} columnGap={8} pb={6}>
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
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
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
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
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
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
        w={"max-content"}
        id="upload"
        leftIcon={<MdUpload />}
        size={"sm"}
        mx={"auto"}
        colorScheme="blue"
        type="submit"
        isLoading={loading}
      >
        Create Student Account
      </Button>
    </Flex>
  );
};

export default function StudentForm({
  activeFormIndex,
  setActiveFormIndex,
  handleChange,
  handleNextForm,
  loading,
  formData,
  availableSubclasses,
  handleFormSubmit,
  schoolData,
}) {
  return (
    <form onSubmit={handleFormSubmit}>
      {activeFormIndex === 1 && (
        <FirstForm
          formData={formData}
          handleChange={handleChange}
          handleNextForm={handleNextForm}
          loading={loading}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
          availableSubclasses={availableSubclasses}
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
  );
}
