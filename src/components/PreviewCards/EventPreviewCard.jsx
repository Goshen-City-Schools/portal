import React from "react";
import { Box, Text, Flex, Badge, IconButton, Stack } from "@chakra-ui/react";
import { FaRegCalendarAlt, FaRegClock, FaRegBell } from "react-icons/fa";

const EventPreviewCard = ({ event }) => {
  const { eventName, eventDescription, eventDate, eventTime, eventStatus } =
    event;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p="4"
    >
      <Stack mb="2">
        <Text fontWeight="bold">{eventName}</Text>{" "}
        <Badge
          w={"max-content"}
          colorScheme={eventStatus === "active" ? "green" : "red"}
          mr="2"
        >
          {eventStatus?.toLocaleUpperCase()}
        </Badge>
      </Stack>

      <Text color="gray.600" mb="4">
        {eventDescription}
      </Text>

      <Flex flexDirection={"column"} mb="4" gap={2} fontSize={"sm"}>
        <Flex alignItems="center" mr="4">
          <FaRegCalendarAlt />
          <Text ml="2">{eventDate}</Text>
        </Flex>
        <Flex alignItems="center">
          <FaRegClock />
          <Text ml="2">{eventTime}</Text>
        </Flex>
      </Flex>

      <Flex alignItems="center" mb="2">
        <IconButton
          icon={<FaRegBell />}
          colorScheme="teal"
          aria-label="Remind me"
          size="sm"
          mr="2"
        />
        <Text>Remind Me</Text>
      </Flex>

      {/* Add more details or actions as needed */}
    </Box>
  );
};

export default EventPreviewCard;
