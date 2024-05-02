import {
  List as ListIconP,
  Gear as GearIcon,
  WifiHigh as WifiHighIcon,
} from "@phosphor-icons/react";
import Weather from "./Weather";
import Clock from "./Clock";
import {
  Flex,
  Spacer,
  VStack,
  useDisclosure,
  useRef,
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

function Header() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef();

  return (
    <VStack gap={6} w={"full"}>
      <Flex gap={5} w={"full"}>
        <ListIconP size={32} onClick={onOpen} />
        <Spacer />
        <WifiHighIcon size={32} />
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
                {session && (
                  <button onClick={() => signOut()}>
                    {session.user.email} Logout
                  </button>
                )}
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
