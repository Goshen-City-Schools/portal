import { Text, Flex, Box, Button } from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";

import SearchWidget from "../../../../widgets/Search.widget";

import IconComponent from "../../../../components/Icon.component";

import PageWrapper from "../../../../components/PageWrapper";
import { useState } from "react";
import HorizontalScrollableTabs from "../../../../widgets/HorizontalScrollableTabs.widget";
import {
  TuitionFeeTable,
  BoardingFeeTable,
  BusFeeTable,
} from "../../../../components/tables";
import {
  BoardingFeeConfigScreen,
  BusFeeConfigScreen,
  TuitionFeeConfigScreen,
} from "../../../../screens/config";

export default function AllFeesPage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId) => {
    if (tabId >= 1 && tabId <= tabs.length) {
      setActiveTab(tabId);
    }
  };

  const tabs = [
    {
      id: 1,
      label: `Tuition`,
      component: <TuitionFeeConfigScreen />,
    },
    {
      id: 2,
      label: `Boarding`,
      component: <BoardingFeeConfigScreen />,
    },
    { id: 3, label: "Bus", component: <BusFeeConfigScreen /> },
    // Add more tabs as needed
  ];

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
          All Fees
        </Text>
        <Text as={"small"}>Home / Fees</Text>
      </Flex>

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
              <MdAdd />
            </IconComponent>
            Generate Fee Invoice
          </Button>
        </Flex>
      </Flex>

      <HorizontalScrollableTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      <Box py={6} px={4} bg={"white"} rounded={"md"}>
        {tabs[activeTab - 1].component}
      </Box>
    </PageWrapper>
  );
}
