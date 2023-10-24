import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Text, Flex, Box, Button } from "@chakra-ui/react";

import ClassCategoryBox from "../../../components/ClassCategoryBox.component";
import ReactPortal from "../../../widgets/ReactPortal";
import { useModal } from "../../../app/contexts/ModalContext";
import { Link } from "react-router-dom";

export default function ClassesPage() {
  const { openPortal } = useModal();

  const classCategories = [
    {
      category: "Reception",
      illustration: "/illustrations/reception-class.jpeg", // Replace with the actual image URL
      studentCount: 50,
    },
    {
      category: "Nursery",
      illustration: "nursery.jpg", // Replace with the actual image URL
      studentCount: 60,
    },
    {
      category: "Basic",
      illustration: "basic.jpg", // Replace with the actual image URL
      studentCount: 70,
    },
    {
      category: "Secondary",
      illustration: "secondary.jpg", // Replace with the actual image URL
      studentCount: 80,
    },
    // Add more class categories as needed
  ];

  const handleCategoryClick = (category) => {
    // Handle click for the specific category
    console.log(`Clicked on ${category}`);
    openPortal(
      <>
        <Link to={"/admin/classes/ss1A"}>All classes in category</Link>
      </>
    );
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
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

      <Flex gap={4} flexWrap={"wrap"}>
        {classCategories.map((categoryData, index) => (
          <ClassCategoryBox
            key={index}
            category={categoryData.category}
            illustration={categoryData.illustration}
            studentCount={categoryData.studentCount}
            onClick={() => handleCategoryClick(categoryData.category)}
          />
        ))}
      </Flex>
    </PageWrapper>
  );
}
