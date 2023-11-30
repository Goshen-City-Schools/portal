import React from "react";

import {
  Flex,
  FormLabel,
  Input,
  Button,
  FormControl,
  Select,
  Grid,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";
import UpdateAvatarButton from "../Buttons/UpdateAvatarButton";
import Avatar from "../Avatar.component";
import { useState } from "react";
import { useModal } from "../../app/contexts/ModalContext";
import ngStates from "../../data/nigeria_states.json";

export default function StaffForm({ action, staffData, schoolData }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState();
  const [formData, setFormData] = useState({
    firstName: staffData?.firstName || "",
    lastName: staffData?.lastName || "",
    avatarImageURL: staffData?.avatarImageURL || "",
    email: staffData?.phoneNumber || "",
    phoneNumber: staffData?.phoneNumber || "",
    whatsappNumber: staffData?.whatsappNumber || "",
    primaryRole: staffData?.primaryRole || "",
    dateOfBirth: staffData?.dateOfBirth || "",
    gender: staffData?.gender || "",
    stateOfOrigin: staffData?.stateOfOrigin || "",
    contactAddress: staffData?.contactAddress || "",
    LGA: staffData?.LGA || "",
  });
  const { openPortal } = useModal();

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "roles") {
      // Get the selected roles as an array
      const selectedRoles = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, roles: selectedRoles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.phoneNumber ||
      !formData.whatsappNumber ||
      !formData.primaryRole ||
      !formData.gender
    ) {
      toast({
        status: "error",
        position: "top-right",
        title: "All Staff details is required!",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    const staffData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      accountType: "staff",
      phoneNumber: formData.phoneNumber,
      whatsappNumber: formData.whatsappNumber,
      email: formData.email,
      primaryRole: formData.primaryRole,
    };

    // Simulating Backend Actions
    if (allowedUserRoles(user, ["IT Personnel"])) {
      try {
        // Make an API request to register the staff
        const response = await axios.post(
          "/api/v1/auth/register",
          JSON.stringify(staffData),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response);

        // Check the response status and handle accordingly
        if (response.status === 201) {
          setLoading(false);
          toast({
            status: "success",
            position: "top-right",
            title: "Account Successfully Created!",
            duration: 2000,
          });

          setTimeout(() => {
            openPortal(
              <AccountCreatedScreen
                type={"staff"}
                data={response.data.user}
                email={staffData.email}
              />
            );

            setFormData({
              firstName: "",
              lastName: "",
              primaryRole: "",
              dateOfBirth: "",
              gender: "",
              email: "",
              phoneNumber: "",
              whatsappNumber: "",
            });
          }, 3000);

          // Additional actions after successful registration
        } else {
          setLoading(false);
          toast({
            status: "error",
            position: "top-right",
            title: "Registration failed!",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Registration failed:", error.message);
        setLoading(false);
        toast({
          status: "error",
          position: "top-right",
          title: "Registration failed!",
          duration: 2000,
        });
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
      firstName: "",
      lastName: "",
      primaryRole: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      phoneNumber: "",
      whatsappNumber: "",
    });
  }

  const LGAs =
    ngStates.find((ngState) => ngState.alias === formData.stateOfOrigin)
      ?.lgas || [];

  return (
    <form
      className="rounded-lg px-8 bg-white text-sm py-6 flex-col flex gap-x-6 gap-y-8"
      onSubmit={handleFormSubmit}
    >
      {action === "edit" && (
        <Grid gap={2} placeItems={"center"}>
          <Avatar
            width={108}
            height={108}
            imageUrl={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : formData.avatarImageURL
                ? formData.avatarImageURL
                : "/avatar.png"
            }
          />

          <UpdateAvatarButton
            selectedFile={selectedFile}
            theUser={staffData}
            setSelectedFile={setSelectedFile}
          />
        </Grid>
      )}

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
            onChange={handleChange}
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
            onChange={handleChange}
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

      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        {/* Staff Role */}
        <FormControl id="date">
          <FormLabel fontWeight={"bold"} fontSize={"sm"}>
            Staff Primary Role
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
      </Flex>

      <FormControl>
        <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
          Contact Address
        </FormLabel>
        <Textarea
          resize={"none"}
          height={16}
          name="contactAddress"
          placeholder="Place of Residence"
          value={formData.contactAddress}
        />
      </FormControl>

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
        size={"sm"}
        isLoading={loading}
      >
        Create Staff Account
      </Button>
    </form>
  );
}
