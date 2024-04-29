import {
  List as ListIcon,
  Gear as GearIcon,
  WifiHigh as WifiHighIcon,
} from "@phosphor-icons/react";
import Weather from "./Weather";
import Clock from "./Clock";
import { Flex, Spacer, VStack } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <VStack gap={6} w={"full"}>
      <Flex gap={5} w={"full"}>
        {!session && <button onClick={() => signIn("google")}>Login</button>}
        {session && (
          <button onClick={() => signOut()}>{session.user.email} Logout</button>
        )}
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
