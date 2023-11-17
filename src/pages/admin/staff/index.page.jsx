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
import {
  MdAdd,
  MdGridView,
  MdIcecream,
  MdTableChart,
  MdUploadFile,
} from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import AllStaffTable from "../../../components/tables/AllStaffTable.component";
import { useNavigate } from "react-router-dom";
import StaffPreviewCard from "../../../components/PreviewCards/StaffPreviewCard";
import schoolData from "../../../data/school.data";
import { useState } from "react";
import { useEffect } from "react";
import { getStaffData } from "../../../api/staff.api";
import { useMemo } from "react";
import axios from "../../../api/axios";

export default function AllStaffPage() {
  const navigate = useNavigate();
  const [dataView, setDataView] = useState("grid");

  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch staff data from the API
    const fetchStaffData = async () => {
      const response = await getStaffData();
      setStaffData(response);
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    // Your logic to handle staffData change
    console.log(staffData.data);
  }, [staffData]);

  // Memoize the staffData using useMemo
  const memoizedStaffData = useMemo(() => staffData, [staffData]);

  function handleDataView(e) {
    e.preventDefault;
    setDataView(() => e);
  }
  return (
    <PageWrapper>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Text
          as={"h2"}
          mt={0}
          className=""
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          All Staff
        </Text>
        <Text as={"small"}>Home / Staff / All Staff</Text>
      </Flex>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search staff"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            size={"sm"}
            bg={"neutral.100"}
            border={"1px"}
            borderColor={"brand.700"}
          >
            <IconComponent>
              <MdIcecream />
            </IconComponent>{" "}
            Download
          </Button>
          <Button
            as={"Flex"}
            gap={2}
            size={"sm"}
            bg={"accent.700"}
            color={"white"}
          >
            <IconComponent>
              <MdUploadFile />
            </IconComponent>{" "}
            Bulk Upload Staff
          </Button>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            onClick={() => navigate("/admin/staff/new")}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Staff
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

          <HStack>
            <Grid
              cursor={"pointer"}
              placeItems={"center"}
              color={"neutral.600"}
              bg={dataView === "grid" ? "red.100" : "neutral.300"}
              rounded={"lg"}
              onClick={() => handleDataView("grid")}
            >
              <IconComponent>
                <MdGridView />
              </IconComponent>
            </Grid>
            <Grid
              cursor={"pointer"}
              placeItems={"center"}
              color={"neutral.600"}
              bg={dataView === "table" ? "red.100" : "neutral.300"}
              rounded={"lg"}
              onClick={() => handleDataView("table")}
            >
              <IconComponent>
                <MdTableChart />
              </IconComponent>
            </Grid>
          </HStack>
        </Flex>

        {staffData && staffData?.data ? (
          dataView === "grid" ? (
            <Grid
              gridTemplateColumns={{
                "base": "1fr",
                "md": "repeat(2, 1fr)",
                "lg": "repeat(4, 1fr)",
              }}
              mt={"4"}
              gap={4}
            >
              {staffData?.data?.map((staff) => (
                <StaffPreviewCard key={staff?.portalId} staff={staff} />
              ))}
            </Grid>
          ) : (
            <AllStaffTable existingStaffData={staffData} />
          )
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No Staff data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
