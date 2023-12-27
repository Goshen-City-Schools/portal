import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import {
  Text,
  Flex,
  Box,
  Button,
  Grid,
  Select,
  HStack,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";
import schoolData from "../../../data/school.data";
import { useState } from "react";

import PageSectionHeader from "../../../components/PageSectionHeader";
import DataViewSwitcher from "../../../widgets/DataViewSwitcher";
import AllEventsTable from "../../../components/tables/AllEventsTable";
import CreateEventPortal from "../../../portals/CreateEvent.portal";
import { useModal } from "../../../app/contexts/ModalContext";
import EventPreviewCard from "../../../components/PreviewCards/EventPreviewCard";

export default function AllEventsPage() {
  const { openPortal } = useModal();
  const [dataView, setDataView] = useState("grid");

  const events = [
    {
      eventName: "Fidelity Bank",
      eventDescription: "Goshen Group of Schools",
      eventDate: "8783728378",
      eventTime: "8783728378",
      eventFrequency: "8783728378",
      eventFrequency: "8783728378",
      eventStatus: false,
    },
  ];

  function handleDataView(e) {
    e.preventDefault;
    setDataView(() => e);
  }
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"All Events"}
        pageCrumb={"Home / Events "}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search staff"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            onClick={() => {
              openPortal(<CreateEventPortal />);
            }}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Event
          </Button>
        </Flex>
      </Flex>

      <Box py={6} pb={10}>
        <AllEventsTable events={events} />
      </Box>
    </PageWrapper>
  );
}
