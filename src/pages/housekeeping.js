import dynamic from "next/dynamic";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Flex } from "@chakra-ui/react";
const HouseData = dynamic(() => import("@/components/HouseData"), {
  ssr: false,
});

function Housekeeping() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={32} mt={40}>
        <HouseData />
      </Flex>
    </TransitionWrapper>
  );
}

export default Housekeeping;
