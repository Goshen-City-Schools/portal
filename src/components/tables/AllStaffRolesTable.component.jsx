import React from "react";
import { useNavigate } from "react-router-dom";

import schoolData from "../../data/school.data";

import { useAuth } from "../../app/contexts/AuthContext";

import { useStaffs } from "../../hooks";

import Table from "../../widgets/Table.widget";

import { Flex, useToast, Text, Tag } from "@chakra-ui/react";
import { RowId, TagInTable } from "./shared";

const AllStaffRolesTable = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { staffsData: staffData } = useStaffs();

  console.log(staffData);

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
          {staffData
            .filter((staff) => staff.roles.includes(row.original.name))
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
