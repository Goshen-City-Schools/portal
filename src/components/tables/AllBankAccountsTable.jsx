import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../widgets/ActionsPopUp";

import Table from "../../widgets/Table.widget";
import RowId from "./shared/RowId";

export default function AllBankAccountsTable() {
  const actionsMenu = [
    {
      name: "editBankDetails",
      label: "Edit Details",
      icon: <MdEdit />,
    },
    {
      name: "deleteBankAccount",
      label: "Delete Bank",
      icon: <MdDelete />,
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Bank",
      accessor: "bankName",
    },
    {
      Header: "Account Number",
      accessor: "accountNumber",
    },
    {
      Header: "Account Name",
      accessor: "accountName",
    },
    {
      Header: "FeeTypes",
      accessor: "feeTypes",
    },
    {
      Header: "Status",
      accessor: "bankAccountStatus",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({}) => <ActionsPopUp menu={actionsMenu} />,
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
