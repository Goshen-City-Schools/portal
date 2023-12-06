import React from "react";

import { RowId } from "./shared";

import { DataTable, ActionsPopUp } from "../../../widgets";

import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const ClassResultTable = ({ data, studentsData }) => {
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
      Header: "Student",
      accessor: "student",
    },
    {
      Header: "CA (40)",
      accessor: "testScore",
    },
    {
      Header: "Exam (60)",
      accessor: "examScore",
    },
    {
      Header: "Grade",
      accessor: "grade",
      Cell: ({ row }) => (
        <Text>
          {[row.original.testScore, row.original.examScore].reduce(
            (total, amount) => total + amount,
            0
          )}
        </Text>
      ),
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

export default ClassResultTable;
