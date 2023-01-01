import { useState } from "react";
import ConfigScreenLayout from "./shared/ConfigScreenLayout";
import {
  StaffConfigScreen,
  StaffRolesConfigScreen,
} from "../../../screens/config";

export default function StaffRolesConfigPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Staff`,
      component: <StaffConfigScreen />,
    },
    {
      id: 2,
      label: `Roles`,
      component: <StaffRolesConfigScreen />,
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
      title={"Staff Roles"}
    />
  );
}
