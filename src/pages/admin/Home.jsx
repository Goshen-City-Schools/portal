import React from "react";

import { Text, Grid, GridItem, Box, Flex } from "@chakra-ui/react";
import CalendarWidget from "../../widgets/Calendar";
import PageWrapper from "../../components/PageWrapper";
import IconComponent from "../../components/Icon.component";

import { IoMdAdd } from "react-icons/io";
import EventCardComponent from "../../components/EventCard.component";
import formatDate from "../../utilities/formatDate.utils";
import StatCardComponent from "../../components/StatCard.component";
import ChartWidget from "../../widgets/Chart.widget";
import NewStudentsTable from "../../components/tables/NewStudentsTable.component";
import CustomSelect from "../../components/shared/Select.component";

export default function AdminHome() {
  return (
    <PageWrapper>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Text
          as={"h2"}
          mt={0}
          className=""
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          Overview
        </Text>
        <Text as={"small"}>Home</Text>
      </Flex>

      <Grid templateColumns="repeat(9, 1fr)" gap={4}>
        <GridItem
          w="full"
          colSpan={8}
          h="full"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          <Flex justifyContent={"space-between"} gap={4}>
            <StatCardComponent
              color={"#F5DDFF"}
              imgSrc={"people.png"}
              text={"Total students:"}
              number={123}
            />
            <StatCardComponent
              color={"#DCECFF"}
              imgSrc={"teacher.png"}
              text={"Total Staff:"}
              number={79}
            />
            <StatCardComponent
              color={"#FFF2DB"}
              imgSrc={"book.png"}
              text={"Total Subjects:"}
              number={79}
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
              <Flex gap={2} alignItems={"center"}>
                <CustomSelect>
                  <option value="option1">Paid</option>
                  <option value="option2" selected>
                    Unpaid
                  </option>
                </CustomSelect>
                <CustomSelect>
                  <option value="option1">School Fees</option>
                  <option value="option2">Bus Fees</option>
                  <option value="option3">Hostel Fees</option>
                </CustomSelect>
              </Flex>{" "}
            </Flex>

            <ChartWidget
              labels={["Cre", "Nur", "Pri", "JSS", "SSS"]}
              data1={[47, 58, 45, 44, 56]}
              data2={[21, 12, 64, 56, 54]}
            />
          </Box>

          {/* Student Admission Report  */}
          <Box p={4} bg={"white"} rounded={"md"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text
                as={"h3"}
                mt={0}
                className=""
                fontSize={"md"}
                fontWeight={"bold"}
                color={"neutral.700"}
                mb={6}
              >
                Newly Admitted Students
              </Text>
              <Flex gap={2} alignItems={"center"}>
                <CustomSelect>
                  <option value="option1">Today</option>
                  <option value="option2">Today</option>
                  <option value="option3"> This Week</option>
                  <option value="option4" selected>
                    First Term
                  </option>
                  <option value="option5">2023 / 2024</option>
                </CustomSelect>
              </Flex>{" "}
            </Flex>

            <NewStudentsTable />
          </Box>
        </GridItem>

        <GridItem w={"full"} flexShrink={0}>
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
                  height={"40px"}
                  width={"40px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg={"accent.700"}
                  rounded={"lg"}
                  fontWeight={"bold"}
                  color={"white"}
                >
                  <IconComponent>
                    <IoMdAdd size={18} />{" "}
                  </IconComponent>{" "}
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
