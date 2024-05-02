import { VStack, Image, Button } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import TodoItem from "@/components/Todo/TodoItem";

function TodoUser({ user, onOpen }) {
  return (
    <VStack gap={6} maxW={"250px"}>
      <Image
        borderRadius="full"
        boxSize="200px"
        src="https://bit.ly/dan-abramov"
        alt={user.name}
      />
      <Button
        size={"lg"}
        leftIcon={<Plus size={24} />}
        colorScheme="blackAlpha"
        variant={"outline"}
        w={"100%"}
        onClick={onOpen}
      >
        Neu
      </Button>
      <VStack gap={5} w={"100%"}>
        {user.todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </VStack>
    </VStack>
  );
}

export default TodoUser;
