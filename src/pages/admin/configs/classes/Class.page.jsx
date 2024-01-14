import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import { useClasses, useStudents } from "../../../../hooks";

import HorizontalScrollableTabs from "../../../../widgets/HorizontalScrollableTabs.widget";

import PageWrapper from "../../../../components/PageWrapper";
import ClassSummaryBox from "../../../../components/ClassSummaryBox";
import AllStudentsTable from "../../../../components/tables/users/StudentsTable.component";
import Timetable from "../../../../components/tables/TimeTable.component";
import ClassAttendance from "../../../../components/tables/ClassAttendanceTable.component";
import SubjectTable from "../../../../components/tables/SubjectTable.component";
import IconComponent from "../../../../components/Icon.component";

import { MdArrowBack } from "react-icons/md";
import PageSectionHeader from "../../../../components/PageSectionHeader";
import { useSubjects } from "../../../../hooks/Subjects";

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState(1);
  const { classId } = useParams();
  const { studentsData } = useStudents();
  const { subjectsData } = useSubjects();
  const { schoolClasses } = useClasses();

  console.log(schoolClasses, classId);

  const schoolClassData = schoolClasses.find(
    (singleSchoolClass) => singleSchoolClass?._id === classId
  );

  const classData = (classValue) =>
    schoolClasses.find((schoolCl) => schoolCl.value === classValue)?.name;

  const filteredStudents = studentsData.filter(
    (student) => student.schoolClass === classData(classId)
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
