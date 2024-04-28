import TransitionWrapper from "@/components/TransitionWrapper";
import { Box } from "@chakra-ui/react";

function PV() {
  return (
    <TransitionWrapper>
      <Box
        bg={"orange.500"}
        w={"200px"}
        h={"200px"}
        textAlign={"center"}
        p={10}
      >
        PV
      </Box>
    </TransitionWrapper>
  );
}

export default PV;
