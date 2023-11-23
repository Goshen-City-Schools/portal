import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import PageSectionHeader from "../../../../components/PageSectionHeader";
import {
  Grid,
  Box,
  GridItem,
  Text,
  Flex,
  Table,
  Th,
  Td,
  Button,
  Tr,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import schoolData from "../../../../data/school.data";
import { MdModeEditOutline } from "react-icons/md";

export default function ManageFees() {
  const busFeesData = [
    {
      route: "Enugu Emenike",
      toOrFrom: "22,500",
      toAndFrom: "40,500",
    },
  ];
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Manage Fees"}
        pageCrumb={"Home / Finance / Fees / Manage"}
      />

      <Box mt={6}>
        <Grid
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
        >
          <GridItem
            bg={"white"}
            rounded={"lg"}
            px={6}
            py={4}
            height={"320px"}
            overflowY={"scroll"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text as={"h3"} fontWeight={"bold"} color={"neutral.700"}>
                School Fees
              </Text>

              <Button leftIcon={<MdModeEditOutline />} size={"sm"} pr={0.5} />
            </Flex>

            <Table mt={2} borderTop={"1px solid"} px={0} variant={"simple"}>
              <Thead color={"neutral.700"}>
                <Th px={1}>Classes</Th>
                <Th textAlign={"right"}>New</Th>
                <Th textAlign={"right"}>Returning</Th>
              </Thead>

              <Tbody fontSize={"sm"}>
                {schoolData.schoolClasses.map((schoolClass) => (
                  <Tr>
                    <Td
                      fontWeight={"semibold"}
                      color={"neutral.700"}
                      px={1}
                      whiteSpace={"nowrap"}
                      flexShrink={0}
                    >
                      {schoolClass.name}
                    </Td>
                    <Td textAlign={"right"}>0.00</Td>
                    <Td textAlign={"right"}>0.00</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </GridItem>
          <GridItem
            height={"320px"}
            overflowY={"scroll"}
            bg={"white"}
            rounded={"lg"}
            px={6}
            py={4}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text as={"h3"} fontWeight={"bold"} color={"neutral.700"}>
                Bus Fees
              </Text>

              <Button leftIcon={<MdModeEditOutline />} size={"sm"} pr={0.5} />
            </Flex>

            <Table mt={2} borderTop={"1px solid"} px={0} variant={"simple"}>
              <Thead color={"neutral.700"}>
                <Th px={1}>Route</Th>
                <Th textAlign={"right"}>To/From School</Th>
                <Th textAlign={"right"}>To & From School </Th>
              </Thead>

              <Tbody fontSize={"sm"}>
                {busFeesData.map((busFee) => (
                  <Tr>
                    <Td
                      fontWeight={"semibold"}
                      color={"neutral.700"}
                      px={1}
                      whiteSpace={"nowrap"}
                      flexShrink={0}
                    >
                      {busFee.route}
                    </Td>
                    <Td textAlign={"right"}>{busFee.toOrFrom}</Td>
                    <Td textAlign={"right"}>{busFee.toAndFrom}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </GridItem>
          <GridItem
            height={"320px"}
            overflowY={"scroll"}
            bg={"white"}
            rounded={"lg"}
            px={6}
            py={4}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text as={"h3"} fontWeight={"bold"} color={"neutral.700"}>
                Hostel Fees
              </Text>

              <Button leftIcon={<MdModeEditOutline />} size={"sm"} pr={0.5} />
            </Flex>

            <Table mt={2} borderTop={"1px solid"} px={0} variant={"simple"}>
              <Thead color={"neutral.700"}>
                <Th px={1}>Classes</Th>
                <Th textAlign={"right"}>Male</Th>
                <Th textAlign={"right"}>Female</Th>
              </Thead>

              <Tbody fontSize={"sm"}>
                {schoolData.schoolClasses.map((schoolClass) => (
                  <Tr>
                    <Td
                      fontWeight={"semibold"}
                      color={"neutral.700"}
                      px={1}
                      whiteSpace={"nowrap"}
                      flexShrink={0}
                    >
                      {schoolClass.name}
                    </Td>
                    <Td textAlign={"right"}>0.00</Td>
                    <Td textAlign={"right"}>0.00</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </GridItem>
        </Grid>
      </Box>
    </PageWrapper>
  );
}
