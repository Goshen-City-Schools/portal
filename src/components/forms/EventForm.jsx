import React from "react";

import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useModal } from "../../app/contexts/ModalContext";
import CustomSelect from "../shared/Select.component";

export default function EventForm() {
  const [isPeriodicEvent, setIsPeriodicEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    event_name: "",
    event_description: "",
    event_startDate: "",
    event_endDate: "",
    event_startTime: "",
    event_endTime: "",
    event_period: "",
    event_notification: "",
  });

  const toast = useToast();
  const { closePortal } = useModal();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmitCreateEvent(e) {
    e.preventDefault();

    if (
      !formData.event_name ||
      !formData.event_description ||
      !formData.event_startDate ||
      !formData.event_startTime ||
      !formData.event_notification
    ) {
      toast({
        title: "All event fields are required!",
        position: "top-right",
        status: "error",
        duration: "1100",
      });
      return;
    }

    if (isPeriodicEvent) {
      if (!formData.event_period) {
        toast({
          title: "All event fields are required!",
          position: "top-right",
          status: "error",
          duration: "1100",
        });
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: `${formData.event_name} event created successfully!`,
        position: "top-right",
        status: "success",
        duration: "1200",
      });
      closePortal();
    }, 1600);
  }

  return (
    <form onSubmit={handleSubmitCreateEvent}>
      <Stack spacing={4} mb={4}>
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Name
          </FormLabel>
          <Input
            type="text"
            value={formData.event_name}
            onChange={handleChange}
            name="event_name"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"sm"} fontWeight={"semibold"}>
            Description
          </FormLabel>
          <Textarea
            value={formData.event_description}
            height={"60px"}
            onChange={handleChange}
            name="event_description"
          />
        </FormControl>

        {/* Event Date */}
        <Flex alignItems={"center"} gap={4}>
          <FormControl>
            <FormLabel fontSize={"xs"} fontWeight={"semibold"}>
              Start Date
            </FormLabel>
            <Input
              value={formData.event_startDate}
              type="date"
              size={"sm"}
              onChange={handleChange}
              name="event_startDate"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"xs"} fontWeight={"semibold"}>
              End Date
            </FormLabel>
            <Input
              value={formData.event_endDate}
              type="date"
              size={"sm"}
              onChange={handleChange}
              name="event_endDate"
            />
          </FormControl>
        </Flex>

        {/* Event Time */}
        <Flex alignItems={"center"} gap={4} my={1}>
          <FormControl>
            <FormLabel fontSize={"xs"} fontWeight={"semibold"}>
              Start Time
            </FormLabel>
            <Input
              value={formData.event_startTime}
              type="date"
              size={"sm"}
              onChange={handleChange}
              name="event_startTime"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"xs"} fontWeight={"semibold"}>
              End Time
            </FormLabel>
            <Input
              value={formData.event_endTime}
              type="date"
              size={"sm"}
              onChange={handleChange}
              name="event_endTime"
            />
          </FormControl>
        </Flex>

        <Flex mt={2} justifyContent={"space-between"}>
          <Text as={"p"} fontSize={"sm"} fontWeight={"bold"}>
            Periodically:
          </Text>
          <Switch
            value={isPeriodicEvent}
            onChange={() => setIsPeriodicEvent(!isPeriodicEvent)}
          />
        </Flex>
        {isPeriodicEvent && (
          <CustomSelect
            name="event_period"
            size={"sm"}
            onChange={handleChange}
            value={formData.event_period}
          >
            <option value="">Select Periodic type</option>
            <option value="daily">Daily</option>
            <option value="biWeekly">Bi-weekly (twice a week)</option>
            <option value="weekly">Weekly</option>
            <option value="bimonthly">Bi-monthly (twice a month)</option>
            <option value="monthly">Monthly</option>
            <option value="quaterly">Quaterly (thrice a year)</option>
            <option value="biyearly">Bi-yearly (twice a year)</option>
            <option value="yearly">Yearly</option>
          </CustomSelect>
        )}
        <FormControl
          display={"flex"}
          my={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel flexShrink={0} fontSize={"sm"} fontWeight={"bold"}>
            Send notifications to:
          </FormLabel>

          <CustomSelect
            size={"sm"}
            name="event_notification"
            onChange={handleChange}
            value={formData.event_notification}
          >
            <option value="">-- --</option>
            <option value="all">All</option>
            <option value="students">Students</option>
            <option value="staff">Staff</option>
            <option value="parents">Parents</option>
            <option value="others">Others</option>
          </CustomSelect>
        </FormControl>
        <Button
          colorScheme={"green"}
          w={"max-content"}
          fontSize={"sm"}
          mx={"auto"}
          isLoading={isLoading}
          mt={2}
          type="submit"
        >
          Create Event
        </Button>
      </Stack>
    </form>
  );
}
