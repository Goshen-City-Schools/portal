import React from "react";
import {
  Box,
  Badge,
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
import DataTable from "../../widgets/Table.widget";
// import DataTable from "./DataTable"; // Assuming you have a DataTable component

const columns = [
  {
    Header: "SN",
    accessor: "sn",
  },
  {
    Header: "name",
    accessor: "fullName",
  },
  {
    Header: "Invoice ID",
    accessor: "invoiceID",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
    // Render the "Status" column using a Badge
    Cell: ({ cell: { value } }) => (
      <Badge
        colorScheme={value.toLocaleLowerCase() === "paid" ? "green" : "red"}
        variant="subtle"
      >
        {value}
      </Badge>
    ),
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
    studentId: "12345",
    invoiceID: "12345",
    fullName: "John Doe",
    role: "Student",
    class: "Grade 8",
    feeType: "Tuition",
    status: "Unpaid",
    amount: 0,
    balance: 5000,
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
    studentId: "54321",
    fullName: "Jane Smith",
    class: "Grade 9",
    feeType: "Library",
    status: "UNPAID",
    amount: 2000,
    balance: 2000,
    action: {
      buttonLabel: "Options",
      options: [
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ],
    },
  },
  {
    sn: 3,
    studentId: "98765",
    fullName: "Alice Johnson",
    class: "Grade 7",
    feeType: "Books",
    status: "PAID",
    amount: 1500,
    balance: 0,
    action: {
      buttonLabel: "Options",
      options: [
        { label: "Edit", action: "edit" },
        { label: "Delete", action: "delete" },
      ],
    },
  },
  // Add more data objects as needed
];

const StudentsTuitionFeeTable = () => {
  return (
    <Box>
      <DataTable
        columns={columns}
        data={data}
        // fullWidthColumns={["Transaction ID", "name"]}
      />
    </Box>
  );
};

export default StudentsTuitionFeeTable;
