import React from "react";
import Table from "../../widgets/Table.widget";

import { Flex, Text, Tag, Button } from "@chakra-ui/react";
import { getNumberOfStudentsInClass } from "../../pages/admin/classes/Index.page";
import { FaEllipsisH } from "react-icons/fa";
import RowId from "./shared/RowId";

const AllClassesTable = ({ data, studentsData }) => {
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
      Cell: ({}) => (
        <Button
          ml={0}
          pr={1}
          size={"sm"}
          py={0.2}
          leftIcon={<FaEllipsisH />}
        ></Button>
      ),
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
