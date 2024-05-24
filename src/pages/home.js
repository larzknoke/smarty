import dynamic from "next/dynamic";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Flex } from "@chakra-ui/react";
import Calendar from "@/components/Calendar";

const HomeData = dynamic(() => import("@/components/HomeData"), {
  ssr: false,
});

function Home() {
  return (
    <TransitionWrapper>
      <Flex direction={"column"} w={"95%"} gap={20} mt={40} px={8}>
        <HomeData />
        <Calendar />
      </Flex>
    </TransitionWrapper>
  );
}

export default Home;
