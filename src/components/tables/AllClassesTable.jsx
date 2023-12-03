import React from "react";
import Table from "../../widgets/Table.widget";

import { Flex, Text, Tag, Button } from "@chakra-ui/react";
import { getNumberOfStudentsInClass } from "../../pages/admin/classes/Index.page";
import { FaEllipsisH } from "react-icons/fa";
import RowId from "./shared/RowId";
import ActionsPopUp from "../../widgets/ActionsPopUp";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";

const AllClassesTable = ({ data, studentsData }) => {
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
      Cell: <ActionsPopUp menu={actionsMenu()} />,
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
