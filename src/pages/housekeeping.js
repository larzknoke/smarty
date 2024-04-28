import TransitionWrapper from "@/components/TransitionWrapper";
import { Box } from "@chakra-ui/react";

function Housekeeping() {
  return (
    <TransitionWrapper>
      <Box
        bg={"orange.600"}
        w={"200px"}
        h={"200px"}
        textAlign={"center"}
        p={10}
      >
        HOUSEKEEPING
      </Box>
    </TransitionWrapper>
  );
}

export default Housekeeping;
