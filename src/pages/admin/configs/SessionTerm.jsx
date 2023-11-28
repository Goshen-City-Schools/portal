import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Flex, Box, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import IconComponent from "../../../components/Icon.component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useModal } from "../../../app/contexts/ModalContext";
import ReactPortal from "../../../widgets/React_portal";
import AddNewTerm from "../../../portals/AddNewTerm";

export default function SessionTermPage() {
  const { openPortal } = useModal();
  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={"Session and Term"}
        pageCrumb={"Configuration / Session and Term"}
      />
      {/*  */}
      <Box py={6}>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
          <GridItem>
            <Flex
              bg={"white"}
              rounded={"lg"}
              p={6}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Text as={"p"}>Current Academic Session</Text>
                <Text as={"h3"} fontWeight={"bold"} fontSize={"md"}>
                  2023/2024
                </Text>
              </Box>
              <IconComponent>
                <FaEdit />
              </IconComponent>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              bg={"white"}
              rounded={"lg"}
              p={6}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Text as={"p"}>Current Term</Text>
                <Text as={"h3"} fontWeight={"bold"} fontSize={"md"}>
                  First Term
                </Text>
              </Box>
              <IconComponent>
                <FaEdit />
              </IconComponent>
            </Flex>
          </GridItem>
        </Grid>
      </Box>

      {/*  */}

      <Box p={6} bg={"white"} rounded={"md"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text as={"h3"} fontWeight={"bold"} fontSize={"md"}>
            All Terms
          </Text>

          <Button onClick={() => openPortal(<AddNewTerm />)}>
            <IconComponent>
              <FaPlus />
            </IconComponent>{" "}
            New Term
          </Button>
        </Flex>
      </Box>
    </PageWrapper>
  );
}
