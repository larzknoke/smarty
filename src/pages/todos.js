import TransitionWrapper from "@/components/TransitionWrapper";
import { Box } from "@chakra-ui/react";

function Todos() {
  return (
    <TransitionWrapper>
      <Box
        bg={"orange.300"}
        w={"200px"}
        h={"200px"}
        textAlign={"center"}
        p={10}
      >
        TODOS
      </Box>
    </TransitionWrapper>
  );
}

export default Todos;
