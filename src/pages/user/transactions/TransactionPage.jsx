import React from "react";
import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import { useParams } from "react-router-dom";
import { useTransaction } from "../../../hooks";

import { GeneralNotFound } from "../../shared";

import { Box, Stack, Text, List, ButtonGroup } from "@chakra-ui/react";
import PrintHeader from "../../../components/Header/PrintHeader";

export default function TransactionPage() {
  const { transactionId } = useParams;

  const { transactionData } = useTransaction(transactionId);

  if (!transactionData) return <GeneralNotFound />;

  return (
    <PageWrapper>
      <PageSectionHeader
        pageCrumb={"My Trasactions"}
        pageTitle={"Home / Transactions"}
      />

      <Box
        className="print"
        bg={"white"}
        w={"full"}
        maxW={"2xl"}
        rounded={"xl"}
      >
        <PrintHeader />

        <Stack className="invoiceBody">
          <Stack>
            <Stack>
              <Text as={"h3"}>Transaction Reference No.</Text>
              <Text as={"h3"}>2134-2321-2322</Text>
            </Stack>
            <Text as={"h3"}>This is not a receipt.</Text>
          </Stack>

          {/* Invoice Information */}
          <Stack>
            <Flex>
              <Text>Name:</Text>
              <Text></Text>
            </Flex>
            <Flex>
              <Text>Purpose of Payment:</Text>
              <Text>SS1 First Term Tuition Fee</Text>
            </Flex>
            <Flex>
              <Text>Payer Email:</Text>
              <Text>SS1 First Term Tuition Fee</Text>
            </Flex>
            <Flex>
              <Text>Phone Number:</Text>
              <Text>SS1 First Term Tuition Fee</Text>
            </Flex>
          </Stack>

          {/* Additional Information */}
          <Stack>
            <List>
              <Text as={"small"}></Text>
              <Text as={"small"}></Text>
            </List>
          </Stack>

          {/* Invoice Action */}

          <ButtonGroup>
            <Button>Print Invoice</Button>
            <Button>Pay</Button>
            <Button>Print Receipt</Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </PageWrapper>
  );
}
