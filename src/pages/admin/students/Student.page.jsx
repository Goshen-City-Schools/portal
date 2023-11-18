import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import useStudent from "../../../hooks/useStudents";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import StudentProfileScreen from "../../../screens/StudentProfileScreen";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";
import { useAuth } from "../../../app/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactPortal from "../../../widgets/ReactPortal";
import { useState } from "react";
import { getSingleStudent, getStudentsData } from "../../../api/student.api";
import { useEffect } from "react";

export default function StudentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { studentId } = useParams();

  const [student, setStudent] = useState();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getSingleStudent(studentId);
        setStudent(response);
      } catch (error) {
        console.error("Error fetching student:", error.message);
        // Handle the error, e.g., set an error state
      }
    };

    fetchStudentData(); // Call the async function
  }, [studentId]); // Include staffId in the dependency array

  const existingStaffData = async () => await getStudentsData();

  if (!student) {
    return <ProfileNotFoundScreen />;
  }

  // Check if the student being viewed is the logged-in user
  if (user && studentId === user.id) {
    // Navigate to the "My Profile" screen
    navigate("/admin/profile");
  }

  console.log(student);
  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={`Student Profile - ${student?.firstName}`}
        pageCrumb={`Home / Students / ${student?.firstName}`}
      />

      <StudentProfileScreen student={student} />
    </PageWrapper>
  );
}
