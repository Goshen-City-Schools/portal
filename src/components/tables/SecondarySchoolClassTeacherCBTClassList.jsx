import React from "react";
import DataTable from "../../widgets/Table.widget";
// import ReusableBadge from "./ReusableBadge";
import dayjs from "dayjs";
import ReusableBadge from "../ReusableBadge";

import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";

const ClassSubjectExamData = [
  {
    teacherName: "John Smith",
    subject: "Math",
    numberOfStudents: 25,
    examDate: dayjs("2023-10-25").format("YYYY-MM-DD"),
    approvalStatus: "Approved",
    id: "1", // Unique identifier
  },
  {
    teacherName: "Alice Johnson",
    subject: "Science",
    numberOfStudents: 30,
    examDate: dayjs("2023-11-02").format("YYYY-MM-DD"),
    approvalStatus: "Pending",
    id: "2", // Unique identifier
  },
  // Add more data as needed
  {
    teacherName: "Robert Brown",
    subject: "History",
    numberOfStudents: 20,
    examDate: dayjs("2023-11-15").format("YYYY-MM-DD"),
    approvalStatus: "Not Approved",
    id: "3", // Unique identifier
  },
];

const columns = [
  {
    Header: "Subject",
    accessor: "subject",
  },
  {
    Header: "Teacher",
    accessor: "teacherName",
  },
  {
    Header: "No. of Students",
    accessor: "numberOfStudents",
  },
  {
    Header: "Exam Date",
    accessor: "examDate",
    Cell: ({ value }) => dayjs(value).format("YYYY-MM-DD"),
  },
  {
    Header: "Approval Status",
    accessor: "approvalStatus",
    Cell: ({ value }) => (
      <ReusableBadge
        colorScheme={getApprovalStatusColorScheme(value)}
        variant={getApprovalStatusVariant(value)}
      >
        {value}
      </ReusableBadge>
    ),
  },
  {
    Header: "Actions",
    accessor: "id", // Replace 'id' with the actual unique identifier of each row
    Cell: ({ value }) => (
      <Popover>
        <PopoverTrigger>
          <Button size={"sm"}>Actions</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Choose an Action</PopoverHeader>
          <PopoverBody>
            <Button size={"sm"} onClick={() => handleEdit(value)}>
              Edit
            </Button>
            <Button size={"sm"} onClick={() => handleDelete(value)}>
              Delete
            </Button>
          </PopoverBody>
          <PopoverFooter>
            <Button
              size={"sm"}
              variant="outline"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    ),
  },
];

const getApprovalStatusColorScheme = (status) => {
  return status === "Approved" ? "green" : "red";
};

const getApprovalStatusVariant = (status) => {
  return status === "Approved" ? "solid" : "outline";
};

function SecondarySchoolClassTeacherCBTList() {
  // Define functions for handling edit and delete actions
  const handleEdit = (id) => {
    // Implement edit action logic
    console.log(`Edit action for ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete action logic
    console.log(`Delete action for ID: ${id}`);
  };

  return (
    <div>
      <h1>Secondary School Subject Teacher CBT Table</h1>

      <Box p={4} bg={"white"} rounded={"md"}>
        <DataTable data={ClassSubjectExamData} columns={columns} />
      </Box>
    </div>
  );
}

export default SecondarySchoolClassTeacherCBTList;
