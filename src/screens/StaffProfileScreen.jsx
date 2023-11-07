import React from "react";

import { Box, Flex, Grid, Button, Text, GridItem } from "@chakra-ui/react";
import Avatar from "../components/Avatar.component";
import IconComponent from "../components/Icon.component";
import {
  MdEmail,
  MdOutlineMailOutline,
  MdOutlineSchool,
  MdPerson,
  MdPersonOutline,
  MdPhone,
  MdSchool,
} from "react-icons/md";

export default function StaffProfileScreen({ staff }) {
  const { firstName, lastName, gender, email, phoneNumber, role } = staff;

  const fullname = `${firstName} ${lastName}`;
  return (
    <Grid gap={4} mt={4}>
      <Flex bg={"white"} py={4} px={6} rounded={"lg"}>
        <Grid gap={6}>
          <Avatar width={180} height={180} imageUrl={"/avatar.png"} />
          <Button colorScheme="purple" variant={"outline"} size={"sm"}>
            Update avatar
          </Button>
        </Grid>
      </Flex>

      <Grid gap={4} gridTemplateColumns={"repeat(auto-fit, (7, 1fr)"}>
        <GridItem
          bg={"white"}
          py={4}
          px={6}
          rounded={"lg"}
          gridColumnStart={1}
          gridColumnEnd={2}
        >
          <Text as={"h2"} fontWeight={"bold"} mt={2} mb={4}>
            Personal Details
          </Text>

          <Grid gap={6}>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdPersonOutline size={20} />
                </IconComponent>

                <Box>
                  <Text as={"h3"} fontWeight={"semibold"}>
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
                  <Text as={"h3"} fontWeight={"semibold"}>
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
                  <Text as={"h3"} fontWeight={"semibold"}>
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
                  <Text as={"h3"} fontWeight={"semibold"}>
                    Phone Number
                  </Text>
                  <Text as={"p"} textTransform={"capitalize"}>
                    {phoneNumber}
                  </Text>{" "}
                </Box>
              </Flex>
            </Box>
          </Grid>
        </GridItem>
        <GridItem
          bg={"white"}
          py={4}
          px={6}
          w={"full"}
          rounded={"lg"}
          gridColumnStart={2}
          gridColumnEnd={8}
        >
          <Grid gap={6} gridTemplateColumns={"repeat(2,1fr)"} pt={2}>
            <Box>
              <Flex gap={4}>
                <IconComponent>
                  <MdOutlineSchool size={20} />
                </IconComponent>

                <Box>
                  <Text as={"h3"} fontWeight={"semibold"}>
                    Role
                  </Text>
                  <Text as={"p"}>{role}</Text>{" "}
                </Box>
              </Flex>
            </Box>

            {["Subject Teacher", "Class Teacher"].includes(role) && (
              <>
                <Box>
                  <Flex gap={4}>
                    <IconComponent>
                      <MdPersonOutline size={20} />
                    </IconComponent>

                    <Box>
                      <Text as={"h3"} fontWeight={"semibold"}>
                        Subject(s)
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
                      <Text as={"h3"} fontWeight={"semibold"}>
                        Class(es)
                      </Text>
                      <Text as={"p"} textTransform={"capitalize"}>
                        {email}
                      </Text>{" "}
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
