import TodoUser from "@/components/Todo/TodoUser";
import TransitionWrapper from "@/components/TransitionWrapper";
import { VStack, HStack, Heading, Divider } from "@chakra-ui/react";
import prisma from "@/lib/prisma";

function Todos({ users }) {
  return (
    <TransitionWrapper>
      <VStack alignItems={"left"} gap={6} p={4} w={"100%"}>
        <Heading size={"3xl"} textAlign={"left"}>
          Todos
        </Heading>
        <Divider my={3} size="xl" sx={{ borderBottomWidth: "4px" }} />
        <HStack gap={10}>
          {users.length > 0 &&
            users.map((user) => {
              return <TodoUser user={user} />;
            })}
        </HStack>
      </VStack>
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
