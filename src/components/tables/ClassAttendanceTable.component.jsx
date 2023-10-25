import React, { useState } from "react";
import { Flex, Text, Grid, GridItem } from "@chakra-ui/react";

const ClassAttendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
    { id: 3, name: "Student 3" },
    // Add more students as needed
  ]);

  const [attendanceData, setAttendanceData] = useState(
    students.map((student) => ({ studentId: student.id, weeks: {} }))
  );

  const weeksOfSession = Array.from({ length: 12 }, (_, index) => {
    const weekNumber = index + 1;
    return {
      name: `Week ${weekNumber}`,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    };
  });

  // Function to toggle student attendance for a specific day
  const toggleStudentAttendance = (studentId, weekIndex, dayIndex) => {
    const updatedData = attendanceData.map((student, studentIndex) => {
      if (student.studentId === studentId) {
        const updatedWeeks = { ...student.weeks };
        const week = updatedWeeks[weekIndex] || [];
        week[dayIndex] = !week[dayIndex];
        updatedWeeks[weekIndex] = week;
        return { ...student, weeks: updatedWeeks };
      }
      return student;
    });
    setAttendanceData(updatedData);
  };

  // Function to toggle all students' attendance for a specific day
  const toggleAllStudentsAttendance = (weekIndex, dayIndex) => {
    const updatedData = attendanceData.map((student) => {
      const updatedWeeks = { ...student.weeks };
      students.forEach((s) => {
        const week = updatedWeeks[weekIndex] || [];
        week[dayIndex] = !week[dayIndex];
        updatedWeeks[weekIndex] = week;
      });
      return { ...student, weeks: updatedWeeks };
    });
    setAttendanceData(updatedData);
  };

  // Function to add a new student
  const addStudent = () => {
    const newStudentId = students.length + 1;
    const newStudent = { id: newStudentId, name: `Student ${newStudentId}` };
    setStudents([...students, newStudent]);

    const updatedData = attendanceData.concat({
      studentId: newStudentId,
      weeks: {},
    });
    setAttendanceData(updatedData);
  };

  return (
    <div>
      <h1>Class Attendance</h1>
      <button onClick={addStudent}>Add Student</button>
      <Grid templateColumns="auto repeat(12, 1fr)" gap={2}>
        <GridItem gridColumnStart={"1"} gridColumnEnd={"2"}>
          {/* Empty cell */}
        </GridItem>
        <GridItem gridColumnStart={"1"} gridColumnEnd={"3"}>
          Student Name
          <div className="">&nbsp;</div>
          {students.map((student) => (
            <Flex key={student.id}>{student.name}</Flex>
          ))}
        </GridItem>
        {weeksOfSession.map((week, weekIndex) => (
          <GridItem key={weekIndex} className="">
            <Text as="strong">
              {week.name}
              <Flex>
                {week.days.map((day, dayIndex) => (
                  <GridItem key={dayIndex} className="flex">
                    <Flex direction="column">
                      <Text>{day}</Text>
                      <div>
                        <input
                          type="checkbox"
                          checked={
                            attendanceData[0].weeks[weekIndex] &&
                            attendanceData[0].weeks[weekIndex][dayIndex]
                          }
                          onChange={() =>
                            toggleAllStudentsAttendance(weekIndex, dayIndex)
                          }
                        />
                      </div>
                    </Flex>
                  </GridItem>
                ))}
              </Flex>
            </Text>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default ClassAttendance;
