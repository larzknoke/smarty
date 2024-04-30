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
import { Broom, Plant } from "@phosphor-icons/react";

function Housekeeping() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"85%"} gap={32} mt={40}>
        <HStack justifyContent={"space-around"}>
          <VStack>
            <Heading size={"4xl"}>43°</Heading>
            <Heading size={"xl"}>Temp. Wasser</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"} color={"green.500"}>
              Komfort
            </Heading>
            <Heading size={"xl"}>Status</Heading>
          </VStack>
        </HStack>
        <HStack justifyContent={"space-around"}>
          <VStack>
            <Heading size={"3xl"}>55 kW</Heading>
            <Heading size={"xl"}>Strom Warmwasser</Heading>
          </VStack>
          <VStack>
            <Heading size={"3xl"}>17 kW</Heading>
            <Heading size={"xl"}>Strom Heizung</Heading>
          </VStack>
        </HStack>
        <VStack alignItems={"flex-start"}>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Heading size={"2xl"} color={"gray.500"}>
              Staubsauger
            </Heading>
            <HStack>
              <Broom size={54} className=" text-gray-400" />
            </HStack>
          </HStack>
          <Divider my={6} size="xl" sx={{ borderBottomWidth: "4px" }} />
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
              <Heading size={"3xl"}>43 %</Heading>
              <Heading size={"xl"}>Batterie</Heading>
            </VStack>
            <VStack alignItems={"flex-start"}>
              <VStack gap={4}>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  sx={{
                    "--switch-track-width": "6rem",
                    "--switch-track-height": "3rem",
                  }}
                />
                <Heading size={"xl"}>Saugen</Heading>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Heading size={"2xl"} color={"gray.500"}>
              Rasenmäher
            </Heading>
            <HStack>
              <Plant size={54} className=" text-gray-400" />
            </HStack>
          </HStack>
          <Divider my={6} size="xl" sx={{ borderBottomWidth: "4px" }} />
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
              <Heading size={"3xl"}>96 %</Heading>
              <Heading size={"xl"}>Batterie</Heading>
            </VStack>
            <VStack alignItems={"flex-start"}>
              <VStack gap={4}>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  sx={{
                    "--switch-track-width": "6rem",
                    "--switch-track-height": "3rem",
                  }}
                />
                <Heading size={"xl"}>Mähen</Heading>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </Flex>
    </TransitionWrapper>
  );
}

export default Housekeeping;
