import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import Table from "../../../widgets/Table.widget";
import RowId from "../shared/RowId";
import { IoMdEye } from "react-icons/io";
import useFees from "../../../hooks/Fees";

export default function BusFeeTable() {
  const { fees } = useFees("bus");

  console.log(fees);
  const actionsMenu = [
    {
      name: "editBusFee",
      label: "Edit Fee",
      icon: <MdEdit />,
    },
    {
      name: "disableBusFee",
      label: "Disable Fee",
      icon: <IoMdEye />,
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "id",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Route",
      accessor: "route",
    },
    {
      Header: "To School",
      accessor: "price.to",
    },
    {
      Header: "From School",
      accessor: "price.from",
    },

    {
      Header: "To & Fro",
      accessor: "price.toFrom",
    },
    {
      Header: "Status",
      accessor: "status",
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

  return <Table columns={columns} data={fees} fullWidthColumns={"Class"} />;
}
