import {
  VStack,
  HStack,
  Heading,
  Divider,
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
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function TodoNewModal({ isOpen, onClose, clickedUser }) {
  const toast = useToast();
  const router = useRouter();
  const [userSelect, setUserSelect] = useState([]);
  const [userSelected, setUserSelected] = useState(clickedUser);

  console.log("clickedUser", clickedUser);
  console.log("userSelected", userSelected);

  async function userForSelect() {
    const res = await fetch("/api/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const selectData = await data.map((user) => {
      return {
        value: user.id,
        label: `${user.name}`,
      };
    });
    setUserSelect(selectData);
  }

  useEffect(() => {
    if (isOpen) userForSelect();
  }, [isOpen]);

  useEffect(() => {
    setUserSelect(clickedUser);
  }, []);

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
      values.userId = userSelected;
      console.log("values: ", values);
      const res = await fetch("/api/todo", {
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
          title: `Todo ${resData.result.title} erstellt.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
        reset();
        router.push("/todos");
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Neues Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="new-user-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={3} w={"full"}>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.title}>
                  <FormLabel>Titel</FormLabel>
                  <Input name="title" type="text" {...register("title")} />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.content}>
                  <FormLabel>Inhalt</FormLabel>
                  <Input name="content" type="text" {...register("content")} />
                  <FormErrorMessage>
                    {errors.content && errors.content.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.user}>
                  <FormLabel>Benutzer</FormLabel>
                  <Select
                    name="user"
                    options={userSelect}
                    placeholder="Benutzer auswählen..."
                    // closeMenuOnSelect={true}
                    onChange={(e) => setUserSelected(e.value)}
                    // defaultValue={{
                    //   label:
                    //     letter.botschafter?.vorname +
                    //       " " +
                    //       letter.botschafter?.name || "",
                    //   value: letter.botschafter?.id || "",
                    // }}
                  />
                  <FormErrorMessage>
                    {errors.user && errors.user.message}
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
  );
}

export default TodoNewModal;
