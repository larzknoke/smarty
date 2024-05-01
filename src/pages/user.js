import { Plus } from "@phosphor-icons/react";
import prisma from "@/lib/prisma";
import TransitionWrapper from "@/components/TransitionWrapper";
import {
  VStack,
  HStack,
  Heading,
  Divider,
  Table,
  Td,
  Th,
  Tr,
  TableContainer,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Button,
  IconButton,
} from "@chakra-ui/react";

function Todos({ users }) {
  return (
    <TransitionWrapper>
      <VStack alignItems={"left"} gap={6} p={4} w={"100%"}>
        <Heading size={"3xl"} textAlign={"left"}>
          Benutzer
          <IconButton
            ml={5}
            icon={<Plus size={24} />}
            colorScheme="green"
            variant={"outline"}
          />
        </Heading>
        <Divider my={3} size="xl" sx={{ borderBottomWidth: "4px" }} />
        <HStack gap={10}>
          <TableContainer w={"100%"}>
            <Table variant="simple" size={"lg"} fontSize={"2rem"}>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Farbe</Th>
                  <Th>Avatar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.length > 0 &&
                  users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.color}</Td>
                        <Td>{user.avatar}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </HStack>
      </VStack>
    </TransitionWrapper>
  );
}

export default Todos;

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany();
  console.log("users: ", users);
  return { props: { users } };
};
