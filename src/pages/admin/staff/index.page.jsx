import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button, Grid } from "@chakra-ui/react";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import AllStaffTable from "../../../components/tables/AllStaffTable.component";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import StaffPreviewCard from "../../../components/PreviewCards/StaffPreviewCard";

export default function AllStaffPage() {
  const { getItem } = useLocalStorage("staffData");
  const navigate = useNavigate();

  const existingStaffData = getItem();

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
        {existingStaffData && existingStaffData?.length > 0 ? (
          <Grid
            gridTemplateColumns={{
              "base": "1fr",
              "md": "repeat(4, 1fr)",
              "lg": "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {existingStaffData.map((staff) => (
              <StaffPreviewCard key={staff?.id} staff={staff} />
            ))}
          </Grid>
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No Staff data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
