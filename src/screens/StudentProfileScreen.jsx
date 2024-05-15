import { useState } from "react";

import dayjs from "dayjs";

import {
  Box,
  Flex,
  Grid,
  Button,
  Text,
  GridItem,
  ButtonGroup,
  Stack,
  Tag,
} from "@chakra-ui/react";

import {
  MdEdit,
  MdEmojiTransportation,
  MdOutlineDeleteOutline,
  MdOutlineMailOutline,
  MdOutlineSchool,
  MdPersonOutline,
  MdPhone,
  MdRoom,
  MdWhatsapp,
} from "react-icons/md";

import { FaRegIdCard } from "react-icons/fa";

import { useModal } from "../app/contexts/ModalContext";
import { useUser } from "../app/contexts/UserContext";

import allowedUserRoles from "../helpers/allowedUserRoles";

import UpdateAvatarButton from "../components/Buttons/UpdateAvatarButton";
import Avatar from "../components/Avatar.component";
import IconComponent from "../components/Icon.component";
import InfoBox from "../components/shared/InfoBox.component";
import { GiCoronation } from "react-icons/gi";
import { useStudentClassDetails } from "../hooks";
import { useNavigate } from "react-router-dom";
import StudentIDCard from "../components/cards/StudentIDCard";

export default function StudentProfileScreen({ student }) {
  const { openPortal } = useModal();
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleEditAction = (studentId) => {
    navigate(`/admin/students/${studentId}/edit`);
  };

  const {
    first_name,
    last_name,
    gender,
    guardianEmail,
    guardianPhoneNumber,
    schoolClass,
    subClass,
    dateOfBirth,
    studentId,
  } = student;

  console.log(student);

  const fullname = `${first_name} ${last_name}`;

  const { classDetails, subclassDetails } = useStudentClassDetails(
    schoolClass,
    subClass
  );

  console.log(classDetails, subclassDetails);

  return (
    <Grid gap={1} mt={4}>
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
          width={{ base: "full", md: "max-content" }}
          pb={4}
          maxW={{ base: "none", md: "240px" }}
        >
          <Avatar
            width={156}
            height={156}
            imageUrl={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : student?.avatarImageURL
                ? student?.avatarImageURL
                : "/avatar.png"
            }
          />

          <Flex
            justifyContent={"center"}
            w={"full"}
            position={{ "base": "relative", "md": "absolute" }}
            bottom={{ "base": "0", "md": 4 }}
          >
            <UpdateAvatarButton
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              theUser={student}
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
                        {dayjs(dateOfBirth).format("MMM d, YYYY")}
                      </Text>{" "}
                    </Box>
                  </Flex>
                </Box>
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
                      <MdPersonOutline size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontSize={"sm"} fontWeight={"semibold"}>
                        Contact Address
                      </Text>
                      <Text as={"p"}>{fullname}</Text>{" "}
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
                        Guardian Email
                      </Text>
                      <Text as={"p"} textTransform={"lowercase"}>
                        {guardianEmail}
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
                        {guardianPhoneNumber}
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
                        {guardianPhoneNumber}
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
            flexDirection={{ base: "column", md: "row" }}
            gap={3}
            justifyContent={"flex-end"}
          >
            <Button
              fontSize={"sm"}
              leftIcon={<FaRegIdCard />}
              size={"sm"}
              colorScheme="purple"
              variant={"outline"}
              onClick={() => openPortal(<StudentIDCard student={student} />)}
            >
              Student ID Card
            </Button>

            {allowedUserRoles(user, ["IT Personnel"]) && (
              <Button
                fontSize={"sm"}
                leftIcon={<MdEdit />}
                size={"sm"}
                colorScheme="facebook"
                onClick={() => handleEditAction(student.portalId)}
              >
                Edit Profile
              </Button>
            )}

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
        mb={4}
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

      <Grid
        gap={4}
        gridTemplateColumns={{ "base": "1fr", "md": "repeat(3, 1fr)" }}
      >
        <GridItem bg={"white"} py={4} px={6} rounded={"lg"}>
          <Text
            as={"h3"}
            textTransform={"uppercase"}
            color={"brand.700"}
            letterSpacing={1}
            fontWeight={"bold"}
            mt={2}
            mb={4}
          >
            EDUCATION
          </Text>

          <Grid gap={6}>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdPersonOutline size={20} />
                </IconComponent>

                <Box>
                  <Text
                    fontSize={"sm"}
                    color={"neutral.700"}
                    as={"h3"}
                    fontWeight={"semibold"}
                  >
                    Student ID
                  </Text>
                  <Text
                    as={"p"}
                    textTransform={"uppercase"}
                    letterSpacing={1}
                    fontFamily={"monospace"}
                  >
                    GSHN/STU/{studentId}
                  </Text>{" "}
                </Box>
              </Flex>
            </Box>

            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdPersonOutline size={20} />
                </IconComponent>

                <Box>
                  <Text
                    fontSize={"sm"}
                    color={"neutral.700"}
                    as={"h3"}
                    fontWeight={"semibold"}
                  >
                    Class
                  </Text>
                  <Text as={"p"}>
                    {classDetails?.name} {subclassDetails?.name}
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
                  <Text
                    as={"h3"}
                    fontSize={"sm"}
                    color={"neutral.700"}
                    fontWeight={"semibold"}
                  >
                    Subjects
                  </Text>
                  <Text as={"p"} textTransform={"capitalize"}>
                    {/* {gender} */}
                  </Text>{" "}
                </Box>
              </Flex>
            </Box>
            <ButtonGroup justifyContent={"space-between"} mt={4}>
              <Button size={"sm"} fontSize={"sm"} colorScheme="facebook">
                Report Sheet
              </Button>
              <Button size={"sm"} fontSize={"sm"} colorScheme="facebook">
                Class Attendance
              </Button>
            </ButtonGroup>
          </Grid>
        </GridItem>

        <GridItem bg={"white"} py={4} px={6} rounded={"lg"} w={"full"}>
          <Text
            as={"h3"}
            textTransform={"uppercase"}
            color={"brand.700"}
            letterSpacing={1}
            fontWeight={"bold"}
            mt={2}
            mb={4}
          >
            FEES
          </Text>

          <Grid gap={6}>
            <Box maxH={"272px"} overflowX={"scroll"} w={"full"}>
              <Stack spacing={4}>
                {/*  */}
                <Flex
                  borderBottom={"1px dotted"}
                  pr={4}
                  pb={4}
                  gap={2}
                  w={"full"}
                >
                  <IconComponent>
                    <MdOutlineSchool size={20} />
                  </IconComponent>

                  <Stack w={"full"} spacing={"1"}>
                    <Flex w={"full"} justifyContent={"space-between"}>
                      <Text
                        fontSize={"sm"}
                        color={"neutral.700"}
                        as={"h3"}
                        fontWeight={"semibold"}
                      >
                        School Fees
                      </Text>
                      <Text as={"small"}>2023 - 2024 </Text>
                    </Flex>
                    <Stack w={"full"} spacing={3}>
                      <Stack w={"full"}>
                        <Flex w={"full"} justifyContent={"space-between"}>
                          <Stack w={"full"}>
                            <Text as={"p"} fontWeight={"bold"} fontSize={"sm"}>
                              {" "}
                              54,500 NGN
                            </Text>
                          </Stack>

                          <Tag
                            flexShrink={0}
                            display={"grid"}
                            w={"max-content"}
                            size={"sm"}
                            placeItems={"center"}
                            px={2}
                            colorScheme="red"
                            fontWeight={"bold"}
                          >
                            Unpaid
                          </Tag>
                        </Flex>
                      </Stack>
                      <Button
                        mt={0}
                        width={"max-content"}
                        size={"xs"}
                        colorScheme="red"
                        fontSize={"xs"}
                      >
                        Generate Invoice
                      </Button>
                    </Stack>
                  </Stack>
                </Flex>

                {/*  */}
                <Flex
                  gap={2}
                  pb={3}
                  pr={4}
                  borderBottom={"1px dotted"}
                  w={"full"}
                >
                  <IconComponent>
                    <MdEmojiTransportation size={20} />
                  </IconComponent>

                  <Stack w={"full"} spacing={"1"}>
                    <Flex w={"full"} justifyContent={"space-between"}>
                      <Text
                        fontSize={"sm"}
                        color={"neutral.700"}
                        as={"h3"}
                        fontWeight={"semibold"}
                      >
                        Bus Fees
                      </Text>
                      <Text as={"small"}>2023 - 2024 </Text>
                    </Flex>
                    <Stack w={"full"} spacing={3}>
                      <Stack w={"full"}>
                        <Flex w={"full"} justifyContent={"space-between"}>
                          <Stack w={"full"}>
                            <Text as={"p"} fontWeight={"bold"} fontSize={"sm"}>
                              {" "}
                              13,500 NGN
                            </Text>
                          </Stack>

                          <Tag
                            flexShrink={0}
                            display={"grid"}
                            w={"max-content"}
                            size={"sm"}
                            placeItems={"center"}
                            px={2}
                            colorScheme="facebook"
                            fontWeight={"bold"}
                          >
                            Paid
                          </Tag>
                        </Flex>
                      </Stack>
                      <Button
                        mt={0}
                        width={"max-content"}
                        size={"xs"}
                        variant={"outline"}
                        colorScheme="facebook"
                        fontSize={"xs"}
                      >
                        Print Receipt
                      </Button>
                    </Stack>
                  </Stack>
                </Flex>

                {/*  */}
                <Flex
                  gap={2}
                  pb={3}
                  borderBottom={"1px dotted"}
                  w={"full"}
                  pr={4}
                >
                  <IconComponent>
                    <MdRoom size={20} />
                  </IconComponent>

                  <Stack w={"full"} spacing={"1"}>
                    <Flex w={"full"} justifyContent={"space-between"}>
                      <Text
                        fontSize={"sm"}
                        color={"neutral.700"}
                        as={"h3"}
                        fontWeight={"semibold"}
                      >
                        Hostel Fees
                      </Text>
                      <Text as={"small"}>2023 - 2024 </Text>
                    </Flex>
                    <Stack w={"full"} spacing={3}>
                      <Stack w={"full"}>
                        <Flex w={"full"} justifyContent={"space-between"}>
                          <Stack w={"full"}>
                            <Text as={"p"} fontWeight={"bold"} fontSize={"sm"}>
                              {" "}
                              13,500 NGN
                            </Text>
                          </Stack>

                          <Tag
                            flexShrink={0}
                            display={"grid"}
                            w={"max-content"}
                            size={"sm"}
                            placeItems={"center"}
                            px={2}
                            colorScheme="facebook"
                            fontWeight={"bold"}
                          >
                            Paid
                          </Tag>
                        </Flex>
                      </Stack>
                      <Button
                        mt={0}
                        width={"max-content"}
                        size={"xs"}
                        variant={"outline"}
                        colorScheme="facebook"
                        fontSize={"xs"}
                      >
                        Print Receipt
                      </Button>
                    </Stack>
                  </Stack>
                </Flex>
              </Stack>
            </Box>
          </Grid>
        </GridItem>

        <GridItem bg={"white"} py={4} px={6} rounded={"lg"}>
          <Text
            as={"h3"}
            textTransform={"uppercase"}
            color={"brand.700"}
            letterSpacing={1}
            fontWeight={"bold"}
            mt={2}
            mb={4}
          >
            EXTRA ACTIVITIES
          </Text>

          <Grid gap={6}>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdPersonOutline size={20} />
                </IconComponent>

                <Box>
                  <Text
                    fontSize={"sm"}
                    color={"neutral.700"}
                    as={"h3"}
                    fontWeight={"semibold"}
                  >
                    Class
                  </Text>
                  <Text as={"p"}>
                    {classDetails?.name} {subclassDetails?.name}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </Grid>
  );
}
