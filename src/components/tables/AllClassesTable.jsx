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

  const numberOfStudentsInClass = (className) => {
    return getNumberOfStudentsInClass(studentsData, className);
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
    },
    {
      Header: "SubClasses",
      accessor: "subClasses",
      Cell: ({ cell }) => (
        <Flex gap={2} wrap={"wrap"} flexShrink={1}>
          {cell.value?.map((subclass, index) => (
            <Tag
              colorScheme={subclass.color}
              color={"neutral.700"}
              fontWeight={"bold"}
              textTransform={"capitalize"}
              size={"sm"}
            >
              {subclass.name}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      Header: "Students",
      accessor: "value",
      Cell: ({ row }) => (
        <Text
          as={"p"}
          fontSize={"sm"}
          textAlign={"center"}
          color={"neutral.700"}
          fontWeight={"bold"}
        >
          {numberOfStudentsInClass(row?.original._id)}
        </Text>
      ),
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => <ActionsPopUp menu={actionsMenu(row.original._id)} />,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data ? data : []}
        fullWidthColumns={["SubClasses"]}
      />
    </div>
  );
};

export default AllClassesTable;
