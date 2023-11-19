import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUser } from "../../../app/contexts/UserContext";
import { getSingleStudent } from "../../../api/student.api";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import ReactPortal from "../../../widgets/ReactPortal";

import StudentProfileScreen from "../../../screens/StudentProfileScreen";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";

export default function StudentPage() {
  const navigate = useNavigate();
  const { user } = useUser();
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

  if (!student) {
    return <ProfileNotFoundScreen />;
  }

  // Check if the student being viewed is the logged-in user
  if (user && studentId === user.id) {
    // Navigate to the "My Profile" screen
    navigate("/admin/profile");
  }

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
