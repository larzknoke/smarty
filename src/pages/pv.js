import TransitionWrapper from "@/components/TransitionWrapper";
import {
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  Divider,
  Switch,
} from "@chakra-ui/react";
import { Car } from "@phosphor-icons/react";

function PV() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={32} mt={40}>
        <HStack justifyContent={"space-around"}>
          <VStack>
            <Heading size={"4xl"}>8.5 kWh</Heading>
            <Heading size={"xl"}>akt. Leistung</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"} color={"green.500"}>
              +1.2 kWh
            </Heading>
            <Heading size={"xl"}>3EM</Heading>
          </VStack>
        </HStack>
        <HStack justifyContent={"space-around"}>
          <VStack>
            <Heading size={"3xl"}>55 kW</Heading>
            <Heading size={"xl"}>Tagesertrag</Heading>
          </VStack>
          <VStack>
            <Heading size={"3xl"}>17 kW</Heading>
            <Heading size={"xl"}>Tagesverbrauch</Heading>
          </VStack>
        </HStack>
        <VStack alignItems={"flex-start"}>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Heading size={"2xl"} color={"gray.500"}>
              Auto
            </Heading>
            <HStack>
              <Car size={54} className=" text-gray-400" />
            </HStack>
          </HStack>
          <Divider my={6} size="xl" sx={{ borderBottomWidth: "4px" }} />
          <VStack width={"100%"} gap={10}>
            <HStack
              justifyContent={"space-between"}
              w={"100%"}
              alignItems={"flex-start"}
            >
              <VStack>
                <Heading size={"3xl"} color={"green.500"}>
                  Lädt
                </Heading>
                <Heading size={"xl"}>Status</Heading>
              </VStack>
              <VStack>
                <Heading size={"3xl"}>4 kWh</Heading>
                <Heading size={"xl"}>Leistung</Heading>
              </VStack>
              <VStack>
                <Heading size={"3xl"}>43 %</Heading>
                <Heading size={"xl"}>Batterie</Heading>
              </VStack>
            </HStack>
            <HStack
              justifyContent={"space-between"}
              w={"100%"}
              alignItems={"flex-start"}
            >
              <VStack alignItems={"flex-start"}>
                <HStack gap={16}>
                  <Heading size={"2xl"}>Laden</Heading>
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
        </VStack>
        {/* <PoolStream /> */}
      </Flex>
    </TransitionWrapper>
  );
}

export default PV;
