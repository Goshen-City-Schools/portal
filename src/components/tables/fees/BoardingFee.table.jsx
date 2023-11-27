import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import Table from "../../../widgets/Table.widget";
import RowId from "../shared/RowId";
import { IoMdEye } from "react-icons/io";
import useFees from "../../../hooks/Fees";
import StatusBadge from "../shared/StatusBadge";

export default function BoardingFeeTable() {
  const { fees } = useFees("boarding");

  console.log(fees);
  const actionsMenu = [
    {
      name: "editBoardingFee",
      label: "Edit Fee",
      icon: <MdEdit />,
    },
    {
      name: "disableBoardingFee",
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
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Amount",
      accessor: "price",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <StatusBadge value={value} />,
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
