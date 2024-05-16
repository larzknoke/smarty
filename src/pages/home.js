import { socketConnection, connectSocket } from "@/lib/socketConnection";
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
import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar/Calendar";
function Home() {
  const states = [
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR",
    "0_userdata.0.Pool.BayrolTemp",
    "shelly.0.SHSW-1#E8DB84D48F94#1.uptime",
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
      <Flex direction={"column"} w={"95%"} gap={20} mt={40} px={8}>
        {/* <Text>VALUES: {JSON.stringify(values)}</Text> */}
        <HStack justifyContent={"space-between"}>
          <VStack>
            <Heading size={"4xl"}>
              {values["stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR"]}
            </Heading>
            <Heading size={"xl"}>Wasser</Heading>
          </VStack>
          <VStack>
            <Heading size={"4xl"}>
              {values["0_userdata.0.Pool.BayrolTemp"]}
            </Heading>
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
        <Calendar />
      </Flex>
    </TransitionWrapper>
  );
}

export default Home;
