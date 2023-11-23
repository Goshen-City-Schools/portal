import React from "react";
import Table from "../../widgets/Table.widget";

import { Flex, Text, Tag } from "@chakra-ui/react";
import { getNumberOfStudentsInClass } from "../../pages/admin/classes/Index.page";

const AllClassesTable = ({ data, studentsData }) => {
  const numberOfStudentsInClass = (className) => {
    return getNumberOfStudentsInClass(studentsData, className);
  };

  const columns = [
    {
      Header: "SN",
      accessor: "sn",
      Cell: ({ row }) => (
        <Flex gap={2} wrap={"wrap"} flexShrink={1}>
          <Text as={"p"} color={"neutral.700"} fontWeight={"bold"}>
            {Number(row.id) + 1}
          </Text>
        </Flex>
      ),
    },
    {
      Header: "Classes",
      accessor: "name",
    },
    {
      Header: "Sub Classes",
      accessor: "subClasses",
      Cell: ({ cell }) => (
        <Flex gap={2} wrap={"wrap"} flexShrink={1}>
          {cell.value?.map((subclass, index) => (
            <Tag
              colorScheme={subclass.color}
              color={"neutral.700"}
              fontWeight={"bold"}
            >
              {subclass.name}
            </Tag>
          ))}
        </Flex>
      ),
    },
    {
      Header: "No. of Students",
      accessor: "value",
      Cell: ({ row }) => (
        <Text
          as={"p"}
          fontSize={"lg"}
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
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data ? data : []}
        fullWidthColumns={["Sub Classes"]}
      />
    </div>
  );
};

export default AllClassesTable;
