import React from "react";

import ReactPortal from "../../../widgets/ReactPortal";
import HorizontalScrollableTabs from "../../../widgets/HorizontalScrollableTabs.widget";

import { MdArrowBack } from "react-icons/md";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import IconComponent from "../../../components/Icon.component";
import { useState } from "react";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Recent Transactions `,
      component: "TAB 1 Component",
    },
    {
      id: 2,
      label: `Account Information`,
      component: "TAB 2 Component",
    },
    { id: 3, label: "Payment Methods", component: "TAB 3 Component" },
    { id: 4, label: "Attendance", component: "TAB 4 Component" },
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
    </PageWrapper>
  );
}
