import React from "react";
import Table from "../../widgets/Table.widget";

import { Flex, Tooltip, useToast } from "@chakra-ui/react";
import { useState } from "react";
import IconComponent from "../Icon.component";
import { MdDeleteOutline, MdLink, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUser } from "../../app/contexts/UserContext";

const data = [
  {
    sn: 1,
    staffId: "2022001",
    fullName: "John Doe",
    gender: "Male",
    staff_role: "Teacher",
    class: "Class A",
    email: "mary.doe@hotmail.com",
    phone_number: "123-456-7890",
    action: {
      buttonLabel: "Options",
      options: [
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ],
    },
  },
  {
    sn: 2,
    staffId: "2022002",
    fullName: "Jane Smith",
    gender: "Female",
    staff_role: "Teacher",
    class: "Class B",
    email: "alice.smith@outlook.com",
    phone_number: "987-654-3210",
    action: {
      buttonLabel: "Options",
      options: [
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ],
    },
  },
  // Add more data rows here
];

const AllStaffTable = () => {
  const existingStaffData = useLocalStorage("staffData").getItem();
  const navigate = useNavigate();

  const handleLink = (value) => navigate(`/admin/staff/${value}`);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
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
      Cell: ({ row }) => {
        console.log(row);
        return (
          <Flex gap={2}>
            <Tooltip>
              <IconComponent
                click={() => handleDeleteAction(row.original.id)}
                className="text-red-600 cursor-pointer hover:scale-110 transition duration-300"
              >
                <MdDeleteOutline size={20} />
              </IconComponent>
            </Tooltip>

            <IconComponent
              className="text-green-700 cursor-pointer hover:scale-110 transition duration-300"
              click={() => handleLink(row.original.id)}
            >
              <MdLink size={18} />
            </IconComponent>
          </Flex>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        data={existingStaffData}
        fullWidthColumns={["Full Name", "Parent"]}
      />
    </div>
  );
};

export default AllStaffTable;
