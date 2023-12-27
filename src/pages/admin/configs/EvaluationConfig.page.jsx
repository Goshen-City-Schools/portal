import { useState } from "react";
import ConfigScreenLayout from "./shared/ConfigScreenLayout";
import ResultsConfigScreen from "../../../screens/config/ResultsConfig.screen";
import ExaminationsConfigScreen from "../../../screens/config/ExaminationsConfig.screen";
import AssessmentTestsConfigScreen from "../../../screens/config/AssessmentTestsConfig.screen";

export default function EvaluationConfigPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Results`,
      component: <ResultsConfigScreen />,
    },
    {
      id: 2,
      label: `Promotion`,
      component: <AssessmentTestsConfigScreen />,
    },
    {
      id: 3,
      label: `Examination`,
      component: <ExaminationsConfigScreen />,
    },
    {
      id: 4,
      label: `Assessment Tests`,
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
      title={"Assessments"}
    />
  );
}
