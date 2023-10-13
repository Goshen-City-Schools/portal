import React from "react";

import { Grid, GridItem, Box } from "@chakra-ui/react";
import CalendarWidget from "../../widgets/Calendar";
import PageWrapper from "../../components/PageWrapper";

import { Text } from "@chakra-ui/react";

export default function AdminHome() {
  return (
    <PageWrapper>
      <Grid templateColumns="repeat(9, 1fr)" gap={4}>
        <GridItem w="full" colSpan={8} h="full" rounded={"lg"}>
          <Text
            as={"h2"}
            mt={0}
            className=""
            fontSize={"2xl"}
            fontWeight={"bold"}
          >
            Overview
          </Text>
        </GridItem>
        <GridItem w={"full"}>
          <CalendarWidget />
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}
