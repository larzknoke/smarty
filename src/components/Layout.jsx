import { useState } from "react";
import { VStack, Box } from "@chakra-ui/react";
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
import { useIdle } from "@uidotdev/usehooks";

function Layout({ children }) {
  const idle = useIdle(20000);

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
    <VStack p={8} overflow={"hidden"} id="AppWrapper">
      <Box
        bg="black"
        opacity={idle ? 0.7 : 0}
        position={"fixed"}
        bottom={idle ? 0 : "100%"}
        left={0}
        right={0}
        top={0}
        zIndex={idle ? 999 : -999}
        visibility={idle ? "visible" : "hidden"}
        transition={"all 400ms ease-in-out"}
      />
      <Header />
      {children}
      <ContentTabs tabs={tabs} activeTab={activeTab} handleTab={handleTab} />
    </VStack>
  );
}

export default Layout;
