import { VStack, Image, Button } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import TodoItem from "@/components/Todo/TodoItem";

function TodoUser() {
  return (
    <VStack gap={6}>
      <Image
        borderRadius="full"
        boxSize="200px"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
      <Button
        size={"lg"}
        leftIcon={<Plus size={24} />}
        colorScheme="blackAlpha"
        variant={"outline"}
        w={"100%"}
      >
        Neu
      </Button>
      <VStack gap={6}>
        <TodoItem />
        <TodoItem />
      </VStack>
    </VStack>
  );
}

export default TodoUser;
