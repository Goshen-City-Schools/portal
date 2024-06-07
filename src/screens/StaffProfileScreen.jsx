import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  Tag,
  Flex,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { GiCoronation } from "react-icons/gi";
import Avatar from "../components/Avatar.component";
import IconComponent from "../components/Icon.component";
import {
  MdAdd,
  MdCalendarMonth,
  MdClass,
  MdEdit,
  MdOutlineDeleteOutline,
  MdOutlineMailOutline,
  MdPersonOutline,
  MdPhone,
  MdWhatsapp,
} from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";

import { useModal } from "../app/contexts/ModalContext";
import Checklist from "../components/CheckList";
import subjectsData from "../data/subjects.data";
import dayjs from "dayjs";
import allowedUserRoles from "../helpers/allowedUserRoles";
import { useUser } from "../app/contexts/UserContext";
import UpdateAvatarButton from "../components/Buttons/UpdateAvatarButton";
import InfoBox from "../components/shared/InfoBox.component";
import { useNavigate } from "react-router-dom";
import { useClasses, useStaffRoles, useStaffs } from "../hooks";
import { deleteStaff } from "../api/staff.api";
import axios from "../api/axios";

export default function StaffProfileScreen({
  staff,
  existingStaffData,
  staffId,
}) {
  const { openPortal, closePortal } = useModal();
  const { schoolClasses } = useClasses();
  const { staffRolesData: staffRoles } = useStaffRoles();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { staffsData, setStaffsData } = useStaffs();

  const {
    name,
    gender,
    dateOfBirth,
    email,
    telNumber,
    roles,
    subjects,
    whatsApp,
    classes,
    username,
  } = staff;
  const { user } = useUser();

  const [selectedClasses, setSelectedClasses] = useState(staff?.classes || []);
  const [selectedRoles, setSelectedRoles] = useState(staff?.roles || []);
  const [selectedSubjects, setSelectedSubjects] = useState(
    staff?.subjects || []
  );

  console.log(existingStaffData, staff);

  const handleDeleteAction = async (staffId) => {
    if (user.portalId === staffId) {
      // Prevent staff from deleting themselves
      return toast({
        title: "You cannot delete yourself.",
        status: "warning",
      });
    } else if (
      window.confirm(`Are you sure to delete the staff with ID ${staffId}?`)
    ) {
      try {
        // Use the deleteStaff function to delete the staff member
        const deletedStaff = await deleteStaff(staffId);

        // Check if the delete operation was successful
        if (deletedStaff) {
          // Filter the staff member with the specified staffId and update the state
          const newStaffData = staffsData.filter(
            (staff) => staff?.portalId !== staffId
          );
          setStaffsData(newStaffData);
          navigate("/admin/staff");

          // Show a toast notification
          toast({
            title: `Deleted staff with ID ${staffId}`,
            duration: 2000,
            status: "warning",
          });
        } else {
          // Show an error toast if the delete operation was not successful
          toast({
            title: `Failed to delete staff with ID ${staffId}`,
            status: "error",
          });
        }
      } catch (error) {
        // Handle any error that occurred during the deleteStaff function
        console.error("Error deleting staff:", error.message);
        toast({
          title: "An error occurred while deleting the staff.",
          status: "error",
        });
      }
    }
  };

  function handleAssignClick(cmd) {
    if (cmd === "classes") {
      openPortal(
        <Checklist
          items={schoolClasses}
          selectedItems={selectedClasses}
          handleAssignItems={handleAssignClasses}
          title="Assign Classes to Teacher"
          colorScheme="purple"
          buttonText="Assign New Classes"
        />
      );
    }
    if (cmd === "roles") {
      openPortal(
        <Checklist
          items={staffRoles}
          selectedItems={selectedRoles}
          handleAssignItems={handleAssignRoles}
          title="Assign Roles to Teacher"
          buttonText="Assign Roles"
          colorScheme="facebook"
        />
      );
    }
    if (cmd === "subjects") {
      openPortal(
        <Box w={"full"} maxW={"3xl"}>
          <Checklist
            colorScheme="red"
            items={subjectsData}
            selectedItems={selectedSubjects}
            handleAssignItems={handleAssignSubjects}
            title="Assign Subjects to Teacher"
            buttonText="Assign Subjects"
          />
        </Box>
      );
    }
  }

  function handleAssignClasses(selectedClasses) {
    // Make changes to selected classes if needed

    setSelectedClasses(selectedClasses);
    staff.classes = selectedClasses;

    const updatedStaffData = existingStaffData.map((staff) => {
      if (staff.portalId === staffId) {
        // Update the classes for the specified staff member
        staff.classes = selectedClasses;
      }
      return staff;
    });

    // Update local storage with the updated staff data
    localStorage.setItem("staffData", JSON.stringify(updatedStaffData));

    closePortal();
  }

  function handleAssignRoles() {
    // Make changes to selected roles if needed
    setSelectedRoles(selectedRoles);

    const updateData = {
      ...staff,
      roles: selectedRoles,
    };
    // Make a PUT request to update staff data
    axios
      .put(`/api/v1/staff/${staffId}`, updateData)
      .then((response) => {
        // Handle successful response
        console.log("Staff data updated successfully:", response.data);
        closePortal();
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating staff data:", error);
        // You might want to show an error message to the user
      });
    // Logic to update staff data

    closePortal();
  }

  function handleAssignSubjects(selectedSubjects) {
    // Make changes to selected roles if needed
    setSelectedSubjects(selectedSubjects);
    staff.subjects = selectedSubjects;

    const updatedStaffData = existingStaffData.map((staff) => {
      if (staff.id === staffId) {
        // Update the subjects for the specified staff member
        staff.subjects = selectedSubjects;
      }
      return staff;
    });

    // Update local storage with the updated staff data
    localStorage.setItem("staffData", JSON.stringify(updatedStaffData));

    closePortal();
  }

  return (
    <Grid>
      <Box bg={"white"} py={4} mt={8} rounded={"xl"}>
        <Flex gap={4}>
          {/* Avatar Management */}
          <Grid
            gap={4}
            px={6}
            py={4}
            w={"full"}
            rounded={"lg"}
            alignContent={"center"}
            justifyContent={"center"}
            pb={4}
            position={"relative"}
            minW={"200px"}
            maxW={{ base: "none", md: "240px" }}
          >
            <Avatar
              width={{ base: 120, md: 128 }}
              height={{ base: 120, md: 128 }}
              imageUrl={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : staff.avatarImageURL
                  ? staff.avatarImageURL
                  : "/avatar.png"
              }
            />

            <Flex
              justifyContent={"center"}
              w={"full"}
              pt={2}
              position={{ "base": "relative" }}
              bottom={{ "base": "0", "md": 4 }}
            >
              <UpdateAvatarButton
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                theUser={staff}
              />
            </Flex>
          </Grid>

          <Flex justifyContent={"space-between"} w={"full"} gap={4}>
            <Grid w={"full"}>
              <Text
                as={"h3"}
                textTransform={"capitalize"}
                fontSize={"lg"}
                fontWeight={600}
                mt={2}
                mb={4}
              >
                Class Teacher
              </Text>
            </Grid>

            <Grid w={"full"}>
              <Text
                as={"h3"}
                textTransform={"capitalize"}
                fontSize={"lg"}
                fontWeight={600}
                mt={2}
                mb={4}
              >
                Subject Teacher
              </Text>
            </Grid>

            <Grid w={"full"}>
              <Text
                as={"h3"}
                textTransform={"capitalize"}
                fontSize={"lg"}
                fontWeight={600}
                mt={2}
                mb={4}
              >
                Classes
              </Text>
            </Grid>
          </Flex>
        </Flex>
      </Box>

      <Flex
        w={"full"}
        gap={4}
        py={4}
        direction={{ "base": "column", "md": "row" }}
        rounded={"lg"}
      >
        <Box
          p={4}
          pb={8}
          alignItems={"start"}
          w={"full"}
          rounded={"lg"}
          bg={"white"}
          position={"relative"}
          minW={"200px"}
          height={"max-content"}
          maxW={{ base: "none", md: "260px" }}
        >
          <Text
            as={"h3"}
            textTransform={"capitalize"}
            fontWeight={"bold"}
            fontSize={"xl"}
            mb={4}
          >
            Personal Details
          </Text>

          <Grid gap={4} color={"neutral.700"}>
            <InfoBox icon={<MdPersonOutline size={20} />} label={"Full Name"}>
              {name}
            </InfoBox>

            <InfoBox icon={<MdPersonOutline size={20} />} label={"Gender"}>
              {gender}
            </InfoBox>

            <InfoBox
              icon={<MdCalendarMonth size={20} />}
              label={"Email address"}
            >
              <Text as={"p"} textTransform={""} fontFamily={"monospace"}>
                {dayjs(dateOfBirth).format("dddd, MMM D")}
              </Text>
            </InfoBox>

            <InfoBox
              icon={<MdPersonOutline size={20} />}
              label={"Phone Number"}
            >
              {gender}
            </InfoBox>
          </Grid>
        </Box>

        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          w={"full"}
          pl={4}
          gap={4}
          pr={6}
        >
          <Grid
            bg={"white"}
            rounded={"lg"}
            gap={4}
            gridTemplateColumns={{ "base": "1fr", "md": "repeat(2, 1fr)" }}
            position={"relative"}
          >
            <GridItem py={4} px={{ base: 4, md: 6 }} rounded={"lg"}>
              <Grid gap={5} color={"neutral.700"}>
                <InfoBox icon={<MdPersonOutline size={20} />} label={"Role"}>
                  {name}
                </InfoBox>

                <InfoBox icon={<MdPersonOutline size={20} />} label={"Gender"}>
                  {gender}
                </InfoBox>
              </Grid>
            </GridItem>

            <GridItem
              bg={"white"}
              py={4}
              px={{ base: 4, md: 6 }}
              rounded={"lg"}
            >
              <Grid gap={5} color={"neutral.700"}>
                <InfoBox
                  icon={<MdOutlineMailOutline size={20} />}
                  label={"Email"}
                >
                  {email}
                </InfoBox>

                <InfoBox icon={<MdPhone size={20} />} label={"Phone Number"}>
                  {telNumber}
                </InfoBox>
              </Grid>
            </GridItem>

            {allowedUserRoles(user, ["IT Personnel"]) && (
              <Button
                onClick={() => handleDeleteAction(staff.portalId)}
                position={"absolute"}
                right={2}
                top={4}
                leftIcon={<MdOutlineDeleteOutline size={18} />}
                colorScheme="red"
                variant={"outline"}
                fontSize={"sm"}
                size={"xs"}
                pr={0}
                py={4}
                w={"max-content"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              />
            )}
          </Grid>

          <Box bg={"white"} rounded={"lg"} py={4} px={{ base: 4, md: 6 }}>
            <Text
              as={"h3"}
              textTransform={"capitalize"}
              fontSize={"xl"}
              fontWeight={600}
              mt={2}
              mb={4}
            >
              Educational Qualiications
            </Text>

            <Grid
              gap={4}
              gridTemplateColumns={{ "base": "1fr", "md": "repeat(2, 1fr)" }}
              position={"relative"}
            >
              <GridItem>
                <Grid gap={5} color={"neutral.700"}>
                  <InfoBox icon={<MdPersonOutline size={20} />} label={"Role"}>
                    {name}
                  </InfoBox>

                  <InfoBox
                    icon={<MdPersonOutline size={20} />}
                    label={"Gender"}
                  >
                    {gender}
                  </InfoBox>

                  <InfoBox
                    icon={<MdCalendarMonth size={20} />}
                    label={"Date of Birth"}
                  >
                    <Text as={"p"} textTransform={""} fontFamily={"monospace"}>
                      {dayjs(dateOfBirth).format("dddd, MMM D")}
                    </Text>
                  </InfoBox>
                </Grid>
              </GridItem>

              <GridItem
                bg={"white"}
                py={4}
                px={{ base: 4, md: 6 }}
                rounded={"lg"}
              >
                <Grid gap={5} color={"neutral.700"}>
                  <InfoBox
                    icon={<MdOutlineMailOutline size={20} />}
                    label={"Email"}
                  >
                    {email}
                  </InfoBox>

                  <InfoBox icon={<MdPhone size={20} />} label={"Phone Number"}>
                    {telNumber}
                  </InfoBox>

                  <InfoBox
                    icon={<MdWhatsapp size={20} />}
                    label={"WhatsApp Number"}
                  >
                    {whatsApp}
                  </InfoBox>
                </Grid>
              </GridItem>

              {allowedUserRoles(user, ["IT Personnel"]) && (
                <Button
                  onClick={() => handleDeleteAction(staff.portalId)}
                  position={"absolute"}
                  right={2}
                  top={4}
                  leftIcon={<MdOutlineDeleteOutline size={18} />}
                  colorScheme="red"
                  variant={"outline"}
                  fontSize={"sm"}
                  size={"xs"}
                  pr={0}
                  py={4}
                  w={"max-content"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                />
              )}
            </Grid>
          </Box>
        </Flex>
      </Flex>
    </Grid>
  );
}
