import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import Table from "../../../widgets/Table.widget";
import RowId from "../shared/RowId";
import { IoMdEye } from "react-icons/io";
import useFees from "../../../hooks/Fees";

export default function TuitionFeeTable() {
  const fees = useFees("tuition");

  console.log(fees);
  const actionsMenu = [
    {
      name: "editTuitionFee",
      label: "Edit Fee",
      icon: <MdEdit />,
    },
    {
      name: "disableTuitionFee",
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
      Header: "Class",
      accessor: "classId",
    },
    {
      Header: "New Student",
      accessor: "price.new",
    },
    {
      Header: "Existing Student",
      accessor: "price.existing",
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
