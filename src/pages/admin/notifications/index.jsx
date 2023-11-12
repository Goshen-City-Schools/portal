import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Text } from "@chakra-ui/react";

export default function NotificationsPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"Home / Notifications "}
        pageTitle={"Notifications"}
      />
    </PageWrapper>
  );
}
