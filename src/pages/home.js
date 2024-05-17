import { socketConnection, connectSocket } from "@/lib/socketConnection";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Text, Flex, HStack, Heading, VStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar/Calendar";
import { EMValue, makeNegativeNumberZero } from "@/lib/utils";
function Home() {
  const states = [
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR",
    "0_userdata.0.Pool.BayrolTemp",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1",
    "modbus.0.inputRegisters.30775_Leistung",
    "shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower",
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR",
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
        // console.log("change", state);
        // console.log("id", id);
        setValues((prevState) => ({
          ...prevState,
          [id]: state?.val || 0,
        }));
      });
    }

    return () => socket?.unsubscribeState(states);
  }, [socket]);

  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"95%"} gap={16} mt={40} px={8}>
        {/* <Text>VALUES: {JSON.stringify(values)}</Text> */}
        <HStack justifyContent={"space-between"}>
          <VStack>
            <Heading size={"4xl"}>
              {values["stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR"]}°
              <Text display={"inline"} fontSize={28}>
                {values["stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR"]}°
              </Text>
            </Heading>
            <Heading size={"xl"}>Wasser</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"}>
              {values["0_userdata.0.Pool.BayrolTemp"]}°
            </Heading>
            <Heading size={"xl"}>Pool</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"}>
              {values["stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1"]}°
              <Text display={"inline"} fontSize={28}>
                {
                  values[
                    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.SOLLTEMPERATUR_HK_1"
                  ]
                }
                °
              </Text>
            </Heading>
            <Heading size={"xl"}>Heizung</Heading>
          </VStack>
        </HStack>
        <HStack justifyContent={"space-around"} mb={6}>
          <VStack>
            <Heading
              size={"3xl"}
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
          <VStack>
            <Heading size={"3xl"}>
              {makeNegativeNumberZero(
                values["modbus.0.inputRegisters.30775_Leistung"]
              )}{" "}
              kW
            </Heading>
            <Heading size={"xl"}>Leistung</Heading>
          </VStack>
        </HStack>
        <Calendar />
        <HStack gap={10} alignSelf={"center"}>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={`/avatars/alle2.png`}
            borderColor={"blue.500"}
            borderWidth={4}
            borderStyle={"solid"}
          />
          <Image
            borderRadius="full"
            boxSize="110px"
            src={`/avatars/lk.jpg`}
            borderColor={"blue.500"}
            borderWidth={0}
            borderStyle={"solid"}
          />
          <Image borderRadius="full" boxSize="110px" src={`/avatars/sk.jpg`} />
          <Image borderRadius="full" boxSize="110px" src={`/avatars/jk.jpg`} />
          <Image borderRadius="full" boxSize="110px" src={`/avatars/nk.jpg`} />
        </HStack>
      </Flex>
    </TransitionWrapper>
  );
}

export default Home;
