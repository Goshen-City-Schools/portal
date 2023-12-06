import React from "react";
import PageWrapper from "../../../components/PageWrapper";

import { Flex, Text, Button, Box } from "@chakra-ui/react";
import TransactionsTable from "../../../components/tables/TransactionsTable.component";
import SearchWidget from "../../../widgets/Search.widget";
import IconComponent from "../../../components/Icon.component";

import { MdAdd, MdIcecream } from "react-icons/md";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TransactionHistoryPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
        <Text
          as={"h2"}
          mt={0}
          className=""
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          Transaction History
        </Text>
        <Text as={"small"}>Home / Finance / Transaction History</Text>
      </Flex>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search transaction"} />

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
            Download Report
          </Button>

          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            onClick={() => navigate("/admin/transactions/invoices/new")}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Invoice
          </Button>
        </Flex>
      </Flex>

      {/* ------------ */}

      <Box p={4} bg={"white"} rounded={"md"}>
        <TransactionsTable />
      </Box>
    </PageWrapper>
  );
}
