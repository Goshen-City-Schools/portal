import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import { Grid, Text } from "@chakra-ui/react";

import Table from "../../../widgets/Table.widget";
import RowId from "../shared/RowId";
import { useFees } from "../../../hooks";
import StatusBadge from "../shared/StatusBadge";
import { useModal } from "../../../app/contexts/ModalContext";
import BoardingFeeForm from "../../forms/fees/BoardingFeeForm";
import PriceView from "../shared/PriceView";

export default function BoardingFeeTable({ session, term, feeType }) {
  const { fees } = useFees(feeType, session, term);
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
      icon: <MdDelete />,
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

  if (!fees)
    return (
      <Grid textAlign={"center"}>
        <Text as={"h2"}>
          No boarding fee set for ${term} in ${session} session!
        </Text>
      </Grid>
    );

  return <Table columns={columns} data={fees} fullWidthColumns={"Class"} />;
}
