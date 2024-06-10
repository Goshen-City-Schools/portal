import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import IconComponent from "../../../components/Icon.component";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";
import AddResultPortal from "../../../portals/shared/AddResult.portal";
import BulkResultForm from "../../../components/forms/BulkResultForm";

export default function UploadResultPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Add New Result"}
        pageCrumb={"Home / Results / New"}
      />

      <div className="mt-8">
        <BulkResultForm />
      </div>
    </PageWrapper>
  );
}
