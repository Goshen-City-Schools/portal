import React from "react";
import PageWrapper from "../../../../components/PageWrapper";
import ReactPortal from "../../../../widgets/React_portal";
import PageSectionHeader from "../../../../components/PageSectionHeader";

import { Flex, Box } from "@chakra-ui/react";
import IconComponent from "../../../../components/Icon.component";
import { MdArrowBack } from "react-icons/md";
import HorizontalScrollableTabs from "../../../../widgets/HorizontalScrollableTabs.widget";

export default function ConfigScreenLayout({
  title,
  tabs,
  activeTab,
  handleTabClick,
}) {
  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader
        pageTitle={`${title} Configuration`}
        pageCrumb={`Home / Config / ${title}`}
      />

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
