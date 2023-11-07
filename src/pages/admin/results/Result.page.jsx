import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import ResultSheet, { ResultSheetPDF } from "../../../components/ResultSheet";

import { Flex, Button } from "@chakra-ui/react";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import { MdDownload, MdPrint } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function ResultSinglePage() {
  const handlePrint = () => {
    window.print();
  };

  const { session, term, userId } = useParams();

  // Replace this with your logic to fetch and display the result data
  const resultData = {
    // Sample data for demonstration
    session,
    term,
    userId,
    // Add more result-related data here
  };

  const studentData = {
    name: "John Doe",
    rollNumber: "1234",
    age: 11, // Replace with the actual total score
    class: "JSS 2A", // Replace with the actual total score
    remarks: "Excellent", // Replace with the actual remarks
  };

  const subjectData = [
    { name: "Mathematics", examScore: 49, testScore: 18, grade: "A" },
    { name: "Science", examScore: 56, testScore: 21, grade: "A" },
    { name: "History", examScore: 45, testScore: 17, grade: "B" },
    { name: "English", examScore: 65, testScore: 29, grade: "A" },
    // Add more subjects as needed
  ];

  return (
    <PageWrapper overflowX={"scroll"}>
      <div className="no-print">
        <PageSectionHeader
          pageTitle={"Results"}
          pageCrumb={"Home / Results / View Result"}
        />
      </div>

      <Flex
        gap={4}
        fontSize={"sm"}
        py={6}
        justifyContent={"flex-end"}
        className="no-print"
      >
        <Button
          as={"Flex"}
          gap={2}
          size={"sm"}
          bg={"accent.700"}
          color={"white"}
        >
          <IconComponent>
            <MdDownload />
          </IconComponent>{" "}
          Download Result Sheet
        </Button>

        <Button
          bg={"brand.700"}
          size={"sm"}
          color={"neutral.100"}
          onClick={handlePrint}
        >
          <IconComponent>
            <MdPrint />
          </IconComponent>
          Print Result
        </Button>
      </Flex>

      <ResultSheet studentData={studentData} subjectData={subjectData} />
    </PageWrapper>
  );
}
