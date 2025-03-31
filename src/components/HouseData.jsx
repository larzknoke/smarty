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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Lorem,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Broom, Plant, BowlSteam, HardDrives } from "@phosphor-icons/react";

function PoolData() {
  const states = [
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR",
    "stiebel-isg.0.Einstellungen.WARMWASSER.WARMWASSERTEMPERATUREN.val22",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1",
    "stiebel-isg.0.Info.ANLAGE.HEIZUNG.SOLLTEMPERATUR_HK_1",
    "stiebel-isg.0.Einstellungen.BETRIEBSART.val1",
    "stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR",
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

  function getBetriebsart(val) {
    switch (val) {
      case 0:
        return "Notbetrieb";
      case 1:
        return "Bereitschaft";
      case 2:
        return "Programmbetrieb";
      case 3:
        return "Komforrtbetrieb";
      case 4:
        return "Ecobetrieb";
      case 5:
        return "Warmwasserbetrieb";
      default:
        return "Unbekannt";
    }
  }

  function setWpMode(mode) {
    socket?.setState("stiebel-isg.0.Einstellungen.BETRIEBSART.val1", mode);
  }

  function setSollWasserTemp(temp) {
    socket?.setState(
      "stiebel-isg.0.Einstellungen.WARMWASSER.WARMWASSERTEMPERATUREN.val22",
      temp
    );
  }

  return (
    <>
      <VStack>
        <Heading size={"4xl"} color={"green.500"}>
          {getBetriebsart(
            values["stiebel-isg.0.Einstellungen.BETRIEBSART.val1"]
          )}
        </Heading>
        <HStack gap={2}>
          <Heading size={"xl"}>Modus</Heading>
          <WpBetriebsartModal setWpMode={setWpMode} />
        </HStack>
      </VStack>
      <HStack justifyContent={"space-around"}>
        <VStack>
          <Heading size={"4xl"}>
            {values["stiebel-isg.0.Info.ANLAGE.WARMWASSER.ISTTEMPERATUR"]}°
            <Text display={"inline"} fontSize={36}>
              {/* {values["stiebel-isg.0.Einstellungen.WARMWASSER.WARMWASSERTEMPERATUREN.val22"]}° */}
              <SollWasserTempModal
                sollTemp={
                  values["stiebel-isg.0.Info.ANLAGE.WARMWASSER.SOLLTEMPERATUR"]
                }
                setSollWasserTemp={setSollWasserTemp}
              />
            </Text>
          </Heading>
          <Heading size={"xl"}>Temp. Wasser</Heading>
        </VStack>
        <VStack>
          <Heading size={"4xl"}>
            {values["stiebel-isg.0.Info.ANLAGE.HEIZUNG.ISTTEMPERATUR_HK_1"]}°
            <Text display={"inline"} fontSize={36}>
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
      {/* <VStack alignItems={"flex-start"}>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <Heading size={"2xl"} color={"gray.500"}>
            Heizung
          </Heading>
          <HStack>
            <BowlSteam size={54} className=" text-gray-400" />
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
              {getBetriebsart(
                values["stiebel-isg.0.Einstellungen.BETRIEBSART.val1"]
              )}
            </Heading>
            <Heading size={"xl"}>Modus</Heading>
          </VStack>
        </HStack>
      </VStack> */}
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

function WpBetriebsartModal({ setWpMode }) {
  let buttonStylePvMode = {
    // textTransform: "uppercase",
    colorScheme: "gray",
    w: "100%",
    fontSize: "40px",
    height: "80px",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  function modalButton(mode) {
    setWpMode(mode);
    onClose();
  }

  return (
    <>
      <HardDrives onClick={onOpen} size={28} className=" text-gray-800 mt-2" />

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Betriebsart einstellen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={8} my={10}>
              <Button {...buttonStylePvMode} onClick={() => modalButton(0)}>
                Notbetrieb
              </Button>
              <Button {...buttonStylePvMode} onClick={() => modalButton(1)}>
                Bereitschaftsbetrieb
              </Button>
              <Button {...buttonStylePvMode} onClick={() => modalButton(2)}>
                Programmbetrieb
              </Button>
              <Button {...buttonStylePvMode} onClick={() => modalButton(3)}>
                Komfortbetrieb
              </Button>
              <Button {...buttonStylePvMode} onClick={() => modalButton(4)}>
                Eco-Betrieb
              </Button>
              <Button {...buttonStylePvMode} onClick={() => modalButton(5)}>
                Warmwasserbetrieb
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function SollWasserTempModal({ setSollWasserTemp, sollTemp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sollTempNew, setSollTempNew] = useState(sollTemp);

  function handleSave() {
    setSollWasserTemp(sollTempNew);
    onClose();
  }

  useEffect(() => {
    setSollTempNew(sollTemp);
  }, [sollTemp]);

  return (
    <>
      <span onClick={() => onOpen()}>{sollTemp}°</span>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warmwasser einstellen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInput
              size="lg"
              defaultValue={sollTempNew}
              min={0}
              max={100}
              onChange={(val) => setSollTempNew(val)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              onClick={() => handleSave()}
              colorScheme="green"
              size="lg"
              w={"100%"}
              my={6}
            >
              Speichern
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
