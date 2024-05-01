import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import React from "react";
import ContentTabs from "./ContentTabs";
import ContentArea from "./ContentArea";
import {
  HouseLine,
  ListChecks,
  ChargingStation,
  WashingMachine,
  SwimmingPool,
} from "@phosphor-icons/react";
import Header from "./Header";

function Layout({ children }) {
  let tabs = [
    { id: "home", label: <HouseLine size={80} /> },
    { id: "todos", label: <ListChecks size={80} /> },
    { id: "pool", label: <SwimmingPool size={80} /> },
    { id: "pv", label: <ChargingStation size={80} /> },
    { id: "housekeeping", label: <WashingMachine size={80} /> },
  ];

  let [activeTab, setActiveTab] = useState(tabs[0].id);

  function handleTab(id) {
    setActiveTab(id);
  }

  return (
    <VStack p={8} overflow={"hidden"}>
      <Header />
      {children}
      <ContentTabs tabs={tabs} activeTab={activeTab} handleTab={handleTab} />
    </VStack>
  );
}

export default Layout;