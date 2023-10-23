import React from "react";
import dayjs from "dayjs";

import DataTable from "../../widgets/Table.widget";
import ReusableBadge from "../ReusableBadge";
// import TableWidget from './TableWidget';

import { Box } from "@chakra-ui/react";

const subjectTeacherData = [
  {
    subject: "Maths",
    class: "SSS 1",
    numberOfStudents: 48,
    examQuestionAvailability: "Available",
    approvalStatus: "Approved",
    examDate: dayjs("2023-10-25").format("YYYY-MM-DD"), // Format the exam date
  },
  {
    subject: "English",
    class: "SSS 1",
    numberOfStudents: 48,
    examQuestionAvailability: "Not Available",
    approvalStatus: "Pending",
    examDate: dayjs("2023-11-02").format("YYYY-MM-DD"), // Format the exam date
  },
  {
    subject: "Physics",
    class: "SSS 2",
    numberOfStudents: 24,
    examQuestionAvailability: "Available",
    approvalStatus: "Not Approved",
    examDate: dayjs("2023-11-02").format("YYYY-MM-DD"), // Format the exam date
  },
  // Add more data as needed
];

const getAvailabilityColorScheme = (availability) => {
  return availability === "Available" ? "green" : "red";
};

const getAvailabilityVariant = (availability) => {
  return availability === "Available" ? "solid" : "outline";
};

function SubjectTeacherCBTClasslist() {
  return (
    <div>
      <h1>Subject Teacher List</h1>

      <Box p={4} bg={"white"} rounded={"md"}>
        <DataTable
          data={subjectTeacherData}
          columns={[
            {
              Header: "Subject",
              accessor: "subject",
            },
            {
              Header: "Class",
              accessor: "class",
            },
            {
              Header: "No. of Students",
              accessor: "numberOfStudents",
              Cell: ({ row }) => (
                <p
                  className="cursor-pointer "
                  onClick={() => {
                    // Store the student data in the state variable and open the modal
                    setModalData(row.original.students);
                    setIsModalOpen(true);
                  }}
                >
                  {row.values.numberOfStudents}
                </p>
              ),
            },
            {
              Header: "Exam Date",
              accessor: "examDate",
              Cell: ({ value }) => dayjs(value).format("YYYY-MM-DD"), // Format the date
            },
            {
              Header: "Exam Questions",
              accessor: "examQuestionAvailability",
              Cell: ({ value }) => (
                <ReusableBadge
                  colorScheme={getAvailabilityColorScheme(value)}
                  variant={getAvailabilityVariant(value)}
                >
                  {value}
                </ReusableBadge>
              ),
            },
            {
              Header: "Approval Status",
              accessor: "approvalStatus",
              Cell: ({ value }) => (
                <ReusableBadge
                  colorScheme={getStatusColorScheme(value)}
                  variant={getStatusVariant(value)}
                >
                  {value}
                </ReusableBadge>
              ),
            },
          ]}
        />
      </Box>
    </div>
  );
}

export default SubjectTeacherCBTClasslist;
