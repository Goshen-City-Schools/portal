import React, { useState } from "react";
import { Text, Flex, Box, Button, useDisclosure } from "@chakra-ui/react";

import PageWrapper from "../../../components/PageWrapper";
import ClassSummaryBox from "../../../components/ClassSummaryBox";
import HorizontalScrollableTabs from "../../../widgets/HorizontalScrollableTabs.widget";
import AllStudentsTable from "../../../components/tables/AllStudentsTable.component";

import Timetable from "../../../components/tables/TimeTable.component";
import ClassAttendance from "../../../components/tables/ClassAttendanceTable.component";
import SubjectTable from "../../../components/tables/SubjectTable.component";
import useStudents from "../../../hooks/useStudents";
import { useParams } from "react-router-dom";
import useClasses from "../../../hooks/useClasses";

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState(1);
  const { schoolClass } = useParams();
  const { studentsData } = useStudents();

  const { schoolClasses } = useClasses();

  const schoolClassData = schoolClasses.find(
    (singleSchoolClass) => singleSchoolClass.value === schoolClass
  );
  console.log(studentsData, schoolClasses, schoolClassData);

  const filteredStudents = studentsData.filter(
    (student) => student.schoolClass.toLocaleLowerCase() === schoolClass
  );

  const tabs = [
    {
      id: 1,
      label: `Students (${filteredStudents.length})`,
      component: <AllStudentsTable existingStudentsData={filteredStudents} />,
    },
    {
      id: 2,
      label: `Subjects (${subjectsData.length})`,
      component: <SubjectTable />,
    },
    { id: 3, label: "Time table", component: <Timetable /> },
    { id: 4, label: "Attendance", component: <ClassAttendance /> },
    // Add more tabs as needed
  ];

  const subjectsData = {
    "Monday": {
      "8:00 AM": "Math",
      "9:00 AM": "Science",
      "10:00 AM": "History",
      "11:00 AM": "English",
      "12:00 PM": "Lunch Break",
      "1:00 PM": "Physics",
      "2:00 PM": "Chemistry",
      "3:00 PM": "Biology",
    },
  };

  const handleSubjectClick = (day, hour) => {
    // Implement the logic for handling subject clicks, e.g., opening a modal or performing an action.
    console.log(`Clicked on ${subjectsData[day][hour]} at ${day}, ${hour}`);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <PageWrapper>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Text
          as={"h2"}
          mt={0}
          className=""
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          {schoolClassData?.name} Class
        </Text>
        <Text as={"small"}>Home / Classes / {schoolClassData?.name}</Text>
      </Flex>

      <ClassSummaryBox
        totalStudents={filteredStudents.length}
        maleStudents={
          filteredStudents.filter((student) => student.gender === "male").length
        }
        femaleStudents={
          filteredStudents.filter((student) => student.gender === "female")
            .length
        }
        classTeacher={"Nwa Oriaku"}
      />

      <HorizontalScrollableTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      <Box p={4} bg={"white"} rounded={"md"}>
        {tabs[activeTab - 1].component}
      </Box>
    </PageWrapper>
  );
}
