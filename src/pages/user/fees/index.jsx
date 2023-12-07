import React from "react";
import { Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { Flex, Button, Box } from "@chakra-ui/react";
import { SearchWidget } from "../../../widgets";

import { MdAdd, MdInventory } from "react-icons/md";
import IconComponent from "../../../components/Icon.component";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import formatCurrency from "../../../helpers/formatCurrency";
import { useUser } from "../../../app/contexts/UserContext";
import { useStudentFee } from "../../../hooks/";

export default function FeesPage() {
  const { feeType } = useSearchParams;
  const { user: student } = useUser();

  if (!feeType) {
    return <Navigate to={"/"} replace={true} />;
  }

  const { fees: feesData } = useFees(feeType);

  //   TODO: Set useStudentFee hook
  const { studentFeeData } = useStudentFee(feeType, student._id, feesData?._id);

  const { feeBalance, feeAmount, totalPaidAmount } = studentFeeData;

  console.log(feesData), feeBalance, feeAmount;

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

      <Box border={"1px solid"} bg={"white"} rounded={"lg"} px={8} py={4}>
        {/* Student Profile Picture */}

        {/* Fee Amount */}
        <Flex>
          <Text>Fee Amount</Text>
          <Text>{formatCurrency(feeAmount)}</Text>
        </Flex>

        {/* Outstanding Balance */}

        <Flex color={"red"}>
          <Text>Total paid:</Text>
          <Text>{formatCurrency(totalPaidAmount)}</Text>
        </Flex>
        {/* Total Payable */}

        <Flex color={"red"} fontWeight={"bold"}>
          <Text>Total Balance</Text>
          <Text>{formatCurrency(feeBalance)}</Text>
        </Flex>
      </Box>
    </PageWrapper>
  );
}
