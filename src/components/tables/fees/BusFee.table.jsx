import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../../widgets/ActionsPopUp";

import Table from "../../../widgets/Table.widget";
import RowId from "../shared/RowId";
import { useFees } from "../../../hooks";
import StatusBadge from "../shared/StatusBadge";
import PriceView from "../shared/PriceView";
import BusFeeForm from "../../forms/fees/BusFeeForm";
import { useModal } from "../../../app/contexts/ModalContext";

export default function BusFeeTable({ feeType, session, term }) {
  const { fees } = useFees(feeType, session, term);
  const { openPortal } = useModal();

  const handleEditAction = async (id) => {
    openPortal(<BusFeeForm feeTypeId={id} action={"edit"} />);
  };

  const handleDisableFee = (id) => {
    return;
  };

  const actionsMenu = (id) => [
    {
      name: "editBusFee",
      label: "Edit Fee",
      icon: <MdEdit />,
      onClick: () => handleEditAction(id),
    },
    {
      name: "disableBusFee",
      label: "Delete Fee",
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

  if (!fees)
    return (
      <Grid textAlign={"center"}>
        <Text as={"h2"}>
          No bus fee set for ${term} in ${session} session
        </Text>
      </Grid>
    );
  return <Table columns={columns} data={fees} fullWidthColumns={"Class"} />;
}
