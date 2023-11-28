import { useParams, useNavigate } from "react-router-dom";

import { useUser } from "../../../app/contexts/UserContext";
import { useStudent } from "../../../hooks/Students";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import ReactPortal from "../../../widgets/React_portal";

import StudentProfileScreen from "../../../screens/StudentProfileScreen";
import ProfileNotFoundScreen from "../../../screens/ProfileNotFoundScreen";

export default function StudentPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const studentId = useParams();
  const { studentData: student } = useStudent(studentId);

  if (!student) {
    return <ProfileNotFoundScreen />;
  }

  // Check if the student being viewed is the logged-in user
  if (user && studentId === user.id) {
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
