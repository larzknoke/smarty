import TransitionWrapper from "@/components/TransitionWrapper";
import {
  Text,
  Flex,
  Switch,
  HStack,
  Heading,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { SolarPanel } from "@phosphor-icons/react";
function Home() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={20} mt={40} px={8}>
        <HStack justifyContent={"space-between"}>
          <VStack>
            <Heading size={"4xl"}>48°</Heading>
            <Heading size={"xl"}>Wasser</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"}>28°</Heading>
            <Heading size={"xl"}>Pool</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"}>22°</Heading>
            <Heading size={"xl"}>Heizung</Heading>
          </VStack>
        </HStack>
        <HStack justifyContent={"space-around"}>
          <VStack>
            <Heading size={"3xl"} color={"green.500"}>
              +1.2 kWh
            </Heading>
            <Heading size={"xl"}>3EM</Heading>
          </VStack>
          <VStack>
            <Heading size={"3xl"}>6.5 kW</Heading>
            <Heading size={"xl"}>Leistung</Heading>
          </VStack>
        </HStack>
      </Flex>
    </TransitionWrapper>
  );
}

export default Home;
