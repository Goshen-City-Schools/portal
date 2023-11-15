import React, { useState } from "react";
import { Text, Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import PageWrapper from "../../../components/PageWrapper";
import ClassSummaryBox from "../../../components/ClassSummaryBox";
import HorizontalScrollableTabs from "../../../widgets/HorizontalScrollableTabs.widget";
import AllStudentsTable from "../../../components/tables/AllStudentsTable.component";
import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import Timetable from "../../../components/tables/TimeTable.component";
import ClassAttendance from "../../../components/tables/ClassAttendanceTable.component";
import SubjectTable from "../../../components/tables/SubjectTable.component";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
// import Timetable from "../../../components/tables/Timetable.component";

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState(1);
  const studentsData = useLocalStorage("studentsData").getItem();

  const tabs = [
    {
      id: 1,
      label: "Students (25)",
      component: <AllStudentsTable existingStudentsData={studentsData} />,
    },
    { id: 2, label: "Subjects", component: <SubjectTable /> },
    { id: 3, label: "Time table", component: <Timetable /> },
    { id: 4, label: "Attendance", component: <ClassAttendance /> },
    { id: 5, label: "Social Behaviour" },
    { id: 6, label: "Broadsheet" },
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
          Senior Secondary School (SSS 1A)
        </Text>
        <Text as={"small"}>Home / Classes / SSS 1A</Text>
      </Flex>

      <ClassSummaryBox
        totalStudents={"40"}
        maleStudents={"24"}
        femaleStudents={"18"}
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
