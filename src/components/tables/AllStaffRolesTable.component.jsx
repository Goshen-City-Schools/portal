import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../app/contexts/AuthContext";

import { useStaffRoles, useStaffs } from "../../hooks";

import Table from "../../widgets/Table.widget";

import { Flex, useToast, Text, Tag } from "@chakra-ui/react";
import { RowId, TagInTable } from "./shared";

const AllStaffRolesTable = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { staffRolesData: staffRoles } = useStaffRoles();

  const { staffsData: staffData } = useStaffs();

  console.log(staffData, staffRoles);

  const columns = [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
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
            <TagInTable
              key={index}
              label={priviledge}
              variant={"outline"}
              colorScheme={"orange"}
            />
          ))}
        </Flex>
      ),
    },

    {
      Header: "Staff",
      accessor: "staff",
      Cell: ({ row }) => (
        <Flex gap={2} overflowX={"hidden"} wrap={"wrap"}>
          {console.log(row)}
          {staffData
            .filter((staff) =>
              staff.roles.map((role) => role.name === row.original.name)
            )
            ?.map((staff, index) => (
              <TagInTable
                label={staff.firstName}
                colorScheme={"blue"}
                variant={"outline"}
                key={index}
              />
            ))}
        </Flex>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={staffRoles}
      fullWidthColumns={["Priviledges", "Staff"]}
    />
  );
};

export default AllStaffRolesTable;
