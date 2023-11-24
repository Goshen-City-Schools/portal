import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Flex, Box } from "@chakra-ui/react";

import useClasses from "../../../hooks/useClasses";
import useStudents from "../../../hooks/useStudents";

import HorizontalScrollableTabs from "../../../widgets/HorizontalScrollableTabs.widget";

import subjectsData from "../../../data/subjects.data";

import PageWrapper from "../../../components/PageWrapper";
import ClassSummaryBox from "../../../components/ClassSummaryBox";
import AllStudentsTable from "../../../components/tables/users/StudentsTable.component";
import Timetable from "../../../components/tables/TimeTable.component";
import ClassAttendance from "../../../components/tables/ClassAttendanceTable.component";
import SubjectTable from "../../../components/tables/SubjectTable.component";
import IconComponent from "../../../components/Icon.component";

import { MdArrowBack } from "react-icons/md";
import PageSectionHeader from "../../../components/PageSectionHeader";

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState(1);
  const { schoolClass } = useParams();
  const { studentsData } = useStudents();

  const { schoolClasses } = useClasses();

  const schoolClassData = schoolClasses.find(
    (singleSchoolClass) => singleSchoolClass.value === schoolClass
  );

  const classData = (classValue) =>
    schoolClasses.find((schoolCl) => schoolCl.value === classValue)?.name;

  const filteredStudents = studentsData.filter(
    (student) => student.schoolClass === classData(schoolClass)
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

  const handleTabClick = (tabId) => {
    if (tabId >= 1 && tabId <= tabs.length) {
      setActiveTab(tabId);
    }
  };

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`${schoolClassData?.name} Class`}
        pageCrumb={`Home / Classes / ${schoolClassData?.name}`}
      />

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

      <Flex alignItems={"center"} gap={4}>
        <IconComponent
          classes={"cursor-pointer"}
          click={() => window.history.back(-1)}
        >
          <MdArrowBack size={24} />
        </IconComponent>
        <HorizontalScrollableTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </Flex>

      <Box p={4} bg={"white"} rounded={"md"}>
        {tabs[activeTab - 1].component}
      </Box>
    </PageWrapper>
  );
}
