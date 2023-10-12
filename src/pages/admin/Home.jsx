import React from "react";

import { Grid, GridItem, Box } from "@chakra-ui/react";
import CalendarWidget from "../../widgets/Calendar";
import PageWrapper from "../../components/PageWrapper";

export default function AdminHome() {
  return (
    <PageWrapper>
      <Grid templateColumns="repeat(9, 1fr)" gap={4}>
        <GridItem
          w="full"
          colSpan={8}
          h="full"
          bg="brand.100"
          rounded={"lg"}
          p={6}
        >
          SDSDSD Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          atque voluptate excepturi maxime, iste quia magnam ullam beatae
          ratione non aperiam! Reprehenderit, recusandae odio velit voluptate
          blanditiis assumenda at? Optio vel, iusto distinctio ad veritatis
          cumque magnam obcaecati ut quae quas nihil consectetur, perspiciatis
          dolor in ab eius pariatur. Excepturi magni porro rem commodi delectus
          quam, eum ducimus quaerat nemo.
        </GridItem>
        <GridItem w={"full"}>
          <CalendarWidget />
        </GridItem>
      </Grid>
    </PageWrapper>
  );
}
