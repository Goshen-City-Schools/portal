import React, { useState } from "react";
import Table from "../../widgets/Table.widget";
import { Flex, Tooltip, useToast } from "@chakra-ui/react";
import IconComponent from "../Icon.component";
import { MdDeleteOutline, MdLink } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUser } from "../../app/contexts/UserContext";

import { Text } from "@chakra-ui/react";

const AllStaffTable = () => {
  const toast = useToast();
  const existingStaffData = useLocalStorage("staffData").getItem();
  const navigate = useNavigate();
  const { user } = useUser();
  const [staffData, setStaffData] = useState(existingStaffData);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Cell: ({ value }) => (
        <Flex gap={2}>
          <Text as={"p"} fontWeight={"bold"}>
            {value}
          </Text>
        </Flex>
      ),
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Staff Role",
      accessor: "role",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <Flex gap={2}>
          {user.id !== row.original.id && ( // Check if the logged-in staff is not the one being deleted
            <Tooltip label="Delete" hasArrow>
              <IconComponent
                click={() => handleDeleteAction(row.original.id)}
                className="text-red-600 cursor-pointer hover:scale-110 transition duration-300"
              >
                <MdDeleteOutline size={20} />
              </IconComponent>
            </Tooltip>
          )}

          <Tooltip label="Edit" hasArrow>
            <IconComponent
              className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
              click={() => handleLink(row.original.id)}
            >
              <MdLink size={18} />
            </IconComponent>
          </Tooltip>
        </Flex>
      ),
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
      useLocalStorage("staffData").setItem(newStaffData);
    }
  };

  const handleLink = (staffId) => {
    navigate(`/admin/staff/${staffId}`);
  };

  return (
    <Table
      columns={columns}
      data={staffData}
      fullWidthColumns={["Full Name", "Parent"]}
    />
  );
};

export default AllStaffTable;
