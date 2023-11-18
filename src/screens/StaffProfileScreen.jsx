import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  Tag,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import Avatar from "../components/Avatar.component";
import IconComponent from "../components/Icon.component";
import {
  MdAdd,
  MdEdit,
  MdOutlineDeleteOutline,
  MdOutlineMailOutline,
  MdPersonOutline,
  MdPhone,
  MdPictureInPictureAlt,
  MdWhatsapp,
} from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";

import { useModal } from "../app/contexts/ModalContext";
import schoolData from "../data/school.data";
import Checklist from "../components/CheckList";
import subjectsData from "../data/subjects.data";
import dayjs from "dayjs";
import allowedUserRoles from "../helpers/allowedUserRoles";
import { useUser } from "../app/contexts/UserContext";

const schoolClasses = schoolData.schoolClasses;
const staffRoles = schoolData.staffRoles;

export default function StaffProfileScreen({
  staff,
  existingStaffData,
  staffId,
}) {
  const { openPortal, closePortal } = useModal();
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
      if (staff.id === staffId) {
        // Update the classes for the specified staff member
        staff.classes = selectedClasses;
      }
      return staff;
    });

    // Update local storage with the updated staff data
    localStorage.setItem("staffData", JSON.stringify(updatedStaffData));

    closePortal();
  }

  function handleAssignRoles(selectedRoles) {
    // Make changes to selected roles if needed
    setSelectedRoles(selectedRoles);
    staff.roles = selectedRoles;

    const updatedStaffData = existingStaffData.map((staff) => {
      if (staff.id === staffId) {
        // Update the roles for the specified staff member
        staff.roles = selectedRoles;
      }
      return staff;
    });

    // Update local storage with the updated staff data
    localStorage.setItem("staffData", JSON.stringify(updatedStaffData));

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
          rounded={"lg"}
          alignContent={"center"}
          justifyContent={"center"}
          bg={"white"}
          position={"relative"}
          pb={4}
        >
          <Avatar width={180} height={180} imageUrl={"/avatar.png"} />

          <Flex
            justifyContent={"center"}
            w={"full"}
            position={{ "base": "relative", "md": "absolute" }}
            bottom={{ "base": "0", "md": 4 }}
          >
            <Button
              rightIcon={<MdPictureInPictureAlt />}
              display={"flex"}
              w={"max-full"}
              colorScheme="purple"
              variant={"outline"}
              size={"sm"}
            >
              Update avatar
            </Button>
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
            <GridItem bg={"white"} py={4} px={6} rounded={"lg"}>
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
                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdPersonOutline size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Full name
                      </Text>
                      <Text as={"p"}>{fullname}</Text>{" "}
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdPersonOutline size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Gender
                      </Text>
                      <Text as={"p"} textTransform={"capitalize"}>
                        {gender}
                      </Text>{" "}
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdOutlineMailOutline size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Date of Birth
                      </Text>
                      <Text
                        as={"p"}
                        textTransform={""}
                        fontFamily={"monospace"}
                      >
                        {dayjs(dateOfBirth).format("dddd, MMM D")}
                      </Text>{" "}
                    </Box>
                  </Flex>
                </Box>
                {/* <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdPersonOutline size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Student Type
                      </Text>
                      <Text as={"p"} textTransform={"capitalize"}>
                        {studentType} Student
                      </Text>{" "}
                    </Box>
                  </Flex>
                </Box> */}
              </Grid>
            </GridItem>

            <GridItem bg={"white"} py={4} px={6} rounded={"lg"}>
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
                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdOutlineMailOutline size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Email
                      </Text>
                      <Text as={"p"} textTransform={"lowercase"}>
                        {email}
                      </Text>{" "}
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdPhone size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Phone Number
                      </Text>
                      <Text as={"p"} textTransform={"capitalize"}>
                        {phoneNumber}
                      </Text>{" "}
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdWhatsapp size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Whatsapp Number
                      </Text>
                      <Text as={"p"} textTransform={"capitalize"}>
                        {whatsappNumber}
                      </Text>{" "}
                    </Box>
                  </Flex>
                </Box>
              </Grid>
            </GridItem>

            {allowedUserRoles(user, ["IT Personnel"]) && (
              <Button
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

            {/* {allowedUserRoles(user, ["IT Personnel"]) && (
              <Button
                fontSize={"sm"}
                leftIcon={<MdEdit />}
                size={"sm"}
                colorScheme="blue"
                onClick={() => openPortal()}
              >
                Edit Profile
              </Button>
            )} */}

            {/* <Button
              leftIcon={<MdOutlineClose />}
              colorScheme="yellow"
              fontSize={"sm"}
              size={"sm"}
            >
              Deactivate Account
            </Button>
           */}
          </ButtonGroup>
        </Flex>
      </Flex>

      <Grid gap={4} /*gridTemplateColumns="repeat(auto-fit, minmax(0, 1fr))"*/>
        {/* <GridItem
          bg={"white"}
          py={4}
          px={6}
          rounded={"lg"}
          colStart={1}
          colEnd={3}
          flexShrink={0}
        >
          <Text as="h2" fontWeight="bold" mt={2} mb={4}>
            Personal Details
          </Text>

          <Grid gap={6}>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdPersonOutline size={20} />
                </IconComponent>

                <Box>
                  <Text as="h3" fontWeight="semibold">
                    Full name
                  </Text>
                  <Text as="p" fontSize="sm">
                    {fullname}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdPersonOutline size={20} />
                </IconComponent>

                <Box>
                  <Text as="h3" fontWeight="semibold">
                    Gender
                  </Text>
                  <Text as="p" fontSize="sm" textTransform="capitalize">
                    {gender}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdOutlineMailOutline size={20} />
                </IconComponent>

                <Box>
                  <Text as="h3" fontWeight="semibold">
                    Email
                  </Text>
                  <Text as="p" fontSize="sm" textTransform="lowercase">
                    {email}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdPhone size={20} />
                </IconComponent>

                <Box>
                  <Text as="h3" fontWeight="semibold">
                    Phone Number
                  </Text>
                  <Text as="p" fontSize="sm" textTransform="capitalize">
                    {phoneNumber}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Grid>
        </GridItem> */}

        <GridItem bg={"white"} py={4} px={6} w={"full"} rounded={"lg"}>
          <Grid gap={6} gridTemplateColumns="repeat(2, 1fr)" pt={2}>
            <Box display={"flex"} flexWrap={"wrap"}>
              <Flex gap={4}>
                <IconComponent>
                  <MdPersonOutline size={20} />
                </IconComponent>

                <Box w="full">
                  <Flex
                    justifyContent="space-between"
                    w="full"
                    alignItems="center"
                  >
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
                  <Flex
                    justifyContent="space-between"
                    w="full"
                    alignItems="center"
                  >
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
                          {role}
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
              ["Subject Teacher", "School Teacher", "Class Teacher"].includes(
                role
              )
            ) && (
              <>
                <Box w="full">
                  <Flex gap={4}>
                    <IconComponent>
                      <MdPersonOutline size={20} />
                    </IconComponent>

                    <Box w="full">
                      <Flex
                        justifyContent="space-between"
                        w="full"
                        alignItems="center"
                      >
                        <Text as="h3" fontWeight="semibold">
                          Subjects
                        </Text>

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
                      </Flex>

                      <Flex w="full" gap={2} mt={2} flexWrap={"wrap"}>
                        {subjects && subjects?.length > 0 ? (
                          subjects.map((subject, index) => (
                            <Tag
                              w="max-content"
                              flexShrink={0}
                              size="sm"
                              key={index}
                              variant="outline"
                              colorScheme="red"
                            >
                              {subject}
                            </Tag>
                          ))
                        ) : (
                          <Flex direction="column" w="full" gap={4}>
                            <Text as="small">No subjects assigned yet!</Text>
                            <Button
                              display="flex"
                              w="max-content"
                              size="sm"
                              fontSize="xs"
                              colorScheme="red"
                              variant="outline"
                              leftIcon={<MdAdd size={18} />}
                              onClick={() => handleAssignClick("subjects")}
                            >
                              Assign Subject
                            </Button>
                          </Flex>
                        )}
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdPersonOutline size={20} />
                    </IconComponent>
                    <Box w="full">
                      <Flex
                        justifyContent="space-between"
                        w="full"
                        alignItems="center"
                      >
                        <Text as="h3" fontWeight="semibold">
                          Classes
                        </Text>

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
                      </Flex>

                      <Flex w="full" gap={2} mt={2} flexWrap={"wrap"}>
                        {classes && classes.length > 0 ? (
                          classes.map((schoolClass, index) => (
                            <Tag
                              flexShrink={0}
                              size="sm"
                              key={index}
                              variant="solid"
                              colorScheme="purple"
                            >
                              {schoolClass.name}
                            </Tag>
                          ))
                        ) : (
                          <Flex direction="column" w="full" gap={4}>
                            <Text as="small">No classes assigned yet!</Text>
                            <Button
                              display="flex"
                              w="max-content"
                              size="sm"
                              fontSize="xs"
                              variant="outline"
                              colorScheme="purple"
                              leftIcon={<MdAdd size={18} />}
                              onClick={() => handleAssignClick("classes")}
                            >
                              Assign Class
                            </Button>
                          </Flex>
                        )}
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </>
            )}
          </Grid>
        </GridItem>
      </Grid>
    </Grid>
  );
}
