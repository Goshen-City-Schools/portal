import { useNavigate } from "react-router-dom";

import schoolData from "../../data/school.data";

import { useAuth } from "../../app/contexts/AuthContext";

import useStaffs from "../../hooks/useStaffs";

import Table from "../../widgets/Table.widget";

import { Flex, useToast, Text, Tag } from "@chakra-ui/react";

export default function AllFeesTable() {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { staffsData: staffData } = useStaffs();

  console.log(staffData);

  const columns = [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => (
        <Flex gap={2} wrap={"wrap"} flexShrink={1}>
          <Text as={"p"} color={"neutral.700"} fontWeight={"bold"}>
            {Number(row.id) + 1}
          </Text>
        </Flex>
      ),
    },
    {
      Header: "Fee Type",
      accessor: "name",
    },
    {
      Header: "Classes",
      accessor: "schoolClass",
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
      Header: "Student Type",
      accessor: "schoolClass",
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
}
