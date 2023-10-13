import React from "react";

import { Flex, Text } from "@chakra-ui/react";

import IconComponent from "./Icon.component";

import { PiPencilSimpleLineThin } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";

export default function EventCardComponent({
  eventName,
  startDate,
  endDate,
  startTime,
  endTime,
  isDaily = false,
}) {
  return (
    <Flex
      gap={2}
      alignItems={"center"}
      justifyContent={"space-between"}
      bg={"neutral.300"}
      px={4}
      py={2}
      rounded={"md"}
    >
      <Flex direction="column" w={"full"} gap={1}>
        <Text as={"h3"} fontWeight={"600"} fontSize={"sm"} mb={2}>
          {eventName}
        </Text>

        <Flex
          justifyContent={"start"}
          alignItems={"center"}
          gap={2}
          color={"neutral.700"}
        >
          <IconComponent>
            <LuCalendarDays size={16} />
          </IconComponent>

          <Text as={"small"}>
            {startDate} {endDate && ` - ${endDate}`}
          </Text>
        </Flex>

        <Flex
          justifyContent={"start"}
          alignItems={"center"}
          gap={2}
          color={"neutral.700"}
        >
          <IconComponent>
            <MdAccessTime size={16} />
          </IconComponent>

          <Text as={"small"}>
            {startTime} {endTime && ` - ${endTime}`} {isDaily && ", Daily"}
          </Text>
        </Flex>
      </Flex>

      <IconComponent>
        <PiPencilSimpleLineThin size={18} />
      </IconComponent>
    </Flex>
  );
}
