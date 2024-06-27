import dynamic from "next/dynamic";
import PoolStream from "@/components/PoolStream";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Flex } from "@chakra-ui/react";
const PoolData = dynamic(() => import("@/components/PoolData"), {
  ssr: false,
});

function Pool() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={24} mt={40}>
        <PoolData />
        <PoolStream />
      </Flex>
    </TransitionWrapper>
  );
}

export default Pool;
