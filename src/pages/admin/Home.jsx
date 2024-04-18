import { useNavigate } from "react-router-dom";

import CalendarWidget from "../../widgets/Calendar";
import ReactPortal from "../../widgets/React_portal";
import ChartWidget from "../../widgets/Chart.widget";

import { useModal } from "../../app/contexts/ModalContext";
import { useStaffs, useStudents } from "../../hooks/";

import { Text, Grid, GridItem, Box, Flex } from "@chakra-ui/react";

import CreateEventPortal from "../../portals/CreateEvent.portal";

import formatDate from "../../utilities/formatDate.utils";

import { IoMdAdd } from "react-icons/io";

import EventCardComponent from "../../components/EventCard.component";
import StatCardComponent from "../../components/StatCard.component";
import NewStudentsTable from "../../components/tables/NewStudentsTable.component";
import CustomSelect from "../../components/shared/Select.component";
import PageSectionHeader from "../../components/PageSectionHeader";
import PageWrapper from "../../components/PageWrapper";
import IconComponent from "../../components/Icon.component";
import { useSubjects } from "../../hooks/Subjects";

export default function AdminHome() {
  const { openPortal } = useModal();
  const { staffsData: staffData } = useStaffs();
  const { studentsData } = useStudents();
  const { subjectsData } = useSubjects();

  const navigate = useNavigate();

  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader pageTitle={"Overview"} pageCrumb={"Home"} />

      <Grid templateColumns={{ "base": "1fr", "lg": "repeat(9, 1fr)" }} gap={4}>
        <GridItem
          w="full"
          colSpan={8}
          h="full"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          <Flex
            justifyContent={"space-between"}
            gap={4}
            flexDirection={{ "base": "column", "md": "row" }}
            overflowX={"scroll"}
            pb={8}
          >
            <StatCardComponent
              imagePadding={2}
              color={"#F5DDFF"}
              imgSrc={"people.png"}
              text={"Total students:"}
              number={studentsData?.length}
              onClick={() => navigate("/admin/students")}
              maxW={"300px"}
            />
            <StatCardComponent
              imagePadding={2}
              color={"#DCECFF"}
              imgSrc={"teacher.png"}
              text={"Total Staff:"}
              number={staffData?.length}
              onClick={() => navigate("/admin/config/staff")}
              maxW={"300px"}
            />
            <StatCardComponent
              imagePadding={2}
              color={"#FFF2DB"}
              imgSrc={"parents.png"}
              text={"Total Parents:"}
              number={subjectsData.length}
              onClick={() => navigate("/admin/config/academics")}
              maxW={"300px"}
            />
            <StatCardComponent
              imagePadding={2}
              color={"#FFF2DB"}
              imgSrc={"parents.png"}
              text={"Total Classes:"}
              number={subjectsData.length}
              onClick={() => navigate("/admin/config/academics")}
              maxW={"300px"}
            />
            <StatCardComponent
              imagePadding={2}
              color={"#FFF2DB"}
              imgSrc={"parents.png"}
              text={"Total Subjects:"}
              number={subjectsData.length}
              onClick={() => navigate("/admin/config/academics")}
              maxW={"300px"}
            />
          </Flex>

          {/* Fees Report */}
          <Box p={4} bg={"white"} rounded={"md"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text
                as={"h3"}
                mt={0}
                className=""
                fontSize={"md"}
                fontWeight={"bold"}
                color={"neutral.700"}
                mb={4}
              >
                Fees Report
              </Text>
              <Flex gap={4} alignItems={"center"}>
                <CustomSelect>
                  <option value="option1">Unpaid</option>
                  <option value="option2" selected>
                    Part payment
                  </option>
                  <option value="option2" selected>
                    Paid
                  </option>
                </CustomSelect>
                <CustomSelect>
                  <option value="option1">School Fees</option>
                  <option value="option2">Bus Fees</option>
                  <option value="option3">Hostel Fees</option>
                </CustomSelect>
              </Flex>
            </Flex>

            <ChartWidget
              labels={[
                "Discovery",
                "Foundation",
                "Nursery",
                "Year",
                "JSS",
                "SSS",
              ]}
              data1={[47, 58, 45, 44, 56]}
              data2={[21, 12, 64, 56, 54]}
            />
          </Box>

          {/* Student Admission Report  */}
          <Box p={4} bg={"white"} rounded={"md"} mb={6}>
            <Flex justifyContent={"space-between"} alignItems={"center"} mb={6}>
              <Text
                as={"h3"}
                mt={0}
                className=""
                fontSize={"md"}
                fontWeight={"bold"}
                color={"neutral.700"}
              >
                Newly Admitted Students
              </Text>
              <Flex gap={2} alignItems={"center"}>
                <CustomSelect>
                  <option value="option1">Today</option>
                  <option value="option2"> This Week</option>
                  <option value="option3" selected>
                    First Term
                  </option>
                  <option value="option4">2023 / 2024</option>
                </CustomSelect>
              </Flex>
            </Flex>

            <NewStudentsTable existingStudnets={studentsData} />
          </Box>
        </GridItem>

        <GridItem
          w={"full"}
          flexShrink={0}
          display={{ "base": "none", "md": "block" }}
        >
          <Flex direction={"column"} gap={4} overflowY={"scroll"}>
            <CalendarWidget />

            <Box p={6} bg={"white"} rounded={"md"}>
              {/* Subsection title */}
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={4}
              >
                <Text as={"h3"} fontWeight={"bold"}>
                  Upcoming Events
                </Text>
                <Flex
                  cursor={"pointer"}
                  height={"32px"}
                  width={"32px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg={"accent.700"}
                  rounded={"lg"}
                  fontWeight={"bold"}
                  color={"white"}
                  onClick={() => openPortal(<CreateEventPortal />)}
                >
                  <IconComponent>
                    <IoMdAdd size={16} />
                  </IconComponent>
                </Flex>
              </Flex>

              {/*  */}

              <Flex
                direction={"column"}
                gap={4}
                height={"280px"}
                overflowY={"scroll"}
                py={2}
              >
                <EventCardComponent
                  eventName={"Children's Day Celebration"}
                  startDate={formatDate(Date.now(), "long")}
                  startTime={"2:00pm"}
                />
                <EventCardComponent
                  eventName={"2023/2024 1st Term Assessment"}
                  startDate={formatDate(Date.now(), "long")}
                  endDate={formatDate(Date.now())}
                  startTime={"2:00pm"}
                  endTime={"4:00pm"}
                />
                <EventCardComponent
                  eventName={"2023/2024 1st Term Examination"}
                  startDate={formatDate(Date.now())}
                  endDate={formatDate(Date.now())}
                  startTime={"2:00pm"}
                  endTime={"4:00pm"}
                  isDaily={true}
                />
              </Flex>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}
