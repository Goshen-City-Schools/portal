import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Text,
  Flex,
  Button,
  Grid,
  Stack,
  Box,
  useToast,
  HStack,
} from "@chakra-ui/react";

import { useModal } from "../../../app/contexts/ModalContext";

import useStudents from "../../../hooks/useStudents";
import useClasses from "../../../hooks/useClasses";

import ReactPortal from "../../../widgets/ReactPortal";
import SearchWidget from "../../../widgets/Search.widget";

import PageWrapper from "../../../components/PageWrapper";
import StatCardComponent from "../../../components/StatCard.component";
import IconComponent from "../../../components/Icon.component";

import { MdAdd } from "react-icons/md";
import CreateSubClassPortal from "../../../portals/CreateSubClass.portal";
import AllClassesTable from "../../../components/tables/AllClassesTable";
import CustomSelect from "../../../components/shared/Select.component";

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
    (student) => student.schoolClass === classId
  );

  return studentsInClass.length;
};

export default function ClassesPage() {
  const toast = useToast();
  const { openPortal, closePortal } = useModal();
  const { studentsData } = useStudents();
  const navigate = useNavigate();

  const { schoolClasses } = useClasses();

  console.log(schoolClasses);

  const classesInCatrgory = (category) => {
    const c = schoolClasses.filter((schoolClass) =>
      schoolClass?.name.includes(category)
    );
    return c;
  };

  const handleCategoryClick = (category) => {
    // Handle click for the specific category

    if (classesInCatrgory(category).length <= 1) {
      navigate(
        `/admin/classes/${category.toLocaleLowerCase().replace(/\s/g, "")}`
      );
      return;
    } else {
      openPortal(
        <>
          <Text as={"h3"} fontWeight={"bold"} mb={4} textAlign={"center"}>
            Select class to view
          </Text>

          <Stack px={4} mb={4} py={2} spacing={4}>
            {classesInCatrgory(category).map((schoolClass, index) => (
              <Button
                disabled={
                  studentsData.filter(
                    (student) => student.schoolClass === schoolClass.name
                  ).length <= 0
                }
                display={"flex"}
                justifyContent={"space-between"}
                cursor={"pointer"}
                key={index}
                onClick={() => {
                  if (
                    studentsData.filter(
                      (student) => student.schoolClass === schoolClass.name
                    ).length > 0
                  ) {
                    navigate(
                      `/admin/classes/${schoolClass.name
                        .toLocaleLowerCase()
                        .replace(/\s/g, "")}`
                    );
                    closePortal();
                    return;
                  } else {
                    toast({
                      title: `No Student in ${schoolClass.name} currently`,
                      position: "top-right",
                      status: "error",
                      duration: "1100",
                    });
                    closePortal();
                    return;
                  }
                }}
              >
                {schoolClass.name} <Box></Box>
                {
                  studentsData.filter(
                    (student) => student.schoolClass === schoolClass.name
                  ).length
                }
              </Button>
            ))}
          </Stack>
        </>
      );
    }
  };

  return (
    <PageWrapper>
      <ReactPortal />

      <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Text
          as={"h2"}
          mt={0}
          className=""
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          All Classes
        </Text>
        <Text as={"small"}>Home / Classes/ All Staff</Text>
      </Flex>

      {/*  */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search for classes"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            onClick={() => openPortal(<CreateSubClassPortal />)}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            Add New Class
          </Button>
        </Flex>
      </Flex>

      {/*  */}

      <Box px={8} py={2} pb={10} bg={"white"} rounded={"lg"}>
        <Flex alignItems={"center"} gap={4} my={4}>
          <HStack width={"full"}>
            <Text flexShrink={0} fontWeight={"bold"} as={"small"}>
              Filter by:
            </Text>
            <CustomSelect size={"sm"} minW={"180px"} onChange={() => {}}>
              <option value="">-- Select Class --</option>
              {schoolClasses?.map((schoolClass) => (
                <option key={schoolClass.id} value={schoolClass.name}>
                  {schoolClass.name}
                </option>
              ))}
              <option value="all_students">All</option>
            </CustomSelect>
          </HStack>
        </Flex>

        <AllClassesTable data={schoolClasses} studentsData={studentsData} />
      </Box>

      <Grid
        gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={4}
        flexWrap={"wrap"}
      >
        {classCategories.map((categoryData, index) => (
          <StatCardComponent
            size={16}
            key={index}
            text={categoryData.category}
            imgSrc={categoryData.illustration}
            number={
              studentsData.filter((student) =>
                student.schoolClass?.includes(categoryData.category)
              ).length
            }
            onClick={() => handleCategoryClick(categoryData.category)}
          />
        ))}
      </Grid>
    </PageWrapper>
  );
}
