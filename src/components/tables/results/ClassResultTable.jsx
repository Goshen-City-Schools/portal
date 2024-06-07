import React from "react";

import ActionsPopUp from "../../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { DataTable } from "../../../widgets";
import RowId from "../shared/RowId";
import { useResults } from "../../../hooks/Results";
import { useState } from "react";

import { Text } from "@chakra-ui/react";

const ClassResultTable = ({ data }) => {
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
      accessor: "subject",
      Cell: ({ value }) => {
        console.log(value);
        return <Text>{value?.name}</Text>;
      },
    },
    {
      Header: "Full name",
      accessor: "fullname",
    },
    {
      Header: "CA",
      accessor: "ca",
    },
    {
      Header: "Exams",
      accessor: "exams",
    },
    {
      Header: "Total",
      accessor: "total",
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
