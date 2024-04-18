import { useStudents } from "../../../../hooks/";

import ReactPortal from "../../../../widgets/React_portal";

import PageWrapper from "../../../../components/PageWrapper";

import PageSectionHeader from "../../../../components/PageSectionHeader";
import ClassConfigScreen from "../../../../screens/config/ClassConfigScreen";

export const classCategories = [
  {
    category: "Reception",
    value: "reception",
    illustration: "reception-foundation.jpg", // Replace with the actual image URL
  },
  {
    category: "Foundation",
    value: "foundation",
    illustration: "reception-foundation.jpg", // Replace with the actual image URL
  },
  {
    category: "Discovery",
    value: "discovery",
    illustration: "discovery-nursery.jpg", // Replace with the actual image URL
  },
  {
    category: "Year",
    value: "year",
    illustration: "year-students.jpg", // Replace with the actual image URL
  },
  {
    category: "JSS",
    value: "jss",
    illustration: "secondary-students.jpg", // Replace with the actual image URL
  },
  {
    category: "SSS",
    value: "sss",
    illustration: "secondary-students.jpg", // Replace with the actual image URL
  },
  // Add more class categories as needed
];

export const getNumberOfStudentsInClass = (studentsData, classId) => {
  if (!studentsData || !classId) {
    return 0;
  }

  // Filter students based on the provided classId
  const studentsInClass = studentsData.filter(
    (student) => student.studentClass.id === Number(classId)
  );

  return studentsInClass.length;
};

export default function ClassesPage() {
  const { studentsData } = useStudents();

  console.log(studentsData);

  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader
        pageTitle={"All Classes"}
        pageCrumb={"Home / Classes "}
      />

      {/*  */}

      {/*  */}

      <ClassConfigScreen />
    </PageWrapper>
  );
}
