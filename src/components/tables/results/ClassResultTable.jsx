import React from "react";

import ActionsPopUp from "../../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { DataTable } from "../../../widgets";
import RowId from "../shared/RowId";

import { Text } from "@chakra-ui/react";
import { assignGrade } from "../../../utilities/assignGrade";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PrintHeader from "../../Header/PrintHeader";

const ClassResultTable = ({ data }) => {
  const navigate = useNavigate();

  const { schoolClass } = useParams();

  const handleViewProfile = (studentId) => {
    navigate(`/admin/results/${schoolClass}/${studentId}`);
  };

  const actionsMenu = (id) => [
    {
      name: "viewResultSheet",
      label: "View Result Sheet",
      icon: <IoMdEye />,
      action: "view",
      onClick: () => handleViewProfile(id),
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
      Cell: ({ value }) => {
        return <Text>GSHN/STU/{value?.studentId}</Text>;
      },
    },
    {
      Header: "Full name",
      accessor: "first_name",
      Cell: ({ row }) => (
        <Text as={"p"} textTransform={"capitalize"}>
          {row.original?.student?.first_name} {row.original?.student?.last_name}
          {row.original?.student?.other_name}
        </Text>
      ),
    },
    {
      Header: "CA 1",
      accessor: "test1",
    },
    {
      Header: "CA 2",
      accessor: "test2",
    },
    {
      Header: "Exams",
      accessor: "exam",
    },
    {
      Header: "Total",
      accessor: "total",
      Cell: ({ row }) =>
        Number(row?.original.test1) +
        Number(row?.original.test1) +
        Number(row?.original.exam),
    },
    {
      Header: "Grade",
      accessor: "grade",
      Cell: ({ row }) =>
        assignGrade(
          Number(row?.original.test1) +
            Number(row?.original.test1) +
            Number(row?.original.exam)
        ),
    },
    {
      Header: "Remark",
      accessor: "remark",
    },

    {
      Header: "Action",
      headerClassName: "no-print",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="no-print">
          <ActionsPopUp menu={actionsMenu(row.original.student.studentId)} />
        </div>
      ),
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
