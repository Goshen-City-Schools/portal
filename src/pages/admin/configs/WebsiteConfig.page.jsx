import React from "react";
import ConfigScreenLayout from "./shared/ConfigScreenLayout";

export default function WebsiteConfigPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Pages`,
      component: <ResultsConfigScreen />,
    },
    {
      id: 2,
      label: `Contents`,
      component: <AssessmentTestsConfigScreen />,
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
      title={"Home Website"}
    />
  );
}
