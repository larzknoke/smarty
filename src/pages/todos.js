import TodoUser from "@/components/Todo/TodoUser";
import TransitionWrapper from "@/components/TransitionWrapper";
import {
  VStack,
  HStack,
  Heading,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";

import prisma from "@/lib/prisma";
import TodoNewModal from "@/components/Todo/TodoNewModal";
import TodoEditModal from "@/components/Todo/TodoEditModal";
import { useState } from "react";

function Todos({ users }) {
  const {
    isOpen: isOpenNewTodo,
    onOpen: onOpenNewTodo,
    onClose: onCloseNewTodo,
  } = useDisclosure();
  const {
    isOpen: isOpenEditTodo,
    onOpen: onOpenEditTodo,
    onClose: onCloseEditTodo,
  } = useDisclosure();

  const [clickedTodo, setClickedTodo] = useState();
  const [clickedUser, setClickedUser] = useState();

  function handleClickedToto(id) {
    setClickedTodo(id);
  }

  function handleClickedUser(id) {
    setClickedUser(id);
  }

  return (
    <TransitionWrapper>
      <VStack alignItems={"left"} gap={6} p={4} w={"100%"}>
        <Heading size={"3xl"} textAlign={"left"}>
          Todos
        </Heading>
        <Divider my={3} size="xl" sx={{ borderBottomWidth: "4px" }} />
        <HStack
          gap={10}
          alignItems={"flex-start"}
          flexGrow={"1"}
          flexShrink={"1"}
          flexBasis={"25%"}
        >
          {users.length > 0 &&
            users.map((user) => {
              return (
                <TodoUser
                  key={user.id}
                  user={user}
                  onOpen={onOpenNewTodo}
                  onOpenEditTodo={onOpenEditTodo}
                  handleClickedToto={handleClickedToto}
                  handleClickedUser={handleClickedUser}
                />
              );
            })}
        </HStack>
      </VStack>
      <TodoNewModal
        onClose={onCloseNewTodo}
        isOpen={isOpenNewTodo}
        clickedUser={clickedUser}
      />
      <TodoEditModal
        onClose={onCloseEditTodo}
        isOpen={isOpenEditTodo}
        clickedTodo={clickedTodo}
      />
    </TransitionWrapper>
  );
}

export default Todos;

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      todos: true,
    },
  });
  console.log("users: ", users);
  return { props: { users } };
};
