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
    Header: "S/N",
    accessor: "sn",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Fee Type",
    accessor: "feeType",
  },
  {
    Header: "Amount NGN",
    accessor: "amountNGN",
  },
  {
    Header: "Invoice ID",
    accessor: "invoiceId",
  },
  {
    Header: "Payment Type",
    accessor: "paymentType",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ cell: { value } }) => (
      <Badge colorScheme={value === "Paid" ? "green" : "red"} variant="subtle">
        {value}
      </Badge>
    ),
  },
  {
    Header: "Date",
    accessor: "date",
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
    name: "John Doe",
    feeType: "Tuition",
    amountNGN: 50000,
    invoiceId: "INV123",
    paymentType: "Online",
    status: "Paid",
    date: "2023-03-15",
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
    name: "Jane Smith",
    feeType: "Library",
    amountNGN: 2000,
    invoiceId: "INV124",
    paymentType: "Cash",
    status: "Unpaid",
    date: "2023-03-16",
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

const TransactionsTable = () => {
  return (
    <Box>
      <DataTable columns={columns} data={data} fullWidthColumns={["Name"]} />
    </Box>
  );
};

export default TransactionsTable;
