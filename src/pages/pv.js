import dynamic from "next/dynamic";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Flex } from "@chakra-ui/react";
const PvData = dynamic(() => import("@/components/PvData"), {
  ssr: false,
});

function PV() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={12} mt={32}>
        <PvData />
      </Flex>
    </TransitionWrapper>
  );
}

export default PV;
