import React from "react";

import {
  Flex,
  FormLabel,
  Input,
  Button,
  FormControl,
  Select,
} from "@chakra-ui/react";

export default function StaffForm({
  handleChange,
  handleFormSubmit,
  formData,
  schoolData,
  loading,
}) {
  return (
    <form
      className="rounded-lg px-8 bg-white text-sm py-6 flex-col flex gap-x-6 gap-y-8"
      onSubmit={handleFormSubmit}
    >
      {/* <Flex
      placeItems={"center"}
      w={"full"}
      justifyContent={"space-between"}
      position={"relative"}
    >
      <Avatar
        height={72}
        width={72}
        className={
          "hover:mix-blend-multiply hover:bg-opacity-70 cursor-pointer"
        }
        imageUrl={"/Illustration.png"}
      />

      <Box position={"absolute"} left={"40%"} translateX={"-50%"}>
        <Logo />
      </Box>

      <Box
        height={24}
        w={48}
        bgColor={"gray.400"}
        px={6}
        shadow={"sm"}
        rounded={"lg"}
        display={"grid"}
        placeItems={"center"}
        bgImage={"/public/school-books.jpeg"}
        bgBlendMode={"overlay"}
        bgSize={"cover"}
      >
        <Text
          as={"small"}
          letterSpacing={".5"}
          fontWeight={"semibold"}
          color={"neutral.700"}
        >
          Upload Means of ID
        </Text>
      </Box>
    </Flex> */}
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        <FormControl id="firstName">
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
        <FormControl id="lastName">
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
            name="gender"
            fontSize={"sm"}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">-- Select Staff Gender --</option>
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
        {/* Email */}
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Email
          </FormLabel>
          <Input
            type="email"
            name="email"
            fontSize={"sm"}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        {/* Staff Role */}
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Primary Role
          </FormLabel>
          <Select
            name="primaryRole"
            fontSize={"sm"}
            value={formData.primaryRole}
            onChange={handleChange}
          >
            <option value="">-- Select a Role --</option>
            {schoolData.staffRoles.map((role, index) => (
              <option key={index} value={role.name}>
                {role.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>

      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        {/* Phone Number */}
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Tel. Number
          </FormLabel>
          <Input
            type="phoneNumber"
            name="phoneNumber"
            placeholder="Tel. Number"
            fontSize={"sm"}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormControl>

        {/* WHatsApp Number */}
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            WhatsApp Number
          </FormLabel>
          <Input
            type="whatsappNumber"
            name="whatsappNumber"
            placeholder="Whatsapp Number"
            fontSize={"sm"}
            value={formData.whatsappNumber}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>

      <Button
        w={"max-content"}
        id="upload"
        leftIcon={<MdUpload />}
        mt={4}
        mx={"auto"}
        colorScheme="blue"
        type="submit"
        isLoading={loading}
      >
        Create Staff Account
      </Button>
    </form>
  );
}
