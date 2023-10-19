import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import ResultSheet from "../../../components/ResultSheet";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import {
  MdAdd,
  MdDownload,
  MdIcecream,
  MdPrint,
  MdUploadFile,
} from "react-icons/md";

export default function ResultPage() {
  const handlePrint = () => {
    window.print();
  };

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
      <PageSectionHeader
        pageTitle={"Results"}
        pageCrumb={"Home / Results / View Result"}
      />

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
