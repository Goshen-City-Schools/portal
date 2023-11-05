import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import AllStudentsTable from "../../../components/tables/AllStudentsTable.component";
import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import AllStaffTable from "../../../components/tables/AllStaffTable.component";
import ReactPortal from "../../../widgets/ReactPortal";
import { useModal } from "../../../app/contexts/ModalContext";
import CreateStaffPortal from "../../../portals/CreateStaff.portal";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function StaffPage() {
  const { openPortal } = useModal();
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

      <Box p={4} bg={"white"} rounded={"md"}>
        {existingStaffData && existingStaffData?.length > 0 ? (
          <AllStaffTable />
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No Staff data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
