import React from "react";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";

const Timetable = () => {
  // Define the days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Define the time slots and associated subjects
  const subjectsData = {
    "Monday": {
      "8:00 AM": "Math",
      "9:00 AM": "Science",
      // Add other subjects and hours for Monday
    },
    "Tuesday": {
      "8:00 AM": "English",
      "9:00 AM": "History",
      // Add other subjects and hours for Tuesday
    },
    // Add data for other days
  };

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        Weekly Timetable
      </Heading>
      <Grid
        templateColumns="1fr repeat(5, 1fr)"
        gap={0}
        borderWidth="1px"
        borderColor="gray.300"
        borderBottomWidth="1px"
      >
        <GridItem
          colSpan={1}
          borderRightWidth="1px"
          borderBottomWidth="1px"
          borderColor="gray.300"
          bg={"gray.400"}
          p={2}
        ></GridItem>
        {daysOfWeek.map((day, index) => (
          <GridItem
            key={index}
            colSpan={1}
            textAlign="center"
            borderRightWidth="1px"
            borderBottomWidth="1px"
            borderColor="gray.500"
            bg={"gray.300"}
            p={2}
          >
            {day}
          </GridItem>
        ))}
      </Grid>
      <Grid templateColumns="1fr repeat(5, 1fr)" gap={0}>
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <GridItem
              colSpan={1}
              borderRightWidth="1px"
              borderBottomWidth="1px"
              borderColor="gray.500"
              p={2}
              bg={"gray.300"}
            >
              {time}
            </GridItem>
            {daysOfWeek.map((day, dayIndex) => (
              <GridItem
                key={dayIndex}
                colSpan={1}
                borderRightWidth="1px"
                borderBottomWidth="1px"
                borderColor="gray.500"
                p={2}
              >
                {subjectsData[day] && subjectsData[day][time]
                  ? subjectsData[day][time]
                  : ""}
              </GridItem>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default Timetable;
