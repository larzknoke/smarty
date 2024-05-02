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
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function Todos({ users }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(kampagneSchema),
  });

  async function onSubmit(values) {
    try {
      console.log("values: ", values);
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status != 200) {
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        const resData = await res.json();
        toast({
          title: `Benutzer ${resData.result.name} erstellt.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
        reset();
        router.push("/user");
      }
    } catch (error) {
      console.error("Err", error);
      toast({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

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
            onClick={onOpen}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Neuer Benutzer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-user-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={3} w={"full"}>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type="text" {...register("name")} />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" {...register("email")} />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.color}>
                    <FormLabel>Farbe</FormLabel>
                    <Select
                      name="color"
                      {...register("color")}
                      placeholder="Farbe wählen..."
                    >
                      <option value="blue">Blau</option>
                      <option value="red">Rot</option>
                      <option value="green">Grün</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.color && errors.color.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.avatar}>
                    <FormLabel>Avatar</FormLabel>
                    <Input name="avatar" type="text" {...register("avatar")} />
                    <FormErrorMessage>
                      {errors.avatar && errors.avatar.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              size={"md"}
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              variant={"outline"}
            >
              Schliessen
            </Button>
            <Button
              size={"md"}
              variant="outline"
              colorScheme="green"
              form="new-user-form"
              type="submit"
            >
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TransitionWrapper>
  );
}

export default Todos;

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany();
  console.log("users: ", users);
  return { props: { users } };
};
