import { useState } from "react";
import ConfigScreenLayout from "./shared/ConfigScreenLayout";
import {
  ClassConfigScreen,
  SessionTermConfigScreen,
  SubjectsConfigScreen,
} from "../../../screens/config";

export default function AcademicsConfigPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Session / Term`,
      component: <SessionTermConfigScreen />,
    },
    {
      id: 2,
      label: `Classes`,
      component: <ClassConfigScreen />,
    },
    {
      id: 3,
      label: `Subjects`,
      component: <SubjectsConfigScreen />,
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
      title={"Academics"}
    />
  );
}
