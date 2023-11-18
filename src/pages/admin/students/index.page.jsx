import React, { useState, useEffect, useMemo } from "react";
import PageWrapper from "../../../components/PageWrapper";
import {
  Flex,
  Box,
  Button,
  HStack,
  Text,
  Grid,
  Select,
} from "@chakra-ui/react";
import {
  MdAdd,
  MdGridView,
  MdIcecream,
  MdTableChart,
  MdUploadFile,
} from "react-icons/md";
import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import PageSectionHeader from "../../../components/PageSectionHeader";
import { useNavigate } from "react-router-dom";

import allowedUserRoles from "../../../helpers/allowedUserRoles";
import StudentPreviewCard from "../../../components/PreviewCards/StudentPreviewCard";
import schoolData from "../../../data/school.data";
import AllStudentsTable from "../../../components/tables/AllStudentsTable.component";

// Custom Hooks
import { useUser } from "../../../app/contexts/UserContext";
import useClasses from "../../../hooks/useClasses";
import useStudents from "../../../hooks/useStudents";

export default function StudentsPage() {
  const navigate = useNavigate();
  const [selectedSchoolClass, setSelectedSchoolClass] = useState("");
  const [selectedSubClass, setSelectedSubClass] = useState("");
  const [dataView, setDataView] = useState("grid");
  const [subClasses, setSubClasses] = useState("");
  const { studentsData, setStudentsData } = useStudents();
  const [filteredStudentsData, setFilteredStudentsData] =
    useState(studentsData);
  const { user } = useUser();

  const { schoolClasses, loading } = useClasses(); // Use the new hook

  useEffect(() => {
    // Your logic to handle staffData change
    console.log(studentsData);
  }, [studentsData]);

  function handleDataView(e) {
    e.preventDefault;
    setDataView(() => e);
  }

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
      (schoolClass) => schoolClass.name === selectedClass
    );

    // Update the list of subclasses based on the selected school class
    const subclasses = selectedClassObject
      ? selectedClassObject.subClasses
      : [];
    setSubClasses(subclasses);

    // Reset the selected subclass when the school class changes
    setSelectedSubClass("");
  };

  const handleSubClassChange = (e) => setSelectedSubClass(e.target.value);

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"All Students"}
        pageCrumb={"Home / Students / All Students"}
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
              bg={"neutral.100"}
              border={"1px"}
              borderColor={"brand.700"}
            >
              <IconComponent>
                <MdIcecream />
              </IconComponent>{" "}
              Download
            </Button>
            <Button
              as={"Flex"}
              gap={2}
              size={"sm"}
              bg={"accent.700"}
              color={"white"}
            >
              <IconComponent>
                <MdUploadFile />
              </IconComponent>{" "}
              Bulk Upload Students
            </Button>
            <Button
              bg={"brand.700"}
              size={"sm"}
              color={"neutral.100"}
              onClick={() => navigate("/admin/students/new")}
            >
              <IconComponent>
                <MdAdd />
              </IconComponent>
              New Student
            </Button>
          </Flex>
        )}
      </Flex>

      <Box px={8} py={2} pb={10} bg={"white"} rounded={"lg"}>
        <Flex alignItems={"center"} gap={4} my={4}>
          <HStack width={"full"}>
            <Text flexShrink={0} fontWeight={"bold"} as={"small"}>
              Filter by:
            </Text>
            <Select size={"sm"} minW={"180px"} onChange={handleClassChange}>
              <option value="">-- Select Class --</option>
              {schoolClasses?.map((schoolClass) => (
                <option key={schoolClass.id} value={schoolClass.name}>
                  {schoolClass.name}
                </option>
              ))}
              <option value="all_students">All</option>
            </Select>

            {/* Subclass selection */}
            {selectedSchoolClass && (
              <Select
                size={"sm"}
                minW={"180px"}
                onChange={handleSubClassChange}
                value={selectedSubClass}
              >
                <option value="">-- Select Subclass --</option>
                {subClasses.map((subClass, index) => (
                  <option key={index} value={subClass}>
                    {subClass}
                  </option>
                ))}
              </Select>
            )}
          </HStack>
          <HStack>
            <Grid
              cursor={"pointer"}
              placeItems={"center"}
              color={"neutral.600"}
              bg={dataView === "grid" ? "red.100" : "neutral.300"}
              rounded={"lg"}
              onClick={() => handleDataView("grid")}
            >
              <IconComponent>
                <MdGridView />
              </IconComponent>
            </Grid>
            <Grid
              cursor={"pointer"}
              placeItems={"center"}
              color={"neutral.600"}
              bg={dataView === "table" ? "red.100" : "neutral.300"}
              rounded={"lg"}
              onClick={() => handleDataView("table")}
            >
              <IconComponent>
                <MdTableChart />
              </IconComponent>
            </Grid>
          </HStack>
        </Flex>
        {filteredStudentsData?.length > 0 ? (
          dataView === "grid" ? (
            <Grid
              gridTemplateColumns={{
                "base": "1fr",
                "sm": "2, 1fr",
                "md": "repeat(, 1fr)",
                "lg": "repeat(5, 1fr)",
              }}
              gap={4}
            >
              {filteredStudentsData?.map((student, index) => (
                <StudentPreviewCard key={index} student={student} />
              ))}
            </Grid>
          ) : (
            <AllStudentsTable existingStudentsData={filteredStudentsData} />
          )
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No students data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
