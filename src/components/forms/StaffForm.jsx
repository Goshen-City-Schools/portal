import { useState } from "react";
import { Flex, Grid, useToast } from "@chakra-ui/react";
import { useModal } from "../../app/contexts/ModalContext";
import ngStates from "../../data/nigeria_states.json";

import {
  FormInput,
  FormSelect,
  FormTextArea,
  FormcContainer,
  AvatarUpload,
  FormButton,
} from "../shared/";
import { useUser } from "../../app/contexts/UserContext";
import allowedUserRoles from "../../helpers/allowedUserRoles";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AccountCreatedScreen from "../../screens/AccountCreatedScreen";

export default function StaffForm({ action, staffData, staffRoles }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    firstName: staffData?.firstName || "",
    lastName: staffData?.lastName || "",
    avatarImageURL: staffData?.avatarImageURL || "",
    email: staffData?.email || "",
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
    try {
      e.preventDefault();
      setLoading(true);

      // Validate form data
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "stateOfOrigin",
        "LGA",
        "dateOfBirth",
        "phoneNumber",
        "whatsappNumber",
        "primaryRole",
        "gender",
      ];

      if (!requiredFields.every((field) => formData[field])) {
        throw new Error("All staff details are required!");
      }

      const newStaffData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        stateOfOrigin: formData.stateOfOrigin,
        LGA: formData.LGA,
        accountType: "staff",
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber,
        email: formData.email,
        primaryRole: formData.primaryRole,
      };

      // Simulate Backend Actions
      if (allowedUserRoles(user, ["IT Personnel"])) {
        const apiUrl =
          action === "edit"
            ? `/api/v1/staff/${staffData?.portalId}`
            : "/api/v1/auth/register";

        // Make an API request
        const response = await axios({
          method: action === "edit" ? "put" : "post",
          url: apiUrl,
          data: newStaffData,
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 201) {
          setLoading(false);
          toast({
            status: "success",
            position: "top-right",
            title:
              action === "edit"
                ? "Account Successfully Updated!"
                : "Account Successfully Created!",
            duration: 2000,
          });

          if (!action) {
            setTimeout(() => {
              openPortal(
                <AccountCreatedScreen
                  type={"staff"}
                  data={response.data.user}
                  email={staffData.email}
                />
              );
            }, 1000);
          }

          return navigate("/admin/config/staff");
        } else {
          throw new Error("Update/Registration failed!");
        }
      } else {
        // Simulate data from Backend API
        setTimeout(() => {
          setLoading(false);
          toast({
            status: "error",
            position: "top-right",
            title: "No access!",
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
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      toast({
        status: "error",
        position: "top-right",
        title: error.message,
        duration: 2000,
      });
    }
  }

  const LGAs =
    ngStates
      .find((ngState) => ngState.alias === formData.stateOfOrigin)
      ?.lgas.map((lga) => ({ name: lga, value: lga })) || [];

  return (
    <FormcContainer
      handleFormSubmit={handleFormSubmit}
      classesParams={"px-8 py-8"}
      px={4}
    >
      {/* Avatar Upload, Active on Edit Mode */}
      {action === "edit" && (
        <AvatarUpload
          formData={formData}
          imgUrl={"avatarImageURL"}
          thisUser={staffData}
        />
      )}

      {/* First name & Last name */}
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        <FormInput
          name={"firstName"}
          label={"First name"}
          data={formData}
          handleChange={handleChange}
        />

        <FormInput
          name={"lastName"}
          label={"Surname"}
          data={formData}
          handleChange={handleChange}
        />
      </Flex>

      {/* Date of Birth & Gender*/}
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        <FormInput
          name={"dateOfBirth"}
          type="date"
          label={"Date of Birth"}
          data={formData}
          handleChange={handleChange}
        />

        <FormInput
          name={"gender"}
          label={"Gender"}
          data={formData}
          handleChange={handleChange}
        />
      </Flex>

      {/* State of Origin & LGA */}
      <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormSelect
          data={ngStates}
          label={"State of Origin"}
          name={"stateOfOrigin"}
          formData={formData}
          data_item_name={"state"}
          data_item_value={"alias"}
          handleChange={handleChange}
        />

        <FormSelect
          data={LGAs}
          label={"Local Government Area"}
          name={"LGA"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"alias"}
          handleChange={handleChange}
        />
      </Grid>

      {/* Staff Role & Email */}
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        <FormSelect
          data={staffRoles}
          label={"Staff Primary Role"}
          name={"primaryRole"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"_id"}
          handleChange={handleChange}
        />

        <FormInput
          name={"email"}
          label={"Email"}
          data={formData}
          type="email"
          handleChange={handleChange}
        />
      </Flex>

      <FormTextArea
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
        handleChange={handleChange}
      />

      {/* Phone Number & Whatsapp Number */}

      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        <FormInput
          type="tel"
          name={"phoneNumber"}
          label={"Tel. Number"}
          data={formData}
          handleChange={handleChange}
        />

        <FormInput
          type="tel"
          name={"whatsappNumber"}
          label={"Whatsapp Number"}
          data={formData}
          handleChange={handleChange}
        />
      </Flex>

      <FormButton
        loading={loading}
        label={action === "edit" ? "Update Staff" : "Create Staff Account"}
      />
    </FormcContainer>
  );
}
