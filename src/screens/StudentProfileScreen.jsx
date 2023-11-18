import React from "react";

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
import Avatar from "../components/Avatar.component";
import IconComponent from "../components/Icon.component";
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
import dayjs from "dayjs";
import { useModal } from "../app/contexts/ModalContext";
import allowedUserRoles from "../helpers/allowedUserRoles";
import { useUser } from "../app/contexts/UserContext";
import UpdateAvatarButton from "../components/Buttons/UpdateAvatarButton";

export default function StudentProfileScreen({ student }) {
  const { openPortal } = useModal();
  const { user } = useUser();

  const {
    firstName,
    lastName,
    gender,
    guardianEmail,
    guardianPhoneNumber,
    schoolClass,
    subClass,
    dateOfBirth,
    studentType,
    portalId,
  } = student;

  const fullname = `${firstName} ${lastName}`;
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
          pb={4}
        >
          <Avatar width={180} height={180} imageUrl={"/avatar.png"} />

          <Flex
            justifyContent={"center"}
            w={"full"}
            position={{ "base": "relative", "md": "absolute" }}
            bottom={{ "base": "0", "md": 4 }}
          >
            <UpdateAvatarButton />
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
                <Box>
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
              Student ID Card
            </Button>

            {allowedUserRoles(user, ["IT Personnel"]) && (
              <Button
                fontSize={"sm"}
                leftIcon={<MdEdit />}
                size={"sm"}
                colorScheme="blue"
                onClick={() => openPortal()}
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
                    GSHN/STU/{portalId}
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
                    {schoolClass} {subClass}
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
              <Button size={"sm"} fontSize={"sm"} colorScheme="blue">
                Report Sheet
              </Button>
              <Button size={"sm"} fontSize={"sm"} colorScheme="green">
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
                            colorScheme="green"
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
                        colorScheme="blue"
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
                            colorScheme="green"
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
                        colorScheme="blue"
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
                  <Text as={"p"}>{schoolClass}</Text>{" "}
                </Box>
              </Flex>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </Grid>
  );
}
