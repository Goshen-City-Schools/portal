import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Button, HStack, Text, Select } from "@chakra-ui/react";
import { MdAdd, MdImportExport } from "react-icons/md";
import SearchWidget from "../../../widgets/Search.widget";
import PageSectionHeader from "../../../components/PageSectionHeader";
import AllStudentsTable from "../../../components/tables/users/StudentsTable.component";
import PageWrapper from "../../../components/PageWrapper";
import allowedUserRoles from "../../../helpers/allowedUserRoles";
import { useClasses, useStudents } from "../../../hooks";
import { useUser } from "../../../app/contexts/UserContext";
import roles from "../../../constants/roles";

export default function StudentsPage() {
  const navigate = useNavigate();
  const [filteredStaffData, setFilteredStaffData] = useState([]);
  const [selectedSchoolClass, setSelectedSchoolClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useUser();
  const { schoolClasses } = useClasses();

  // Use the useStudents hook with selectedSchoolClass as parameter
  const { studentsData, loading } = useStudents(selectedSchoolClass);

  const handleClassChange = (e) => {
    setSelectedSchoolClass(e.target.value);
  };

  useEffect(() => {
    // Filter the data based on search term and selected role
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = studentsData.filter((student) => {
      const matchesSearch = Object.values(student).some((value) =>
        String(value).toLowerCase().includes(lowercasedSearchTerm)
      );

      return matchesSearch;
    });

    setFilteredStaffData(filtered);
  }, [searchTerm, studentsData]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
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
        <SearchWidget
          height={10}
          text={"Search Students by name"}
          onSearch={handleSearch}
        />
        {allowedUserRoles(user, [roles.ROLES.IT_PERSONNEL]) && (
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
            <Select
              size={"sm"}
              minW={"200px"}
              onChange={handleClassChange}
              value={selectedSchoolClass}
            >
              <option value="">-- Select Class --</option>
              {schoolClasses?.map((schoolClass) => (
                <option key={schoolClass.id} value={schoolClass.id}>
                  {schoolClass.schoolClass.name}&nbsp;
                  <span className="capitalize">{schoolClass.name}</span>
                </option>
              ))}
              <option value="all_students">All</option>
            </Select>
          </HStack>
        </Flex>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {filteredStaffData && filteredStaffData.length > 0 ? (
              <AllStudentsTable
                key={selectedSchoolClass}
                studentsData={filteredStaffData}
              />
            ) : (
              <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
                No students data yet!
              </Text>
            )}
          </>
        )}
      </Box>
    </PageWrapper>
  );
}
