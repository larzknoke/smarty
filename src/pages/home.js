import { Box } from "@chakra-ui/react";
import TransitionWrapper from "@/components/TransitionWrapper";

function Home() {
  return (
    <TransitionWrapper>
      <Box
        bg={"orange.200"}
        w={"200px"}
        h={"200px"}
        textAlign={"center"}
        p={10}
      >
        HOME
      </Box>
    </TransitionWrapper>
  );
}

export default Home;
