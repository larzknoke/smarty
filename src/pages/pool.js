import PoolStream from "@/components/PoolStream";
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

function Pool() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={32} mt={40}>
        <HStack justifyContent={"space-between"}>
          <VStack>
            <Heading size={"4xl"}>7.5</Heading>
            <Heading size={"xl"}>ph</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"}>765</Heading>
            <Heading size={"xl"}>Redox</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"}>28°</Heading>
            <Heading size={"xl"}>Temp. Wasser</Heading>
          </VStack>
        </HStack>
        <HStack justifyContent={"space-around"}>
          <VStack>
            <Heading size={"3xl"}>22°</Heading>
            <Heading size={"xl"}>Temp. Solar</Heading>
          </VStack>
          <VStack>
            <Heading size={"3xl"}>20</Heading>
            <Heading size={"xl"}>Temp. Kessel</Heading>
          </VStack>
        </HStack>
        <VStack alignItems={"flex-start"}>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Heading size={"2xl"} color={"gray.500"}>
              Pumpe
            </Heading>
            <HStack>
              <SolarPanel size={54} className=" text-gray-400" />
              <Heading size={"xl"} color={"gray.500"}>
                3.2 kW{" "}
                <Text color={"green.500"} as={"span"}>
                  +1.5 kw
                </Text>
              </Heading>
            </HStack>
          </HStack>
          <Divider my={6} size="xl" sx={{ borderBottomWidth: "4px" }} />
          <HStack
            justifyContent={"space-between"}
            w={"100%"}
            alignItems={"flex-start"}
          >
            <VStack gap={8}>
              <HStack gap={16}>
                <Heading size={"3xl"}>Stufe 1</Heading>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  sx={{
                    "--switch-track-width": "6rem",
                    "--switch-track-height": "3rem",
                  }}
                />
              </HStack>
              <HStack gap={16}>
                <Heading size={"3xl"}>Stufe 2</Heading>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  sx={{
                    "--switch-track-width": "6rem",
                    "--switch-track-height": "3rem",
                  }}
                />
              </HStack>
              <HStack gap={16}>
                <Heading size={"3xl"}>Stufe 3</Heading>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  sx={{
                    "--switch-track-width": "6rem",
                    "--switch-track-height": "3rem",
                  }}
                />
              </HStack>
            </VStack>
            <VStack alignItems={"flex-start"}>
              <HStack gap={16}>
                <Heading size={"2xl"}>Zeitplan</Heading>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  sx={{
                    "--switch-track-width": "6rem",
                    "--switch-track-height": "3rem",
                  }}
                />
              </HStack>
              <Text fontSize={"3xl"} color={"gray.500"}>
                Aktueller Zeitplan: <br />
                tägl. 8.00-16.00 Uhr
              </Text>
            </VStack>
          </HStack>
        </VStack>
        {/* <PoolStream /> */}
      </Flex>
    </TransitionWrapper>
  );
}

export default Pool;
