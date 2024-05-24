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
import { SolarPanel } from "@phosphor-icons/react";

function PoolData() {
  const states = [
    "0_userdata.0.Pool.BayrolPH",
    "0_userdata.0.Pool.BayrolTemp",
    "0_userdata.0.Pool.BayrolRedox",
    "shelly.0.SHSW-1#E8DB84D48F94#1.ext.temperatureC1",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1",
    "modbus.0.inputRegisters.30775_Leistung",
    "shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower",
    "0_userdata.0.Pool.PoolZeitplan",
    "alias.0.Pool.PumpeStufe1",
    "alias.0.Pool.PumpeStufe2",
    "alias.0.Pool.PumpeStufe3",
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
      <HStack justifyContent={"space-between"}>
        <VStack>
          <Heading size={"4xl"}>{values["0_userdata.0.Pool.BayrolPH"]}</Heading>
          <Heading size={"xl"}>ph</Heading>
        </VStack>
        <VStack>
          <Heading size={"4xl"}>
            {values["0_userdata.0.Pool.BayrolRedox"]}
          </Heading>
          <Heading size={"xl"}>Redox</Heading>
        </VStack>
        <VStack>
          <Heading size={"4xl"}>
            {values["0_userdata.0.Pool.BayrolTemp"]}°
          </Heading>
          <Heading size={"xl"}>Temp. Wasser</Heading>
        </VStack>
      </HStack>
      <HStack justifyContent={"space-around"}>
        <VStack>
          <Heading size={"3xl"}>
            {values["shelly.0.SHSW-1#E8DB84D48F94#1.ext.temperatureC1"]}°
          </Heading>
          <Heading size={"xl"}>Temp. Solar</Heading>
        </VStack>
        <VStack>
          <Heading size={"3xl"}>
            {values["stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1"]}°
          </Heading>
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
              {makeNegativeNumberZero(
                (
                  values["modbus.0.inputRegisters.30775_Leistung"] / 1000
                ).toFixed(1)
              )}{" "}
              kWh{" / "}
              <Text
                color={
                  values["shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower"] <
                  0
                    ? "green.500"
                    : "red.500"
                }
                as={"span"}
              >
                {EMValue(
                  values["shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower"]
                )}{" "}
                kWh
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
                isChecked={values["alias.0.Pool.PumpeStufe1"]}
                onChange={() => handleToggle("alias.0.Pool.PumpeStufe1")}
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
                isChecked={values["alias.0.Pool.PumpeStufe2"]}
                onChange={() => handleToggle("alias.0.Pool.PumpeStufe2")}
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
                isChecked={values["alias.0.Pool.PumpeStufe3"]}
                onChange={() => handleToggle("alias.0.Pool.PumpeStufe3")}
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
                isChecked={values["0_userdata.0.Pool.PoolZeitplan"]}
                onChange={() => handleToggle("0_userdata.0.Pool.PoolZeitplan")}
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
    </>
  );
}

export default PoolData;
