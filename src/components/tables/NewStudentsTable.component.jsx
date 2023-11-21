import Table from "../../widgets/Table.widget";
import dayjs from "dayjs";

import { Text, Flex } from "@chakra-ui/react";

const columns = [
  {
    Header: "Student ID",
    accessor: "portalId",
    width: "max-content", // Set the width to max content
    Cell: ({ value }) => (
      <Flex gap={2}>
        <Text
          as={"p"}
          color={"neutral.700"}
          letterSpacing={0.5}
          textTransform={"uppercase"}
        >
          GSHN/STU/{value}
        </Text>
      </Flex>
    ),
  },
  {
    Header: "Full Name",
    accessor: "firstName",
    Cell: ({ row }) => (
      <Flex gap={2}>
        <Text as={"p"} textTransform={"capitalize"}>
          {row.original.firstName} {row.original.lastName}
        </Text>
      </Flex>
    ),
  },
  {
    Header: "Class",
    accessor: "schoolClass",
    width: "max-content",
  },
  {
    Header: "Registration Date",
    accessor: "regDate",
    width: "max-content",
    Cell: ({ value }) => <>{dayjs(value).format("dddd, d MMM YYYY")} </>,
  },
];

const NewStudentsTable = ({ existingStudnets }) => {
  const data = existingStudnets?.filter(
    (student) => student.studentType === "new"
  );
  return (
    <div>
      {existingStudnets && (
        <Table columns={columns} data={data} fullWidthColumns={["Full Name"]} />
      )}
    </div>
  );
};

export default NewStudentsTable;
