import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Text,
  Flex,
  Button,
  Grid,
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
import DataViewSwitcher from "../../../widgets/DataViewSwitcher";

const GridViewComponent = ({
  schoolClasses,
  studentsData,
  handleCategoryClick,
}) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
      flexWrap={"wrap"}
    >
      {schoolClasses.map((schoolClass, index) => (
        <StatCardComponent
          color={"yellow"}
          size={16}
          key={index}
          text={schoolClass.name + " Class"}
          imgSrc={"secondary-students.jpg"}
          number={
            studentsData.filter(
              (student) => student.schoolClass === schoolClass._id
            ).length
          }
          onClick={() => handleCategoryClick(schoolClass.value)}
        />
      ))}
    </Grid>
  );
};

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

  const [dataView, setDataView] = useState("grid");
  function handleDataView(e) {
    e.preventDefault;
    setDataView(() => e);
  }

  const handleCategoryClick = (category) => {
    // Handle click for the specific category
    navigate(
      `/admin/classes/${category.toLocaleLowerCase().replace(/\s/g, "")}`
    );
  };

  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader
        pageTitle={"All Classes"}
        pageCrumb={"Home / Classes "}
      />

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
        <Flex alignItems={"center"} gap={4} my={4} w={"full"}>
          <HStack width={"full"}>
            <Text flexShrink={0} fontWeight={"bold"} as={"small"}>
              Filter by:
            </Text>
            <CustomSelect
              size={"sm"}
              minW={"180px"}
              flexShrink={0}
              width={"full"}
              onChange={() => {}}
            >
              <option value="">-- Select Class --</option>
              {schoolClasses?.map((schoolClass) => (
                <option key={schoolClass.id} value={schoolClass.name}>
                  {schoolClass.name}
                </option>
              ))}
              <option value="all_students">All</option>
            </CustomSelect>
          </HStack>

          <DataViewSwitcher
            dataView={dataView}
            handleDataView={handleDataView}
          />
        </Flex>

        {dataView === "grid" ? (
          <GridViewComponent
            studentsData={studentsData}
            schoolClasses={schoolClasses}
            handleCategoryClick={handleCategoryClick}
          />
        ) : (
          <AllClassesTable data={schoolClasses} studentsData={studentsData} />
        )}
      </Box>
    </PageWrapper>
  );
}
