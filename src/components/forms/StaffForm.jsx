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

export default function StaffForm({ action, staffData, schoolData }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useUser();
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
    <FormcContainer handleFormSubmit={handleFormSubmit}>
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
          data={schoolData.staffRoles}
          label={"Staff Primary Role"}
          name={"primaryRole"}
          formData={formData}
          data_item_name={"name"}
          data_item_value={"name"}
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

      <FormButton loading={loading} label={"Create Staff Account"} />
    </FormcContainer>
  );
}
