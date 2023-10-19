import React from "react";

import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import PrintHeader from "./Header/PrintHeader";

export default function ResultSheet({ studentData, subjectData }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Box
        width={"100%"}
        maxW={"210mm"}
        height={"100%"}
        maxH={"297mm"}
        mx={"auto"}
        p={6}
        border="1px solid black"
        rounded={"md"}
        bg={"white"}
        shadow={"lg"}
        className="result-sheet"
      >
        <PrintHeader />

        <Text
          as={"h3"}
          fontWeight={"bold"}
          fontSize={"xl"}
          py={6}
          textAlign={"center"}
        >
          Result Sheet
        </Text>

        {/* Student Information */}
        <Box mt={4}>
          <Text fontWeight="bold">Student Name: {studentData.name}</Text>
          <Text>Roll Number: {studentData.rollNumber}</Text>
          {/* Add other student details here */}
        </Box>

        {/* Result Table */}
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Subject</Th>
              <Th isNumeric>Score</Th>
              <Th isNumeric>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subjectData.map((subject, index) => (
              <Tr key={index}>
                <Td>{subject.name}</Td>
                <Td isNumeric>{subject.score}</Td>
                <Td isNumeric>{subject.grade}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Total Score and Remarks */}
        <Box mt={4}>
          <Text fontWeight="bold">Total Score: {studentData.totalScore}</Text>
          <Text>Remarks: {studentData.remarks}</Text>
        </Box>

        <Button
          mt={16}
          mr={"auto"}
          width={"max-content"}
          onClick={handlePrint}
          className="no-print" // Add a class for styling and hiding
        >
          Print Result Sheet
        </Button>
      </Box>{" "}
      <style>
        {`
      @media print {
        .no-print {
          display: none;
        }
      }
    `}
      </style>
    </>
  );
}
