import React from "react";

import RowId from "./shared/RowId";
import ActionsPopUp from "../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { DataTable } from "../../../widgets";

const AllResultsTable = ({ data, studentsData }) => {
  const actionsMenu = (id) => [
    {
      name: "viewClass",
      label: "View Class",
      icon: <IoMdEye />,
      action: "view",
    },
    {
      name: "editClass",
      label: "Edit Class",
      icon: <MdEdit />,
      action: "edit",
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: "sn",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Classes",
      accessor: "class",
    },
    {
      Header: "Total Subjects",
      accessor: "totalSubjects",
    },
    {
      Header: "Upload Status",
      accessor: "status",
    },

    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => <ActionsPopUp menu={actionsMenu(row.original.id)} />,
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ? data : []}
        fullWidthColumns={["SubClasses"]}
      />
    </div>
  );
};

export default AllResultsTable;
