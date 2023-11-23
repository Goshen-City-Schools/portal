import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Custom Hooks
import useClasses from "../../../hooks/useClasses";
import useStudents from "../../../hooks/useStudents";

import { useUser } from "../../../app/contexts/UserContext";

import { Flex, Box, Button, HStack, Text, Grid } from "@chakra-ui/react";

import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import allowedUserRoles from "../../../helpers/allowedUserRoles";

import SearchWidget from "../../../widgets/Search.widget";

import IconComponent from "../../../components/Icon.component";
import PageSectionHeader from "../../../components/PageSectionHeader";
import AllStudentsTable from "../../../components/tables/AllStudentsTable.component";
import PageWrapper from "../../../components/PageWrapper";
import StudentPreviewCard from "../../../components/PreviewCards/StudentPreviewCard";
import DataViewSwitcher from "../../../widgets/DataViewSwitcher";
import GridViewComponent from "../../../widgets/GridViewComponent";

export default function StudentsPage() {
  const navigate = useNavigate();
  const [selectedSchoolClass, setSelectedSchoolClass] = useState("");
  const [selectedSubClass, setSelectedSubClass] = useState("");
  const [dataView, setDataView] = useState("grid");
  const [subClasses, setSubClasses] = useState("");
  const { studentsData } = useStudents();
  const [filteredStudentsData, setFilteredStudentsData] =
    useState(studentsData);
  const { user } = useUser();

  const { schoolClasses, loading } = useClasses(); // Use the new hook

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
                <option key={schoolClass._id} value={schoolClass._id}>
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
                  <option key={index} value={subClass._id}>
                    {subClass.name}
                  </option>
                ))}
              </Select>
            )}
          </HStack>

          <DataViewSwitcher
            handleDataView={handleDataView}
            dataView={dataView}
          />
        </Flex>
        {filteredStudentsData?.length > 0 ? (
          dataView === "grid" ? (
            <GridViewComponent
              Component={StudentPreviewCard}
              dataEntity={"student"}
              data={studentsData}
            />
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
