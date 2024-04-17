import React from "react";
import Table from "../../widgets/Table.widget";

import { Flex, Text, Tag } from "@chakra-ui/react";
import { getNumberOfStudentsInClass } from "../../pages/admin/configs/classes/Index.page";
import RowId from "./shared/RowId";
import ActionsPopUp from "../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AllClassesTable = ({ data, studentsData }) => {
  const navigate = useNavigate();
  const handleViewClass = (classId) => {
    navigate(`/admin/config/classes/${classId}`);
  };

  const handleEditAction = (studentId) => {
    navigate(`/admin/students/${studentId}/edit`);
  };
  const actionsMenu = (id) => [
    {
      name: "viewClass",
      label: "View Class",
      icon: <IoMdEye />,
      onClick: () => handleViewClass(id),
      action: "view",
    },
    {
      name: "editClass",
      label: "Edit Class",
      icon: <MdEdit />,
      onClick: () => handleViewClass(id),
      action: "edit",
    },
  ];

  const numberOfStudentsInClass = (classId) => {
    return getNumberOfStudentsInClass(studentsData, classId);
  };

  const columns = [
    {
      Header: "SN",
      accessor: "sn",
      Cell: ({ row }) => <RowId row={row} />,
    },
    {
      Header: "Classes",
      accessor: "name",
      Cell: ({ value, row }) => (
        <Flex gap={2} wrap={"wrap"} flexShrink={1}>
          <Tag
            colorScheme={value?.color}
            color={"neutral.700"}
            fontWeight={"bold"}
            textTransform={"capitalize"}
            size={"sm"}
          >
            {row.original.schoolClass.name} {value}
          </Tag>
        </Flex>
      ),
    },

    {
      Header: "Class Teacher",
      accessor: "classTeacher",
      Cell: ({ value }) => (
        <Text
          as={"p"}
          fontSize={"sm"}
          color={"neutral.700"}
          fontWeight={"bold"}
        >
          {numberOfStudentsInClass(value)}
        </Text>
      ),
    },
    {
      Header: "Subjects",
      accessor: "subjects",
      Cell: ({ value }) => (
        <Text
          as={"p"}
          fontSize={"sm"}
          color={"neutral.700"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          {value}
        </Text>
      ),
    },
    {
      Header: "No. of Students",
      accessor: "id",
      Cell: ({ value }) => (
        <Text
          as={"p"}
          fontSize={"sm"}
          color={"neutral.700"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          {numberOfStudentsInClass(value)}
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
      <Table
        columns={columns}
        data={data ? data : []}
        fullWidthColumns={["Classes"]}
      />
    </div>
  );
};

export default AllClassesTable;
