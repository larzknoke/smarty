import TodoUser from "@/components/Todo/TodoUser";
import TransitionWrapper from "@/components/TransitionWrapper";
import { VStack, HStack, Heading, Divider } from "@chakra-ui/react";

function Todos() {
  return (
    <TransitionWrapper>
      <VStack alignItems={"left"} gap={6} p={4} w={"100%"}>
        <Heading size={"3xl"} textAlign={"left"}>
          Todos
        </Heading>
        <Divider my={3} size="xl" sx={{ borderBottomWidth: "4px" }} />
        <HStack gap={10}>
          <TodoUser />
          <TodoUser />
          <TodoUser />
          <TodoUser />
        </HStack>
      </VStack>
    </TransitionWrapper>
  );
}

export default Todos;
