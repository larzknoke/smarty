import dynamic from "next/dynamic";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Flex } from "@chakra-ui/react";
const HouseData = dynamic(() => import("@/components/HouseData"), {
  ssr: false,
});

function Housekeeping() {
  const states = [
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR",
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.SOLLTEMPERATUR_HK_1",
  ];

  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={32} mt={40}>
        <HouseData />
      </Flex>
    </TransitionWrapper>
  );
}

export default Housekeeping;
