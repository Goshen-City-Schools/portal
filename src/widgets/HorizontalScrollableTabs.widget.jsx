import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const HorizontalScrollableTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <Flex className="horizontal-scrollable-tabs" overflowX="auto" my={"4"}>
      {tabs.map((tab) => (
        <Box
          key={tab.id}
          p={2}
          py={4}
          flexShrink={0}
          px={4}
          fontSize={"sm"}
          fontWeight={"bold"}
          borderBottom={"3px solid transparent"}
          borderColor={tab.id === activeTab ? "brand.900" : "gray.200"}
          color={tab.id === activeTab ? "brand.900" : "gray.600"}
          cursor="pointer"
          onClick={() => {
            tab.name ? onTabClick(tab.name) : onTabClick(tab.id);
          }}
        >
          {tab.label ? tab.label : tab.name}
        </Box>
      ))}
    </Flex>
  );
};

export default HorizontalScrollableTabs;
