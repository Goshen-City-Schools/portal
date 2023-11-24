import { useEffect } from "react";

import { Text, Flex, Box, Button } from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";

import SearchWidget from "../../../../widgets/Search.widget";

import IconComponent from "../../../../components/Icon.component";

import PageWrapper from "../../../../components/PageWrapper";
import { useModal } from "../../../../app/contexts/ModalContext";
import AddNewFeeTypePortal from "../../../../portals/AddNewFeeType.portal";
import { useState } from "react";
import HorizontalScrollableTabs from "../../../../widgets/HorizontalScrollableTabs.widget";
import TuitionFeeTable from "../../../../components/tables/fees/TuitionFee.table";
import BoardingFeeTable from "../../../../components/tables/fees/BoardingFee.table";
import BusFeeTable from "../../../../components/tables/fees/BusFee.table";

export default function AllFeesPage() {
  const [activeTab, setActiveTab] = useState(1);
  const { openPortal } = useModal();

  const handleTabClick = (tabId) => {
    if (tabId >= 1 && tabId <= tabs.length) {
      setActiveTab(tabId);
    }
  };

  const tabs = [
    {
      id: 1,
      label: `Tuition`,
      component: <TuitionFeeTable />,
    },
    {
      id: 2,
      label: `Boarding`,
      component: <BoardingFeeTable />,
    },
    { id: 3, label: "Bus", component: <BusFeeTable /> },
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
        <Text as={"small"}>Home / Staff / All Staff</Text>
      </Flex>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={8}
        mb={6}
      >
        <SearchWidget height={10} text={"Search staff"} />

        <Flex gap={4} fontSize={"sm"}>
          <Button
            bg={"brand.700"}
            size={"sm"}
            color={"neutral.100"}
            onClick={() => {
              openPortal(<AddNewFeeTypePortal />);
            }}
          >
            <IconComponent>
              <MdAdd />
            </IconComponent>
            New Fee Type
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
