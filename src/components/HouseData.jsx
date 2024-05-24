import { socketConnection, connectSocket } from "@/lib/socketConnection";
import { useState, useEffect } from "react";
import { EMValue, makeNegativeNumberZero } from "@/lib/utils";
import {
  Text,
  Flex,
  HStack,
  Heading,
  VStack,
  Image,
  Divider,
  Switch,
} from "@chakra-ui/react";
import { Broom, Plant } from "@phosphor-icons/react";

function PoolData() {
  const states = [
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR",
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.SOLLTEMPERATUR_HK_1",
  ];

  const [socket, setSocket] = useState();
  const [values, setValues] = useState({});

  async function setConnection() {
    const connection = await connectSocket(socketConnection);
    setSocket(connection);
  }

  useEffect(() => {
    setConnection();
  }, []);

  useEffect(() => {
    if (socket?.isConnected) {
      socket?.subscribeState(states, (id, state) => {
        setValues((prevState) => ({
          ...prevState,
          [id]: state?.val || 0,
        }));
      });
    }

    return () => socket?.unsubscribeState(states);
  }, [socket]);

  function handleToggle(val) {
    socket?.setState(val, !values[val]);
  }

  return (
    <>
      <HStack justifyContent={"space-around"}>
        <VStack>
          <Heading size={"4xl"}>
            {values["stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR"]}°
            <Text display={"inline"} fontSize={28}>
              {values["stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR"]}°
            </Text>
          </Heading>
          <Heading size={"xl"}>Temp. Wasser</Heading>
        </VStack>
        <VStack>
          <Heading size={"4xl"}>
            {values["stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1"]}°
            <Text display={"inline"} fontSize={28}>
              {values["stiebel-isg.0.Info.ANLAGE.HEIZUNG.SOLLTEMPERATUR_HK_1"]}°
            </Text>
          </Heading>
          <Heading size={"xl"}>Temp. Heizung</Heading>
        </VStack>
      </HStack>
      <HStack justifyContent={"space-around"}>
        <VStack>
          <Heading size={"3xl"}>-- kW</Heading>
          <Heading size={"xl"}>Strom Warmwasser</Heading>
        </VStack>
        <VStack>
          <Heading size={"3xl"}>-- kW</Heading>
          <Heading size={"xl"}>Strom Heizung</Heading>
        </VStack>
      </HStack>
      <VStack alignItems={"flex-start"} opacity={0.3}>
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
      <VStack alignItems={"flex-start"} opacity={0.3}>
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
    </>
  );
}

export default PoolData;
