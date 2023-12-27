import React from "react";
import { Link } from "react-router-dom";

export default function StudentUserResultTable({ data }) {
  const columns = [
    {
      Header: "Session",
      accessor: "session",
    },
    {
      Header: "Class",
      accessor: "class",
    },
    {
      Header: "Term",
      accessor: "term",
    },
    {
      Header: "",
      accessor: "action",
      Cell: ({ row }) => (
        <Link
          to={`/results?session=${row.original.session}&term=${row.original.term}`}
        />
      ),
    },

    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => <ActionsPopUp menu={actionsMenu(row.original.id)} />,
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
