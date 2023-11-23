import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import {
  Text,
  Flex,
  Box,
  Button,
  Grid,
  Select,
  HStack,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import schoolData from "../../../data/school.data";
import { useState } from "react";

import PageSectionHeader from "../../../components/PageSectionHeader";
import DataViewSwitcher from "../../../widgets/DataViewSwitcher";
import AllEventsTable from "../../../components/tables/AllEventsTable";

export default function AllEventsPage() {
  const [dataView, setDataView] = useState("grid");

  function handleDataView(e) {
    e.preventDefault;
    setDataView(() => e);
  }
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"All Events"}
        pageCrumb={"Home / Events / All"}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search staff"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            // onClick={() => navigate("/admin/staff/new")}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Event
          </Button>
        </Flex>
      </Flex>

      <Box px={8} py={6} pb={10} bg={"white"} rounded={"lg"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={4}
          my={4}
        >
          <HStack mb={4}>
            <Text flexShrink={0} fontWeight={"bold"} as={"small"}>
              Filter by:
            </Text>
            <Select size={"sm"} minW={"sm"}>
              <option value="">-- Select Role --</option>
              {schoolData.staffRoles?.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
              <option value="all_staff">All</option>
            </Select>
          </HStack>

          <DataViewSwitcher
            dataView={dataView}
            handleDataView={handleDataView}
          />
        </Flex>

        {dataView === "grid" ? (
          <Grid
            gridTemplateColumns={{
              "base": "1fr",
              "sm": "2, 1fr",
              "md": "repeat(3, 1fr)",
              "lg": "repeat(5, 1fr)",
            }}
            mt={"4"}
            gap={4}
          >
            {/* TODO:  */}
            ''''Grid view''''
          </Grid>
        ) : (
          <AllEventsTable />
        )}
      </Box>
    </PageWrapper>
  );
}
