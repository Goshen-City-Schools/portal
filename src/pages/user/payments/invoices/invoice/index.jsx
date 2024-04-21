import React from "react";
import PageWrapper from "../../../../../components/PageWrapper";
import PrintHeader from "../../../../../components/Header/PrintHeader";
import PageSectionHeader from "../../../../../components/PageSectionHeader";

import { Flex, Stack, Text, List, ButtonGroup, Button } from "@chakra-ui/react";

export default function UserInvoicePage() {
  return (
    // Add print option
    <PageWrapper>
      <PageSectionHeader
        pageTitle={`Generate Invoice`}
        pageCrumb={`Home / Invoices / New`}
      />

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
    </PageWrapper>
  );
}
