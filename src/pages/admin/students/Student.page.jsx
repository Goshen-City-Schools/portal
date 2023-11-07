import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import useStudent from "../../../hooks/useStudent";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import StudentProfileScreen from "../../../screens/StudentProfileScreen";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";

export default function StudentPage() {
  const { studentId } = useParams();
  const fetchStudent = useCallback(() => useStudent({ studentId: studentId }));
  const student = fetchStudent();

  if (!student) {
    return <ProfileNotFoundScreen />;
  }

  console.log(student);
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Student Profile"}
        pageCrumb={`Home / Students / ${student?.firstName}`}
      />

      <StudentProfileScreen student={student} />
    </PageWrapper>
  );
}
