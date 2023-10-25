import React from "react";
import DataTable from "../../widgets/Table.widget";
// import DataTable from "./DataTable"÷; // Assuming you have the DataTable component

const SubjectTable = () => {
  // Define the columns for the SubjectTable
  const columns = React.useMemo(
    () => [
      {
        Header: "S/N", // Serial Number
        accessor: "serialNumber",
      },
      {
        Header: "Subject Name",
        accessor: "subjectName",
      },
      {
        Header: "No. of Students",
        accessor: "numberOfStudents",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Subject Teacher",
        accessor: "subjectTeacher",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  // Define sample data for the SubjectTable
  const data = React.useMemo(() => [
    {
      serialNumber: 1,
      subjectName: "Mathematics",
      numberOfStudents: 30,
      department: "Science",
      subjectTeacher: "John Doe",
      action: "Edit/Delete",
    },
    {
      serialNumber: 2,
      subjectName: "History",
      numberOfStudents: 25,
      department: "Arts",
      subjectTeacher: "Alice Smith",
      action: "Edit/Delete",
    },
    // Add more data as needed
  ]);

  return (
    <DataTable
      columns={columns}
      data={data}
      fullWidthColumns={["Subject Name"]}
    />
  );
};

export default SubjectTable;
