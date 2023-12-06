import React from "react";

import { Flex, Text, Tag } from "@chakra-ui/react";
import { getNumberOfStudentsInClass } from "../../pages/admin/classes/Index.page";
import RowId from "./shared/RowId";
import ActionsPopUp from "../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { DataTable } from "../../../widgets";
// import DataTable from "../../../widgets/Table.widget";

const StudentResultTable = ({ data, studentsData }) => {
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
      accessor: "CAScore",
    },
    {
      Header: "Exam (60)",
      accessor: "ExamScore",
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

export default StudentResultTable;
