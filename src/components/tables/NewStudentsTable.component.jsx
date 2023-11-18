import React from "react";
import Table from "../../widgets/Table.widget";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import dayjs from "dayjs";
// import Table from "./Table";

const columns = [
  {
    Header: "Student ID",
    accessor: "id",
    width: "max-content", // Set the width to max content
  },
  {
    Header: "First name",
    accessor: "firstName",
    width: "100%", // Set the width to 100% to stretch
    mobileHidden: true,
  },
  {
    Header: "Last name",
    accessor: "lastName",
    width: "100%", // Set the width to 100% to stretch
    mobileHidden: true,
  },
  {
    Header: "Class",
    accessor: "class",
    width: "max-content",
  },
  {
    Header: "Registration Date",
    accessor: "regDate",
    width: "max-content",
    Cell: ({ value }) => <>{dayjs(value).format("dddd, d MMM YYYY")} </>,
  },
];

const NewStudentsTable = () => {
  const existingStudnets = useLocalStorage("studentsData").getItem();

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
