import { VStack } from "@chakra-ui/react";
import React from "react";
import ContentTabs from "./ContentTabs";

function MainContent() {
  return (
    <VStack p={6}>
      <div>Content</div>
      <ContentTabs />
    </VStack>
  );
}

export default MainContent;
