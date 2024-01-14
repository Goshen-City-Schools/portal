import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button, Select, HStack } from "@chakra-ui/react";

import { MdAdd, MdImportExport } from "react-icons/md";

import { useStaffRoles, useStaffs } from "../../../hooks/";

import SearchWidget from "../../../widgets/Search.widget";

import AllStaffTable from "../../../components/tables/users/StaffTable.component";
import { useEffect } from "react";

export default function AllStaffPage() {
  const navigate = useNavigate();
  const { staffRolesData: staffRoles } = useStaffRoles();
  const { staffsData, a } = useStaffs();
  const [filteredStaffData, setFilteredStaffData] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    // Check if a role is selected
    if (selectedRole) {
      // Filter the staffsData based on the selectedRole
      const filteredData = staffsData.filter(
        (staff) => staff.primaryRole === selectedRole
      );

      // Update the filteredStaffData state
      setFilteredStaffData(filteredData);
    } else {
      // If no role is selected, show all staff
      setFilteredStaffData(staffsData);
    }
  }, [selectedRole, staffsData]);

  function handleChange(e) {
    const { value } = e.target;

    setSelectedRole(value);

    console.log(selectedRole);
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
          Staff Configuration
        </Text>
        <Text as={"small"}>Home / Staff </Text>
      </Flex>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search staff"} />

        <Flex gap={4} fontSize={"sm"} m={4}>
          <Button
            size={"sm"}
            colorScheme={"blue"}
            variant={"outline"}
            leftIcon={<MdImportExport />}
            onClick={() => navigate("/admin/config/staff/new")}
          >
            Import / Export
          </Button>
          <Button
            size={"sm"}
            colorScheme={"blue"}
            leftIcon={<MdAdd />}
            onClick={() => navigate("/admin/config/staff/new")}
          >
            New Staff
          </Button>
        </Flex>
      </Flex>

      <Box>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={4}
          my={4}
          mb={4}
        >
          <HStack mb={4}>
            <Text flexShrink={0} fontWeight={"bold"} as={"small"}>
              Filter by:
            </Text>
            <Select size={"sm"} minW={"sm"} onChange={handleChange}>
              <option value="">-- Select Role --</option>
              {staffRoles?.map((role) => (
                <option key={role.id} value={role._id}>
                  {role.name}
                </option>
              ))}
              <option value="">All</option>
            </Select>
          </HStack>
        </Flex>

        {staffsData && staffsData ? (
          <AllStaffTable existingStaffData={filteredStaffData} />
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No Staff data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
