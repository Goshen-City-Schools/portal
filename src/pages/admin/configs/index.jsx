import ReactPortal from "../../../widgets/React_portal";
import { Box, Stack } from "@chakra-ui/react";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import { Link } from "react-router-dom";

export default function ConfigPage() {
  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader
        pageTitle={"Configuration"}
        pageCrumb={"Home / Configure"}
      />

      <Box>
        <Grid
          gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
          mt="4"
          gap={4}
          w="full"
          overflowX="auto"
        >
          {" "}
          <Stack>
            <Link to={"/admin/config/academics"}>Academic Data</Link>
          </Stack>
          <Stack>
            <Link to={"/admin/config/staff"}>Staff</Link>
          </Stack>
          <Stack>
            <Link to={"/admin/config/fees"}>Payments</Link>
          </Stack>
          <Stack>
            <Link to={"/admin/config/evaluation"}>Evualation</Link>
          </Stack>
          <Stack>
            <Link to={"/admin/config/promotion"}>Promotion</Link>
          </Stack>
          <Stack>
            <Link to={"/admin/config/messaging"}>Messaging</Link>
          </Stack>
        </Grid>
      </Box>
    </PageWrapper>
  );
}
