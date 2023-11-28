import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box, useToast } from "@chakra-ui/react";
import { useState } from "react";
import schoolData from "../../../data/school.data";
import AccountCreatedScreen from "../../../screens/AccountCreatedScreen";
import ReactPortal from "../../../widgets/React_portal";
import { useModal } from "../../../app/contexts/ModalContext";
import allowedUserRoles from "../../../helpers/allowedUserRoles";
import { useUser } from "../../../app/contexts/UserContext";
import axios from "../../../api/axios";

import StaffForm from "../../../components/forms/StaffForm";

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
        <StaffForm
          formData={formData}
          handleFormSubmit={handleFormSubmit}
          handleChange={handleChange}
          loading={loading}
          schoolData={schoolData}
        />
      </Box>
    </PageWrapper>
  );
}
