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
          px={4}
          fontSize={"sm"}
          fontWeight={"bold"}
          borderBottom={"3px solid transparent"}
          borderColor={tab.id === activeTab ? "brand.900" : "gray.200"}
          color={tab.id === activeTab ? "brand.900" : "gray.600"}
          cursor="pointer"
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </Box>
      ))}
    </Flex>
  );
};

export default HorizontalScrollableTabs;
