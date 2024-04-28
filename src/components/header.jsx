import {
  List as ListIcon,
  Gear as GearIcon,
  WifiHigh as WifiHighIcon,
} from "@phosphor-icons/react";
import Weather from "./Weather";
import Clock from "./Clock";
import { Flex, Spacer, VStack } from "@chakra-ui/react";

function Header() {
  return (
    <VStack gap={6} w={"full"}>
      <Flex gap={5} w={"full"}>
        <ListIcon size={32} />
        <Spacer />
        <WifiHighIcon size={32} />
        <GearIcon size={32} />
      </Flex>
      <Flex w={"full"}>
        <Weather />
        <Spacer />
        <Clock />
      </Flex>
    </VStack>
  );
}

export default Header;
