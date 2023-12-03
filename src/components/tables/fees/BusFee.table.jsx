import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import Table from "../../../widgets/Table.widget";
import RowId from "../shared/RowId";
import { IoMdEye } from "react-icons/io";
import useFees from "../../../hooks/Fees";
import StatusBadge from "../shared/StatusBadge";
import PriceView from "../shared/PriceView";
import BusFeeForm from "../../forms/fees/BusFeeForm";

export default function BusFeeTable() {
  const { fees } = useFees("bus");

  const handleEditAction = async (id) => {
    openPortal(<BusFeeForm feeTypeId={id} />);
  };

  const handleDisableFee = (id) => {
    return;
  };

  const actionsMenu = (id) => [
    {
      name: "editBusFee",
      label: "Edit Fee",
      icon: <MdEdit />,
      onClick: () => {
        handleEditAction(id);
      },
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
      accessor: "destination",
    },
    {
      Header: "To School",
      accessor: "price.to",
      Cell: ({ value }) => <PriceView value={value} />,
    },
    {
      Header: "From School",
      accessor: "price.from",
      Cell: ({ value }) => <PriceView value={value} />,
    },

    {
      Header: "To & Fro",
      accessor: "price.toFrom",
      Cell: ({ value }) => <PriceView value={value} />,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <StatusBadge value={value} />,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => <ActionsPopUp menu={actionsMenu(row.original._id)} />,
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
