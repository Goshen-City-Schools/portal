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
  Flex,
  Grid,
} from "@chakra-ui/react";
import PrintHeader from "./Header/PrintHeader";

import {
  PDFViewer,
  Page,
  Text as PDFText,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { assignGrade, teacherRemark } from "../utilities/assignGrade";

// Define the styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
  },
});

export default function ResultSheet({ studentData, subjectData }) {
  const totalScore = ({ testScore, examScore }) => {
    return testScore + examScore;
  };

  const percentageTotal = (total) => {
    return `${(total / 100) * 100}%`;
  };

  function grandTotal(data) {
    let total = 0;

    for (const subject of subjectData) {
      total += totalScore(subject);
    }

    return total;
  }

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
        bg={"white"}
        shadow={"lg"}
        className="result-sheet"
      >
        <PrintHeader />

        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
          h={24}
        >
          <Text
            as={"h3"}
            fontWeight={"bold"}
            fontSize={"sm"}
            px={6}
            mt={1}
            py={2}
            w={"max-content"}
            mx={"auto"}
            bg={"brand.700"}
            color={"white"}
            rounded={"lg"}
            textAlign={"center"}
          >
            Result Sheet
          </Text>

          <Box position={"absolute"} right={0}>
            <Box
              className="imageContainer h-24 w-24 rounded-md shadow-md"
              border={"1px dotted"}
              borderColor={"accent.700"}
            ></Box>
          </Box>
        </Flex>
        {/* Student Information */}
        <Flex
          mt={4}
          fontSize={"sm"}
          gap={4}
          justifyContent={"space-between"}
          border={"1px solid"}
          borderBottom={0}
          borderColor={"brand.700"}
          px={2}
          py={1}
        >
          <Text>
            <span className="font-bold">Name: </span>
            {studentData.name}
          </Text>
          <Text>
            <span className="font-bold">ID: </span>
            {studentData.rollNumber}
          </Text>
          <Text>
            <span className="font-bold">Age: </span>
            {studentData.age}
          </Text>
          <Text>
            <span className="font-bold">Class: </span>
            {studentData.class}
          </Text>
          {/* Add other student details here */}
        </Flex>

        {/*  */}
        <Flex
          fontSize={"sm"}
          gap={4}
          justifyContent={"space-between"}
          border={"1px solid"}
          borderColor={"brand.700"}
          borderBottom={0}
          px={2}
          py={1}
        >
          <Text>
            <span className="font-bold">Number in Class: </span>
            50
          </Text>
          <Text>
            <span className="font-bold">Term: </span>
            First Term
          </Text>
          <Text>
            <span className="font-bold">Session: </span>
            2023 - 2024
          </Text>
          {/* Add other student details here */}
        </Flex>

        {/*  */}
        <Flex
          px={2}
          py={1}
          fontSize={"sm"}
          gap={4}
          justifyContent={"space-between"}
          border={"1px solid"}
          borderColor={"brand.700"}
        >
          <Text>
            <span className="font-bold">Total Marks Obtainable: </span>
            {100 * subjectData.length}
          </Text>
          <Text>
            <span className="font-bold">Total Marks Obtained: </span>
            {grandTotal(subjectData)}
          </Text>
          <Text>
            <span className="font-bold">Average: </span>
            76
          </Text>
          <Text>
            <span className="font-bold">Class Position: </span>2
            <span className="xs">nd</span>
          </Text>
          {/* Add other student details here */}
        </Flex>

        {/* Result Table */}
        <Table
          variant="simple"
          mt={4}
          whiteSpace={"pre-wrap"}
          border={"1px solid"}
          borderColor={"brand.700"}
        >
          <Thead fontSize={"xs"}>
            <Tr>
              <Th width={"full"}>Subject</Th>
              <Th width={6} isNumeric>
                Test Score (30)
              </Th>
              <Th width={"max-content"} isNumeric>
                Exam Score (70)
              </Th>
              <Th width={6} isNumeric textAlign={"center"}>
                Total Score (100)
              </Th>
              <Th width={"max-content"}>Score Grade</Th>
              <Th width={20}>Score (%)</Th>
              <Th width={20}>Teacher's remark</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={"sm"} whiteSpace={"nowrap"}>
            {subjectData.map((subject, index) => (
              <>
                <Tr key={index}>
                  <Td width={"full"}>{subject.name}</Td>
                  <Td isNumeric>{subject.testScore}</Td>
                  <Td isNumeric>{subject.examScore}</Td>
                  <Td isNumeric>{totalScore(subject)}</Td>
                  <Td width={8} isNumeric>
                    {assignGrade(totalScore(subject))}
                  </Td>
                  <Td width={8} isNumeric>
                    {percentageTotal(totalScore(subject))}
                  </Td>
                  <Td width={8} isNumeric>
                    {teacherRemark(totalScore(subject))}
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>

        {/* Total Score and Remarks */}
        <Box mt={8}>
          <Grid
            templateColumns={"repeat(6, 1fr)"}
            fontSize={"xs"}
            gap={2}
            alignItems={"flex-end"}
            mb={4}
          >
            <Box
              mt={4}
              border={"1px dotted"}
              b
              gridColumnStart={1}
              gridColumnEnd={5}
              w={"full"}
              h={16}
              display={"flex"}
              alignItems={"start"}
              px={2}
              py={0.5}
              borderColor={"accent.700"}
            >
              <Text>
                <span className="font-bold">Class Teacher's Remarks: </span>{" "}
                {studentData.remarks}
              </Text>
            </Box>
            <Box
              gridColumnStart={5}
              gridColumnEnd={7}
              mt={4}
              borderBottom={"1px solid"}
              h={"max-content"}
              width={"full"}
            >
              <Text>
                <span className="font-bold">Signature: </span>{" "}
              </Text>
            </Box>
          </Grid>

          {/*  */}
          <Grid
            templateColumns={"repeat(6, 1fr)"}
            fontSize={"xs"}
            gap={2}
            alignItems={"flex-end"}
          >
            <Box
              mt={4}
              border={"1px dotted"}
              borderColor={"accent.700"}
              gridColumnStart={1}
              gridColumnEnd={5}
              w={"full"}
              h={16}
              display={"flex"}
              alignItems={"start"}
              px={2}
              py={1}
            >
              <Text>
                <span className="font-bold">Head Teacher's Remarks: </span>{" "}
                {studentData.remarks}
              </Text>
            </Box>
            <Box
              gridColumnStart={5}
              gridColumnEnd={7}
              mt={4}
              borderBottom={"1px solid"}
              h={"max-content"}
              width={"full"}
            >
              <Text>
                <span className="font-bold">Signature: </span>{" "}
              </Text>
            </Box>
          </Grid>
        </Box>
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

export const ResultSheetPDF = ({ studentData, subjectData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <ResultSheet studentData={studentData} subjectData={subjectData} />
    </Page>
  </Document>
);
