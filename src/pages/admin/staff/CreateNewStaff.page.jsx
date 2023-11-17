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
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdUpload } from "react-icons/md";
import schoolData from "../../../data/school.data";
import AccountCreatedScreen from "../../../screens/AccountCreatedScreen";
import ReactPortal from "../../../widgets/ReactPortal";
import { useModal } from "../../../app/contexts/ModalContext";
import allowedUserRoles from "../../../helpers/allowedUserRoles";
import { useUser } from "../../../app/contexts/UserContext";
import axios from "../../../api/axios";

export default function CreateNewStaff() {
  const toast = useToast();
  const { openPortal } = useModal();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    primaryRole: "",
    dateOfBirth: "",
    gender: "",
  });

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
      setActiveFormIndex(activeFormIndex - 1);
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

  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={"Create Staff Account"}
        pageCrumb={"Home / Staff / New"}
      />
      <Box w={"full"} mt={8} maxW={"2xl"} shadow={"sm"} mx={"auto"}>
        <form
          className="rounded-lg px-8 bg-white text-sm py-6 flex-col flex gap-x-6 gap-y-8"
          onSubmit={handleFormSubmit}
        >
          <Flex gap={6}>
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
          <Flex gap={6}>
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

          <Flex gap={6}>
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
      </Box>
    </PageWrapper>
  );
}
