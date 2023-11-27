import React from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import ActionsPopUp from "../../widgets/ActionsPopUp";

import Table from "../../widgets/Table.widget";
import RowId from "./shared/RowId";
import StatusBadge from "./shared/StatusBadge";

export default function AllEventsTable({ events }) {
  const actionsMenu = [
    {
      name: "editEvent",
      label: "Edit Event",
      icon: <MdEdit />,
    },
    {
      name: "deleteEvent",
      label: "Delete Event",
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
      Header: "Event Name",
      accessor: "eventName",
    },
    {
      Header: "Event Description",
      accessor: "eventDescription",
    },
    {
      Header: "Date",
      accessor: "eventDate",
    },
    {
      Header: "Time",
      accessor: "eventTime",
    },
    {
      Header: "Frequency",
      accessor: "eventFrequency",
    },
    {
      Header: "Status",
      accessor: "eventStatus",
      Cell: ({ value }) => <StatusBadge value={value} />,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({}) => <ActionsPopUp menu={actionsMenu()} />,
    },
  ];

  if (!events) return "No event set currently!";

  return (
    <Table
      columns={columns}
      data={events}
      fullWidthColumns={"Event Description"}
    />
  );
}
