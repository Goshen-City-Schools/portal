import React from "react";

import ActionsPopUp from "../../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { DataTable } from "../../../widgets";
import RowId from "../shared/RowId";

const ClassResultTable = ({ data, studentsData }) => {
  const actionsMenu = (id) => [
    {
      name: "viewResultSheet",
      label: "View Result Sheet",
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
      Header: "Student ID",
      accessor: "student",
    },
    {
      Header: "Full name",
      accessor: "fullname",
    },
    {
      Header: "CA",
      accessor: "caScore",
    },
    {
      Header: "Exam",
      accessor: "examScore",
    },
    {
      Header: "Total",
      accessor: "totalScore",
    },
    {
      Header: "Grade",
      accessor: "grade",
    },
    {
      Header: "Remark",
      accessor: "remark",
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
        fullWidthColumns={["Full name"]}
      />
    </div>
  );
};

export default ClassResultTable;
