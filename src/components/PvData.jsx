import { socketConnection, connectSocket } from "@/lib/socketConnection";
import { useState, useEffect } from "react";
import { EMValue, makeNegativeNumberZero } from "@/lib/utils";
import {
  Button,
  Text,
  Flex,
  HStack,
  Heading,
  VStack,
  Image,
  Divider,
  Switch,
  RadioGroup,
  Radio,
  ButtonGroup,
} from "@chakra-ui/react";
import { Car } from "@phosphor-icons/react";

let buttonStylePvMode = {
  textTransform: "uppercase",
  colorScheme: "teal",
  w: "100%",
  fontSize: "40px",
  height: "80px",
  px: "20px",
};

function PoolData() {
  const states = [
    "modbus.0.inputRegisters.30775_Leistung",
    "shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower",
    "modbus.0.inputRegisters.30535_Tagesertrag",
    "evcc.0.loadpoint.1.status.connected",
    "evcc.0.loadpoint.1.status.charging",
    "evcc.0.loadpoint.1.status.chargePower",
    "evcc.0.loadpoint.1.status.mode",
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

  function setPvMode(val) {
    // socket?.setState(val, !values[val]);
    console.log("PV Mode", val);
    switch (val) {
      case "off":
        socket?.setState("evcc.0.loadpoint.1.control.off", 1);
        break;
      case "pv":
        socket?.setState("evcc.0.loadpoint.1.control.pv", 1);
        break;
      case "minpv":
        socket?.setState("evcc.0.loadpoint.1.control.min", 1);
        break;
      case "now":
        socket?.setState("evcc.0.loadpoint.1.control.now", 1);
        break;
    }
  }

  return (
    <>
      <HStack justifyContent={"space-around"}>
        <VStack>
          <Heading size={"4xl"}>
            {makeNegativeNumberZero(
              (values["modbus.0.inputRegisters.30775_Leistung"] / 1000).toFixed(
                1
              )
            )}{" "}
            kWh
          </Heading>
          <Heading size={"xl"}>akt. Leistung</Heading>
        </VStack>
        <VStack>
          <Heading
            size={"4xl"}
            color={
              values["shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower"] < 0
                ? "green.500"
                : "red.500"
            }
          >
            {EMValue(
              values["shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower"]
            )}{" "}
            kWh
          </Heading>
          <Heading size={"xl"}>3EM</Heading>
        </VStack>
      </HStack>
      <HStack justifyContent={"space-around"}>
        <VStack>
          <Heading size={"3xl"}>
            {(
              values["modbus.0.inputRegisters.30535_Tagesertrag"] / 1000
            ).toFixed(1)}{" "}
            kW
          </Heading>
          <Heading size={"xl"}>Tagesertrag</Heading>
        </VStack>
        <VStack>
          <Heading size={"3xl"}>-- kW</Heading>
          <Heading size={"xl"}>Tagesverbrauch</Heading>
        </VStack>
      </HStack>
      <VStack alignItems={"flex-start"}>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <Heading size={"2xl"} color={"gray.500"}>
            Auto
          </Heading>
          <HStack>
            {values["evcc.0.loadpoint.1.status.connected"] ? (
              <Heading size={"xl"} color={"green.500"}>
                verbunden
              </Heading>
            ) : (
              <Heading size={"xl"} color={"red.500"}>
                nicht verbunden
              </Heading>
            )}
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
              {values["evcc.0.loadpoint.1.status.charging"] ? (
                <Heading size={"3xl"} color={"green.500"}>
                  Lädt
                </Heading>
              ) : (
                <Heading size={"3xl"} color={"red.500"}>
                  Lädt nicht
                </Heading>
              )}{" "}
              <Heading size={"xl"}>Status</Heading>
            </VStack>
            <VStack>
              <Heading size={"3xl"}>
                {" "}
                {(
                  values["evcc.0.loadpoint.1.status.chargePower"] / 1000
                ).toFixed(1)}{" "}
                kW
              </Heading>
              <Heading size={"xl"}>Leistung</Heading>
            </VStack>
            <VStack>
              <Heading size={"3xl"}>43 %</Heading>
              <Heading size={"xl"}>Batterie</Heading>
            </VStack>
          </HStack>
          <HStack w={"100%"}>
            <VStack gap={8} w={"100%"} my={16}>
              <ButtonGroup
                spacing="6"
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Button
                  {...buttonStylePvMode}
                  variant={
                    values["evcc.0.loadpoint.1.status.mode"] === "off"
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => setPvMode("off")}
                >
                  Aus
                </Button>
                <Button
                  {...buttonStylePvMode}
                  variant={
                    values["evcc.0.loadpoint.1.status.mode"] === "pv"
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => setPvMode("pv")}
                >
                  PV
                </Button>
                <Button
                  {...buttonStylePvMode}
                  variant={
                    values["evcc.0.loadpoint.1.status.mode"] === "minpv"
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => setPvMode("minpv")}
                >
                  Min+PV
                </Button>
                <Button
                  {...buttonStylePvMode}
                  variant={
                    values["evcc.0.loadpoint.1.status.mode"] === "now"
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => setPvMode("now")}
                >
                  Sofort
                </Button>
              </ButtonGroup>
              <Heading size={"xl"}>Lade-Modus</Heading>
            </VStack>
          </HStack>
          {/* <HStack>
            <RadioGroup onChange={setPvMode}>
              <HStack>
                <Radio size="lg" value="aus">
                  Aus
                </Radio>
                <Radio size="lg" value="pv">
                  PV
                </Radio>
                <Radio size="lg" value="minpv">
                  Min+PV
                </Radio>
                <Radio size="lg" value="schnell">
                  Schnell
                </Radio>
              </HStack>
            </RadioGroup>
          </HStack> */}
          {/* <HStack
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
          </HStack> */}
        </VStack>
      </VStack>
    </>
  );
}

export default PoolData;
