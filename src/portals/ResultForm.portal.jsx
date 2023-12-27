import React from "react";

import { Stack } from "@chakra-ui/react";
import PortalTitle from "./shared/PortalTitle";
import ViewResultForm from "../components/forms/ViewResultForm";

export default function ResultFormPortal({ data }) {
  return (
    <Stack w={"full"}>
      <PortalTitle title={"View Class Result"} />

      <ViewResultForm data={data} />
    </Stack>
  );
}
