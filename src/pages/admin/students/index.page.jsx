import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Flex, Box, Button, Text, Grid, Select } from "@chakra-ui/react";

import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";

import PageSectionHeader from "../../../components/PageSectionHeader";
import { useNavigate } from "react-router-dom";
import allowedUserRoles from "../../../helpers/allowedUserRoles";
import { useUser } from "../../../app/contexts/UserContext";
import StudentPreviewCard from "../../../components/PreviewCards/StudentPreviewCard";
import schoolData from "../../../data/school.data";
import { useState } from "react";
import { useEffect } from "react";

export default function StudentsPage() {
  const navigate = useNavigate();
  const [selectedSchoolClass, setSelectedSchoolClass] = useState("");
  const [studentsData, setStudentsData] = useState(
    JSON.parse(localStorage.getItem("studentsData")) || []
  );
  const { user } = useUser();

  const data = studentsData.filter(
    (student) => student.class === selectedSchoolClass
  );

  useEffect(() => {
    setStudentsData(data);
    console.log(data, selectedSchoolClass);
  }, selectedSchoolClass);

  const handleClassChange = (e) => setSelectedSchoolClass(e.target.value);

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
          <Text flexShrink={0} fontWeight={"bold"} as={"small"}>
            Filter by:
          </Text>
          <Select size={"sm"} minW={"180px"} onChange={handleClassChange}>
            <option value="">-- Select Class --</option>

            {schoolData.schoolClasses.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.name}>
                {schoolClass.name}
              </option>
            ))}
          </Select>
          <Select size={"sm"} minW={"180px"}>
            <option value="">All</option>
            <option value="">Gold</option>
            <option value=""></option>
          </Select>
        </Flex>
        {studentsData.length > 0 ? (
          <Grid
            gridTemplateColumns={{
              "base": "1fr",
              "md": "repeat(4, 1fr)",
              "lg": "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {studentsData.map((student, index) => (
              <StudentPreviewCard key={index} student={student} />
            ))}
          </Grid>
        ) : (
          <Text as={"h2"} letterSpacing={0.5} color={"neutral.700"}>
            No students data yet!
          </Text>
        )}
      </Box>
    </PageWrapper>
  );
}
