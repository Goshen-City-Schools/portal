import React from "react";
import { Box, Badge } from "@chakra-ui/react";
import DataTable from "../../widgets/Table.widget";

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
    Header: "Invoice Date",
    accessor: "invoiceDate",
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
    Header: "Payment Date",
    accessor: "paidOn",
    Cell: ({ cell: { value } }) =>
      value ? (
        <Badge colorScheme="facebook" variant="subtle">
          {value}
        </Badge>
      ) : (
        "-- -- --"
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
    invoiceDate: "2023-03-15",
    paidOn: "2023-03-15",
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
    invoiceDate: "2023-03-15",
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
