import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import ResultSheet from "../../../components/ResultSheet";

import { Text } from "@chakra-ui/react";

export default function ResultPage() {
  const studentData = {
    name: "John Doe",
    rollNumber: "12345",
    totalScore: 450, // Replace with the actual total score
    remarks: "Excellent", // Replace with the actual remarks
  };

  const subjectData = [
    { name: "Mathematics", score: 90, grade: "A" },
    { name: "Science", score: 85, grade: "A" },
    { name: "History", score: 75, grade: "B" },
    { name: "English", score: 95, grade: "A" },
    // Add more subjects as needed
  ];
  return (
    <PageWrapper overflowX={"scroll"}>
      <ResultSheet studentData={studentData} subjectData={subjectData} />
    </PageWrapper>
  );
}
