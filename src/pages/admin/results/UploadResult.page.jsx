import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import IconComponent from "../../../components/Icon.component";
import { MdAdd, MdIcecream, MdUploadFile } from "react-icons/md";

export default function UploadResultPage() {
  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={"Upload Results"}
        pageCrumb={"Home / Results / Upload Results"}
      />

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <div></div>
        <Flex gap={4} fontSize={"sm"}>
          <Button
            size={"sm"}
            bg={"neutral.100"}
            border={"1px"}
            borderColor={"brand.700"}
          >
            <IconComponent>
              <MdIcecream />
            </IconComponent>{" "}
            Download Result Sheet Format
          </Button>
          <Button
            as={"Flex"}
            gap={2}
            size={"sm"}
            bg={"accent.700"}
            color={"white"}
          >
            <IconComponent>
              <MdUploadFile />
            </IconComponent>{" "}
            Add Result
          </Button>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            onClick={() => openPortal(<CreateStudentPortal />)}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            Bulk Upload Results
          </Button>
        </Flex>
      </Flex>
    </PageWrapper>
  );
}
