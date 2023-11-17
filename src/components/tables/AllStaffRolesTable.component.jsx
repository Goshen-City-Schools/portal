import React, { useState } from "react";
import Table from "../../widgets/Table.widget";
import { Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../app/contexts/AuthContext";

import { Text, Tag } from "@chakra-ui/react";
import schoolData from "../../data/school.data";

const AllStaffRolesTable = () => {
  const toast = useToast();
  const existingStaffData = useLocalStorage("staffData").getItem();
  const navigate = useNavigate();
  const { user } = useAuth();

  const columns = [
    {
      Header: "ID",
      accessor: "portalId",

      Cell: ({ value }) => (
        <Flex gap={2} wrap={"wrap"} flexShrink={1}>
          <Text as={"p"} color={"neutral.700"} fontWeight={"bold"}>
            {value}
          </Text>
        </Flex>
      ),
    },
    {
      Header: "Role Name",
      accessor: "name",
    },
    {
      Header: "Priviledges",
      accessor: "priviledges",
      Cell: ({ value }) => (
        <Flex gap={2} overflowX={"hidden"} wrap={"wrap"}>
          {value?.map((priviledge, index) => (
            <Tag
              flexShrink={0}
              size="sm"
              key={index}
              variant="outline"
              fontWeight={"semibold"}
              colorScheme="orange"
            >
              {priviledge}
            </Tag>
          ))}
        </Flex>
      ),
    },

    {
      Header: "Staff",
      accessor: "staff",
      Cell: ({ row }) => (
        <Flex gap={2} overflowX={"hidden"} wrap={"wrap"}>
          {staffData
            .filter((staff) => staff.roles.includes(row.original.name))
            ?.map((staff, index) => (
              <Tag
                flexShrink={0}
                size="sm"
                key={index}
                variant="outline"
                fontWeight={"semibold"}
                colorScheme="blue"
              >
                {staff.firstName}
              </Tag>
            ))}
        </Flex>
      ),
    },

    {
      Header: "Action",
      accessor: "action",
    },
  ];

  const handleDeleteAction = (staffId) => {
    if (user.id === staffId) {
      // Prevent staff from deleting themselves
      toast({
        title: "You cannot delete yourself.",
        status: "warning",
      });
    } else if (
      window.confirm(`Are you sure to delete the staff with ID ${staffId}?`)
    ) {
      // Filter the staff member with the specified staffId and update the state
      const newStaffData = staffData.filter((staff) => staff.id !== staffId);
      setStaffData(newStaffData);

      // Show a toast notification
      toast({
        title: `Deleted staff with ID ${staffId}`,
        duration: 2000,
        status: "warning",
      });

      // Update localStorage
      localStorage.setItem("staffData", JSON.stringify(newStaffData));
    }
  };

  const handleLink = (staffId) => {
    navigate(`/admin/staff/${staffId}`);
  };

  return (
    <Table
      columns={columns}
      data={schoolData.staffRoles}
      fullWidthColumns={["Priviledges", "Staff"]}
    />
  );
};

export default AllStaffRolesTable;
