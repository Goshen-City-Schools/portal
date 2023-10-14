import React from "react";
import Table from "../../widgets/Table.widget";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  List,
  ListItem,
} from "@chakra-ui/react";

const columns = [
  {
    Header: "S/N",
    accessor: "sn",
  },
  {
    Header: "Staff ID",
    accessor: "staffId",
  },
  {
    Header: "Full Name",
    accessor: "fullName",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Staff Role",
    accessor: "staff_role",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => (
      <Popover>
        <PopoverTrigger>
          <Button variant="link">{row.original.action.buttonLabel}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <List spacing={2}>
              {row.original.action.options.map((option, index) => (
                <ListItem key={index}>
                  <Button
                    variant="link"
                    onClick={() => handleOptionClick(option.action)}
                  >
                    {option.label}
                  </Button>
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    ),
  },
];

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
  return (
    <div>
      <Table
        columns={columns}
        data={data}
        fullWidthColumns={["Full Name", "Parent"]}
      />
    </div>
  );
};

export default AllStaffTable;
