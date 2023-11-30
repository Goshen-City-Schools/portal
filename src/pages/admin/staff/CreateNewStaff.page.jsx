import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Box, useToast } from "@chakra-ui/react";
import { useState } from "react";
import schoolData from "../../../data/school.data";
import AccountCreatedScreen from "../../../screens/AccountCreatedScreen";
import ReactPortal from "../../../widgets/React_portal";
import { useModal } from "../../../app/contexts/ModalContext";
import allowedUserRoles from "../../../helpers/allowedUserRoles";
import { useUser } from "../../../app/contexts/UserContext";
import axios from "../../../api/axios";

import StaffForm from "../../../components/forms/StaffForm";

export default function CreateNewStaff() {
  // const [loading, setLoading] = useState(false);

  return (
    <PageWrapper>
      <ReactPortal />
      <PageSectionHeader
        pageTitle={"Create Staff Account"}
        pageCrumb={"Home / Staff / New"}
      />
      <Box w={"full"} mt={8} maxW={"2xl"} shadow={"sm"} mx={"auto"}>
        <StaffForm staffData={""} schoolData={schoolData} />
      </Box>
    </PageWrapper>
  );
}
