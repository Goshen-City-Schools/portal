import React from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Broadsheet = ({ studentData }) => {
  return (
    <Box w="297mm" h="420mm" p="20px">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Student Name</Th>
            <Th isNumeric>Roll Number</Th>
            <Th isNumeric>Total Score</Th>
            <Th>Remarks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentData.map((student, index) => (
            <Tr key={index}>
              <Td>{student.name}</Td>
              <Td isNumeric>{student.rollNumber}</Td>
              <Td isNumeric>{student.totalScore}</Td>
              <Td>{student.remarks}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Broadsheet;
