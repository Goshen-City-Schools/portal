import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Custom Hooks
import { useClasses, useStudents } from "../../../hooks";

import { useUser } from "../../../app/contexts/UserContext";

import { Flex, Box, Button, HStack, Text, Select } from "@chakra-ui/react";

import { MdAdd, MdImportExport } from "react-icons/md";

import allowedUserRoles from "../../../helpers/allowedUserRoles";

import SearchWidget from "../../../widgets/Search.widget";

import PageSectionHeader from "../../../components/PageSectionHeader";
import AllStudentsTable from "../../../components/tables/users/StudentsTable.component";
import PageWrapper from "../../../components/PageWrapper";

export default function StudentsPage() {
  const navigate = useNavigate();
  const [selectedSchoolClass, setSelectedSchoolClass] = useState("");
  const [selectedSubClass, setSelectedSubClass] = useState("");

  const { studentsData } = useStudents();
  const [filteredStudentsData, setFilteredStudentsData] =
    useState(studentsData);
  const { user } = useUser();

  const { schoolClasses, loading } = useClasses(); // Use the new hook

  const memoizedFilteredStudentsData = useMemo(() => {
    if (!selectedSchoolClass || selectedSchoolClass === "all_students") {
      return studentsData;
    }

    if (selectedSubClass) {
      return studentsData?.filter(
        (student) =>
          student.schoolClass === selectedSchoolClass &&
          student.subclass === selectedSubClass
      );
    }

    return studentsData.filter(
      (student) => student.schoolClass === selectedSchoolClass
    );
  }, [studentsData, selectedSchoolClass, selectedSubClass]);

  useEffect(() => {
    setFilteredStudentsData(memoizedFilteredStudentsData);
  }, [memoizedFilteredStudentsData]);

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSelectedSchoolClass(selectedClass);

    // Find the selected school class object
    const selectedClassObject = schoolClasses.find(
      (schoolClass) => schoolClass._id === selectedClass
    );

    // Update the list of subclasses based on the selected school class
    const subclasses = selectedClassObject
      ? selectedClassObject.subClasses
      : [];
    setSubClasses(subclasses);

    // Reset the selected subclass when the school class changes
    setSelectedSubClass("");
  };

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"All Students"}
        pageCrumb={"Home / Students "}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Students"} />

        {allowedUserRoles(user, ["IT Personnel"]) && (
          <Flex gap={4} fontSize={"sm"}>
            <Button
              size={"sm"}
              colorScheme={"blue"}
              variant={"outline"}
              leftIcon={<MdImportExport />}
              onClick={() => navigate("/admin/students/new")}
            >
              Import / Export
            </Button>
            <Button
              size={"sm"}
              colorScheme={"blue"}
              leftIcon={<MdAdd />}
              onClick={() => navigate("/admin/students/new")}
            >
              Enroll Student
            </Button>
          </Flex>
        )}
      </Flex>

      <Box>
        <Flex
          alignItems={"center"}
          gap={4}
          my={4}
          mb={8}
          justifyContent={"space-between"}
        >
          <HStack minW={""}>
            <Text flexShrink={0} fontWeight={"bold"} as={"small"}>
              Filter by:
            </Text>
            <Select size={"sm"} minW={"200px"} onChange={handleClassChange}>
              <option value="">-- Select Class --</option>
              {schoolClasses?.map((schoolClass) => (
                <option key={schoolClass._id} value={schoolClass._id}>
                  {schoolClass.name}
                </option>
              ))}
              <option value="all_students">All</option>
            </Select>
          </HStack>
        </Flex>
        {filteredStudentsData?.length > 0 ? (
          <AllStudentsTable existingStudentsData={filteredStudentsData} />
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No students data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
