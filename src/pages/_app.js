import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const xl = defineStyle({
  border: "10px solid",
  borderRadius: "lg",
});

export const dividerTheme = defineStyleConfig({
  sizes: { xl },
});

const theme = extendTheme({
  components: { Divider: dividerTheme },
  styles: {
    global: {
      body: {
        bg: "orange.50",
        color: "gray.700",
      },
    },
  },
  colors: {
    // Tailwind Amber = Chakra Orange
    orange: {
      50: "#fbf7f3",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03",
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          {/* <AnimatePresence mode="wait" initial={false}> */}
          <Component {...pageProps} key={router.asPath} />
          {/* </AnimatePresence> */}
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}
