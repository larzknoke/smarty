import {
  List as ListIconP,
  Gear as GearIcon,
  WifiHigh as WifiHighIcon,
  WifiSlash,
} from "@phosphor-icons/react";
import Weather from "./Weather";
import Clock from "./Clock";
import {
  Flex,
  Spacer,
  VStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  Input,
  Button,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useNetworkStatus from "@/hooks/networkStatus";

function Header() {
  const { data: session } = useSession();
  const { isOnline } = useNetworkStatus();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("session header", session);

  return (
    <VStack gap={6} w={"full"}>
      <Flex gap={5} w={"full"}>
        <ListIconP size={32} onClick={onOpen} />
        <Spacer />
        {isOnline ? <WifiHighIcon size={32} /> : <WifiSlash size={32} />}
        <GearIcon size={32} />
      </Flex>
      <Flex w={"full"}>
        <Weather />
        <Spacer />
        <Clock />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menü</DrawerHeader>

          <DrawerBody>
            <List spacing={3}>
              <ListItem>
                {!session && (
                  <button onClick={() => signIn("google")}>Login</button>
                )}
                {session && <button onClick={() => signOut()}>Logout</button>}
              </ListItem>
              <Divider />
              <ListItem>
                <Link href={"/user"}>Benutzer</Link>
              </ListItem>
              <Divider />
              <ListItem>
                <Link href={"/todos"}>Todos</Link>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
}

export default Header;
