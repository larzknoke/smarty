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
  ButtonGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ConfettiExplosion from "react-confetti-explosion";

function TodoEditModal({ isOpen, onClose }) {
  const toast = useToast();
  const router = useRouter();
  const [userSelect, setUserSelect] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [isExploding, setIsExploding] = useState(false);

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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <VStack gap={6} my={4}>
            <Button
              colorScheme="green"
              width={"100%"}
              onClick={() => setIsExploding(true)}
            >
              Erledigt 🎉
              {isExploding && (
                <ConfettiExplosion
                  onComplete={() => setIsExploding(false)}
                  zIndex={9999}
                />
              )}
            </Button>
            <ButtonGroup variant="outline" spacing="4" width={"100%"}>
              <Button>Abbrechen</Button>
              <Button>Verschieben</Button>
              <Button colorScheme="green">Bearbeiten</Button>
            </ButtonGroup>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TodoEditModal;
