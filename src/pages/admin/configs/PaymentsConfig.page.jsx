import { useState } from "react";
import {
  PaymentMethodsConfigScreen,
  BankAccountsConfigScreen,
} from "../../../screens/config";
import ConfigScreenLayout from "./shared/ConfigScreenLayout";
import FeesConfigScreen from "../../../screens/config/FeesConfig.screen";

export default function PaymentsConfigPage() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: `Fees`,
      component: <FeesConfigScreen />,
    },
    {
      id: 2,
      label: `Bank Accounts`,
      component: <BankAccountsConfigScreen />,
    },
    {
      id: 3,
      label: `Payment Methods`,
      component: <PaymentMethodsConfigScreen />,
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
      title={"Payments"}
    />
  );
}
