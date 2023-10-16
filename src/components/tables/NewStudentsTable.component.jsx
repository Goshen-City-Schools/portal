import React from "react";
import Table from "../../widgets/Table.widget";
// import Table from "./Table";

const columns = [
  {
    Header: "S/N",
    accessor: "sn",
    width: "50px", // Set the width of this column
    mobileHidden: true,
  },
  {
    Header: "Student ID",
    accessor: "studentId",
    width: "max-content", // Set the width to max content
  },
  {
    Header: "Full Name",
    accessor: "fullName",
    width: "100%", // Set the width to 100% to stretch
    mobileHidden: true,
  },
  {
    Header: "Gender",
    accessor: "gender",
    width: "max-content",
    mobileHidden: true,
  },
  {
    Header: "Class",
    accessor: "class",
    width: "max-content",
  },
  {
    Header: "Date",
    accessor: "date",
    width: "max-content",
  },
];

const data = [
  {
    sn: 1,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 2,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  {
    sn: 3,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 4,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  {
    sn: 5,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 6,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  {
    sn: 7,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 8,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  {
    sn: 9,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 10,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  {
    sn: 11,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 12,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  {
    sn: 13,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 14,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  {
    sn: 15,
    studentId: "GSHN/STU/1243",
    fullName: "John Doe",
    gender: "Male",
    class: "JSS 2",
    date: "2023-10-10",
  },
  {
    sn: 16,
    studentId: "GSHN/STU/4456",
    fullName: "Jane Smith",
    gender: "Female",
    class: "SSS 1",
    date: "2023-10-11",
  },
  // Add more data as needed
];

const NewStudentsTable = () => {
  return (
    <div>
      <Table columns={columns} data={data} fullWidthColumns={["Full Name"]} />
    </div>
  );
};

export default NewStudentsTable;
