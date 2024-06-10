import { useState } from "react";
import { Flex, Grid, useToast, Divider } from "@chakra-ui/react";
import { useModal } from "../../app/contexts/ModalContext";
import ngStates from "../../data/nigeria_states.json";
import roles from "../../constants/roles";

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
import { useStaffRoles } from "../../hooks";

export default function StaffForm({ action, staffData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useUser();
  const { staffRolesData: staffRoles } = useStaffRoles();
  const [formData, setFormData] = useState({
    name: staffData?.name || "",
    username: staffData?.username || "",
    avatarImageURL: staffData?.avatarImageURL || "",
    email_address: staffData?.email_address || "",
    telNumber: staffData?.telNumber || "",
    whatsApp: staffData?.whatsApp || "",
    roles: staffData?.roles?.id || "",
    dateOfBirth: staffData?.birthDay || "",
    gender: staffData?.gender || "",
    stateOfOrigin: staffData?.stateOfOrigin || "",
    contactAddress: staffData?.address || "",
    LGA: staffData?.LGA || "",
  });

  const { openPortal } = useModal();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);

      // Validate form data
      const requiredFields = [
        "name",
        "email_address",
        "stateOfOrigin",
        "LGA",
        "dateOfBirth",
        "telNumber",
        "roles",
        "gender",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      const newStaffData = {
        name: formData.name,
        birthDay: formData.dateOfBirth,
        gender: formData.gender,
        stateOfOrigin: formData.stateOfOrigin,
        LGA: formData.LGA,
        username: formData.username,
        accountType: "staff",
        telNumber: formData.telNumber,
        whatsApp: formData.whatsApp,
        email_address: formData.email_address,
        address: formData.contactAddress,
        roles: formData.roles,
      };

      if (allowedUserRoles(user, [roles.ROLES.IT_PERSONNEL])) {
        // Make an API request
        const apiUrl =
          action === "edit"
            ? `/api/v1/staff/${staffData?.username}`
            : "/api/v1/staff";
        const method = action === "edit" ? "put" : "post";

        // Make an API request
        const response = await axios({
          method,
          url: apiUrl,
          data: newStaffData,
          headers: { "Content-Type": "application/json" },
        });

        if (response.status >= 200 && response.status < 300) {
          setLoading(false);
          const successMessage =
            action === "edit"
              ? "Account successfully updated!"
              : "Account successfully created!";
          toast({
            status: "success",
            position: "top-right",
            title: successMessage,
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
          navigate("/admin/config/staff");
        }
      } else {
        throw new Error(
          "Failed to update/registration. Please try again later."
        );
      }
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

    console.log(formData);
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

      {/* Name */}

      <FormInput
        name={"name"}
        label={"Full Name (Surname first)"}
        data={formData}
        handleChange={handleChange}
      />

      {/* Username and Staff Role */}
      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        <FormInput
          name={"username"}
          label={"Username"}
          data={formData}
          type="username"
          disabled={action}
          handleChange={handleChange}
        />
        <FormSelect
          data={staffRoles}
          label={"Staff Role"}
          name={"roles"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"id"}
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

      {/* Phone Number & Email */}

      <Flex gap={6} direction={{ base: "column", md: "row" }}>
        <FormInput
          type="tel"
          name={"telNumber"}
          label={"Phone Number"}
          data={formData}
          handleChange={handleChange}
        />

        <FormInput
          type="email_address"
          name={"email_address"}
          label={"Email address"}
          data={formData}
          handleChange={handleChange}
        />
      </Flex>

      {/* Contact address */}
      <FormTextArea
        name={"contactAddress"}
        label={"Contact Address"}
        formData={formData}
        handleChange={handleChange}
      />

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

      <Divider />

      <FormButton
        loading={loading}
        label={action === "edit" ? "Update Staff" : "Create Staff Account"}
      />
    </FormcContainer>
  );
}
