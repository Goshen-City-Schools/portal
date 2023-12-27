import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Grid, Box, Text } from "@chakra-ui/react";

export default function WriteDashboard() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Write Dashboard"}
        pageCrumb={"Home / Write"}
      />

      {/* All Announcments */}
      <Box>
        <Text as={"h2"} fontWeight={"bold"} my={2}>
          Announcements
        </Text>

        <Grid></Grid>
      </Box>

      {/* Latest News & Gists */}
      <Box>
        <Text as={"h2"} fontWeight={"bold"} my={2}>
          Latest News
        </Text>
        <Grid></Grid>
      </Box>

      {/* Upcoming Events */}
      <Box>
        <Text as={"h2"} fontWeight={"bold"} my={2}>
          Upcoming Events
        </Text>
        <Grid></Grid>
      </Box>

      {/*  */}
      <Grid></Grid>
    </PageWrapper>
  );
}
