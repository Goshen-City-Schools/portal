import React from "react";
import { useSearchParams } from "react-router-dom";

import { Flex, Button, Box } from "@chakra-ui/react";
import { SearchWidget } from "../../../widgets";

import { MdAdd, MdInventory } from "react-icons/md";
import IconComponent from "../../../components/Icon.component";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import { useUser } from "../../../app/contexts/UserContext";
import { useFees, useStudentFee } from "../../../hooks/";

export default function FeesPage() {
  const { feeType } = useSearchParams;
  const { user: student } = useUser();

  const { fees: feesData } = useFees(feeType);

  //   TODO: Set useStudentFee hook

  return (
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`${feeType} Fee`}
        pageCrumb={`Home / Fees / ${feeType}`}
      />

      {/*  */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search Fees"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button bg={"brand.700"} size={"sm"} color={"neutral.100"}>
            <IconComponent>
              <MdInventory />
            </IconComponent>
            Payments History
          </Button>

          <Button bg={"brand.700"} size={"sm"} color={"neutral.100"}>
            <IconComponent>
              <MdAdd />
            </IconComponent>
            Generate Invoice
          </Button>
        </Flex>
      </Flex>

      {/*  */}

      {/* Fee Detail Sheet */}

      <Box
        border={"1px solid"}
        bg={"white"}
        rounded={"lg"}
        px={8}
        py={4}
        fontWeight={"bold"}
      ></Box>
    </PageWrapper>
  );
}
