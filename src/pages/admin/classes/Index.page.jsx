import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Button, Grid, Stack } from "@chakra-ui/react";

import ReactPortal from "../../../widgets/ReactPortal";
import { useModal } from "../../../app/contexts/ModalContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import useClassOptions from "../../../hooks/useClassOptions";
import StatCardComponent from "../../../components/StatCard.component";
import { useEffect } from "react";
import { getStudentsData } from "../../../api/student.api";
import useStudents from "../../../hooks/useStudents";
import useClasses from "../../../hooks/useClasses";

export default function ClassesPage() {
  const { openPortal, closePortal } = useModal();
  const { studentsData } = useStudents();
  const navigate = useNavigate();

  console.log(studentsData);

  const { schoolClasses } = useClasses();
  const classCategories = [
    {
      category: "Reception",
      illustration: "reception-foundation.jpg", // Replace with the actual image URL
    },
    {
      category: "Foundation",
      illustration: "reception-foundation.jpg", // Replace with the actual image URL
    },
    {
      category: "Discovery",
      illustration: "discovery-nursery.jpg", // Replace with the actual image URL
    },
    {
      category: "Year",
      illustration: "year-students.jpg", // Replace with the actual image URL
    },
    {
      category: "JSS",
      illustration: "secondary-students.jpg", // Replace with the actual image URL
    },
    {
      category: "SSS",
      illustration: "secondary-students.jpg", // Replace with the actual image URL
    },
    // Add more class categories as needed
  ];

  const classesInCatrgory = (category) => {
    const c = schoolClasses.filter((schoolClass) =>
      schoolClass.name.includes(category)
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
                cursor={"pointer"}
                key={index}
                onClick={() => {
                  navigate(
                    `/admin/classes/${schoolClass.name
                      .toLocaleLowerCase()
                      .replace(/\s/g, "")}`
                  );
                  closePortal();
                }}
              >
                {schoolClass.name}
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
                student.schoolClass.includes(categoryData.category)
              ).length
            }
            onClick={() => handleCategoryClick(categoryData.category)}
          />
        ))}
      </Grid>
    </PageWrapper>
  );
}
