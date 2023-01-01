import React from "react";

import ReactPortal from "../../../widgets/React_portal";
import HorizontalScrollableTabs from "../../../widgets/HorizontalScrollableTabs.widget";
import { Flex, Box, Stack, Button } from "@chakra-ui/react";

import { MdAdd, MdArrowBack } from "react-icons/md";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import { useState } from "react";
import { AllBankAccountsTable } from "../../../components/tables";
import PaymentMethods from "../../../screens/config/PaymentMethodsConfig.screen";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Account Information`,
      component: (
        <Stack>
          <Button
            mb={4}
            ml={"auto"}
            size={"sm"}
            colorScheme={"blue"}
            leftIcon={<MdAdd />}
            onClick={() => navigate("/admin/students/new")}
          >
            Add Bank Account
          </Button>
          <AllBankAccountsTable />
        </Stack>
      ),
    },
    {
      id: 2,
      label: `Payment Methods`,
      component: <PaymentMethods />,
    },

    // Add more tabs as needed
  ];

  function handleTabClick(tabId) {
    if (tabId >= 1 && tabId <= tabs.length) {
      setActiveTab(tabId);
    }
  }
  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader pageTitle={"Finance"} pageCrumb={"Home / Finance"} />

      <Flex alignItems={"center"} gap={4}>
        <IconComponent
          classes={"cursor-pointer"}
          click={() => window.history.back(-1)}
        >
          <MdArrowBack size={24} />
        </IconComponent>
        <HorizontalScrollableTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </Flex>

      <Box py={6} px={4} bg={"white"} rounded={"md"}>
        {tabs[activeTab - 1].component}
      </Box>
    </PageWrapper>
  );
}
