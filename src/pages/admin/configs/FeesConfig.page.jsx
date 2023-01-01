import { useState } from "react";
import ConfigScreenLayout from "./shared/ConfigScreenLayout";
import {
  TuitionFeeConfigScreen,
  BusFeeConfigScreen,
  BoardingFeeConfigScreen,
} from "../../../screens/config";

export default function FeesConfigPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Tuition`,
      component: <TuitionFeeConfigScreen />,
    },
    {
      id: 2,
      label: `Bus`,
      component: <BusFeeConfigScreen />,
    },
    {
      id: 3,
      label: `Boarding`,
      component: <BoardingFeeConfigScreen />,
    },
  ];

  function handleTabClick(tabId) {
    if (tabId >= 1 && tabId <= tabs.length) {
      setActiveTab(tabId);
    }
  }
  return (
    <ConfigScreenLayout
      tabs={tabs}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
      title={"Fees"}
    />
  );
}
