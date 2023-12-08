import React from "react";
import { RowId } from "../shared";

export default function StudentTransactionsTable() {
  const actionsMenu = () => [
    {
      name: "viewTransaction",
      label: "View",
      icon: <MdEdit />,
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Purpose",
      accessor: "feeType",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "status",
      accessor: "status",
    },
    {
      Header: "Date Generated",
      accessor: "feeTypes",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({}) => <ActionsPopUp menu={actionsMenu()} />,
    },
  ];

  const bankAccounts = [
    {
      bankName: "Fidelity Bank",
      accountName: "Goshen Group of Schools",
      accountNumber: "8783728378",
      Fees: [""],
      bankAccountStatus: "inactive",
    },
  ];

  if (!bankAccounts) return "No account set currently!";

  return (
    <Table
      columns={columns}
      data={bankAccounts}
      fullWidthColumns={"FeeTypes"}
    />
  );
}
