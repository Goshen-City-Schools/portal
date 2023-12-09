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
    firstName,
    lastName,
    gender,
    dateOfBirth,
    email,
    phoneNumber,
    roles,
    subjects,
    whatsappNumber,
    classes,
    portalId,
  } = staff;
  const { user } = useUser();
  const fullname = `${firstName} ${lastName}`;
  const [selectedClasses, setSelectedClasses] = useState(staff?.classes || []);
  const [selectedRoles, setSelectedRoles] = useState(staff?.roles || []);
  const [selectedSubjects, setSelectedSubjects] = useState(
    staff?.subjects || []
  );

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
          colorScheme="blue"
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
    <Grid gap={2}>
      <Flex
        gap={4}
        py={4}
        direction={{ "base": "column", "md": "row" }}
        rounded={"lg"}
      >
        <Grid
          gap={4}
          px={6}
          w={"full"}
          rounded={"lg"}
          alignContent={"center"}
          justifyContent={"center"}
          bg={"white"}
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
            pt={10}
            position={{ "base": "relative", "md": "absolute" }}
            bottom={{ "base": "0", "md": 4 }}
          >
            <UpdateAvatarButton
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              theUser={staff}
            />
          </Flex>
        </Grid>

        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          bg={"white"}
          rounded={"lg"}
          w={"full"}
          pl={4}
          pr={6}
        >
          <Grid
            gap={4}
            gridTemplateColumns={{ "base": "1fr", "md": "repeat(2, 1fr)" }}
            position={"relative"}
          >
            <GridItem
              bg={"white"}
              py={4}
              px={{ base: 4, md: 6 }}
              rounded={"lg"}
            >
              <Text
                as={"h3"}
                letterSpacing={1}
                color={"brand.700"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                mt={2}
                mb={4}
              >
                Personal Details
              </Text>
              <Grid gap={5} color={"neutral.700"}>
                <InfoBox
                  icon={<MdPersonOutline size={20} />}
                  label={"Full name"}
                >
                  {fullname}
                </InfoBox>

                <InfoBox icon={<MdPersonOutline size={20} />} label={"Gender"}>
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
              <Text
                as={"h3"}
                letterSpacing={1}
                color={"brand.700"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                mt={2}
                mb={4}
              >
                Contact Details
              </Text>

              <Grid gap={5} color={"neutral.700"}>
                <InfoBox
                  icon={<MdOutlineMailOutline size={20} />}
                  label={"Email"}
                >
                  {email}
                </InfoBox>

                <InfoBox icon={<MdPhone size={20} />} label={"Phone Number"}>
                  {phoneNumber}
                </InfoBox>

                <InfoBox
                  icon={<MdWhatsapp size={20} />}
                  label={"WhatsApp Number"}
                >
                  {whatsappNumber}
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

          <ButtonGroup
            display={"flex"}
            w={"full"}
            mt={4}
            mb={4}
            gap={3}
            justifyContent={"flex-end"}
          >
            <Button
              fontSize={"sm"}
              leftIcon={<FaRegIdCard />}
              size={"sm"}
              colorScheme="purple"
              variant={"outline"}
              onClick={() => openPortal()}
            >
              Staff ID Card
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>

      <Grid
        gap={4}
        bg={"white"}
        gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        px={6}
        py={4}
        w={"full"}
        rounded={"lg"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <GridItem display={"grid"} gap={4}>
          <InfoBox label={"Nationality"} icon={<GiCoronation />}>
            <Text
              as="p"
              fontSize={"sm"}
              letterSpacing={0.8}
              textTransform={"uppercase"}
            >
              Nigerian
            </Text>
          </InfoBox>{" "}
          <InfoBox icon={<GiCoronation />} label={"State of Origin"}>
            ""
          </InfoBox>
        </GridItem>

        <GridItem display={"grid"} gap={4}>
          <InfoBox label={"L.G.A"} icon={<GiCoronation />}>
            <Text
              as="p"
              fontSize={"sm"}
              letterSpacing={0.8}
              textTransform={"uppercase"}
            >
              L.G.A
            </Text>
          </InfoBox>{" "}
          <InfoBox icon={<GiCoronation />} label={"Religion"}>
            ""
          </InfoBox>
        </GridItem>

        <GridItem display={"grid"} gap={4}>
          <InfoBox label={"Blood Group"} icon={<GiCoronation />}>
            <Text
              as="p"
              fontSize={"sm"}
              letterSpacing={0.8}
              textTransform={"uppercase"}
            >
              ""
            </Text>
          </InfoBox>{" "}
          <InfoBox icon={<GiCoronation />} label={"Genotype"}>
            ""
          </InfoBox>
        </GridItem>
      </Grid>

      <GridItem
        gap={6}
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        pt={6}
        py={4}
        mt={4}
        bg={"white"}
        px={{ base: 4, md: 6 }}
        w={"full"}
        display={"grid"}
        rounded={"lg"}
      >
        <Box display={"flex"} flexWrap={"wrap"}>
          <Flex gap={4}>
            <IconComponent>
              <MdPersonOutline size={20} />
            </IconComponent>

            <Box w="full">
              <Flex justifyContent="space-between" w="full" alignItems="center">
                <Text as="h3" mb={1} fontWeight="semibold">
                  Staff ID
                </Text>
              </Flex>

              <Text
                as="p"
                fontSize={"sm"}
                letterSpacing={0.8}
                textTransform={"uppercase"}
              >
                {`GSHN/STF/${portalId}`}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box display={"flex"} flexWrap={"wrap"}>
          <Flex gap={4}>
            <IconComponent>
              <MdPersonOutline size={20} />
            </IconComponent>

            <Box w="full">
              <Flex justifyContent="space-between" w="full" alignItems="center">
                <Text as="h3" fontWeight="semibold">
                  Roles
                </Text>

                {roles?.length > 0 && (
                  <Grid
                    height={7}
                    w={7}
                    bg="transparent"
                    color="neutral.700"
                    rounded="lg"
                    placeItems="center"
                    border="1px solid"
                    borderColor="neutral.700"
                    onClick={() => handleAssignClick("roles")}
                    cursor="pointer"
                  >
                    <IconComponent h="full" w="full">
                      <MdEdit />
                    </IconComponent>
                  </Grid>
                )}
              </Flex>

              <Flex w="full" gap={4} mt={2} flexWrap={"wrap"}>
                {roles && roles?.length > 0 ? (
                  roles?.map((role, index) => (
                    <Tag
                      flexShrink={0}
                      size="sm"
                      key={index}
                      variant="solid"
                      colorScheme="blue"
                    >
                      {role.name}
                    </Tag>
                  ))
                ) : (
                  <Box>
                    <Text as="small" mb={4}>
                      No Roles assigned yet!
                    </Text>
                    <Button
                      display="flex"
                      w="max-content"
                      size="sm"
                      fontSize="xs"
                      variant="outline"
                      colorScheme="blue"
                      leftIcon={<MdAdd size={18} />}
                      onClick={() => handleAssignClick("roles")}
                    >
                      Assign Roles
                    </Button>
                  </Box>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>

        {roles?.some((role) =>
          ["Subject Teacher", "School Teacher", "Class Teacher"].includes(role)
        ) && (
          <>
            <InfoBox label={"Subjects"} icon={<MdPersonOutline size={20} />}>
              {subjects?.length > 0 && (
                <Grid
                  height={7}
                  w={7}
                  bg="transparent"
                  color="neutral.700"
                  rounded="lg"
                  placeItems="center"
                  border="1px solid"
                  borderColor="neutral.700"
                  onClick={() => handleAssignClick("subjects")}
                  cursor="pointer"
                >
                  <IconComponent h="full" w="full">
                    <MdEdit />
                  </IconComponent>
                </Grid>
              )}
            </InfoBox>

            <InfoBox label={"Classes"} icon={<MdClass />}>
              {classes?.length > 0 && (
                <Grid
                  height={7}
                  w={7}
                  bg="transparent"
                  color="neutral.700"
                  rounded="lg"
                  placeItems="center"
                  border="1px solid"
                  borderColor="neutral.700"
                  onClick={() => handleAssignClick("classes")}
                  cursor="pointer"
                >
                  <IconComponent h="full" w="full">
                    <MdEdit />
                  </IconComponent>
                </Grid>
              )}
            </InfoBox>
          </>
        )}
      </GridItem>
    </Grid>
  );
}
