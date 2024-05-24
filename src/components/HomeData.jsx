import { socketConnection, connectSocket } from "@/lib/socketConnection";
import { useState, useEffect } from "react";
import { EMValue, makeNegativeNumberZero } from "@/lib/utils";
import { Text, Flex, HStack, Heading, VStack, Image } from "@chakra-ui/react";
import Trash from "./Trash";

function HomeData() {
  const states = [
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR",
    "0_userdata.0.Pool.BayrolTemp",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1",
    "modbus.0.inputRegisters.30775_Leistung",
    "shelly.0.SHEM-3#E8DB84D68ECE#1.Total.InstantPower",
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.SOLLTEMPERATUR_HK_1",
    "trashschedule.0.type.biotonne.daysLeft",
    "trashschedule.0.type.gelberSack.daysLeft",
    "trashschedule.0.type.papiertonne.daysLeft",
    "trashschedule.0.type.restabfalltonne.daysLeft",
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

  return (
    <>
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
              {values["stiebel-isg.0.Info.ANLAGE.HEIZUNG.SOLLTEMPERATUR_HK_1"]}°
            </Text>
          </Heading>
          <Heading size={"xl"}>Heizung</Heading>
        </VStack>
      </HStack>
      <HStack justifyContent={"space-around"}>
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
              (values["modbus.0.inputRegisters.30775_Leistung"] / 1000).toFixed(
                1
              )
            )}{" "}
            kW
          </Heading>
          <Heading size={"xl"}>Leistung</Heading>
        </VStack>
      </HStack>
      <Trash
        rest={values["trashschedule.0.type.restabfalltonne.daysLeft"]}
        bio={values["trashschedule.0.type.biotonne.daysLeft"]}
        gelb={values["trashschedule.0.type.gelberSack.daysLeft"]}
        papier={values["trashschedule.0.type.papiertonne.daysLeft"]}
      />
    </>
  );
}

export default HomeData;
