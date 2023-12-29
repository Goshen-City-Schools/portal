import React from "react";

import { MdEdit } from "react-icons/md";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import Table from "../../../widgets/Table.widget";
import RowId from "../shared/RowId";
import { IoMdEye } from "react-icons/io";
import { useFees } from "../../../hooks";
import StatusBadge from "../shared/StatusBadge";
import { useModal } from "../../../app/contexts/ModalContext";
import BoardingFeeForm from "../../forms/fees/BoardingFeeForm";
import PriceView from "../shared/PriceView";

export default function BoardingFeeTable() {
  const { fees } = useFees("boarding");
  const { openPortal } = useModal();

  const handleEditAction = async (id) => {
    openPortal(<BoardingFeeForm feeTypeId={id} action="edit" />);
  };

  const handleDisableFee = (id) => {
    return;
  };

  const actionsMenu = (id) => [
    {
      name: "editBoardingFee",
      label: "Edit Fee",
      icon: <MdEdit />,
      onClick: () => handleEditAction(id),
    },
    {
      name: "disableBoardingFee",
      label: "Disable Fee",
      icon: <IoMdEye />,
      onClick: () => handleDisableFee(id),
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

  if (!fees) return "No boarding fee set currently!";

  return <Table columns={columns} data={fees} fullWidthColumns={"Class"} />;
}
