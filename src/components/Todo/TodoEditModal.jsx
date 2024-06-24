import {
  VStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ConfettiExplosion from "react-confetti-explosion";

function TodoEditModal({ isOpen, onClose, clickedTodo }) {
  const toast = useToast();
  const router = useRouter();
  const [isExploding, setIsExploding] = useState(false);

  async function completeTodo(id) {
    try {
      const res = await fetch("/api/todo/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
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
          title: `Todo "${resData.result.title}" abgeschlossen.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
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

  async function deleteTodo(id) {
    try {
      const res = await fetch("/api/todo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
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
          title: `Todo "${resData.result.title}" gelöscht.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
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
              onClick={() => {
                completeTodo(clickedTodo);
                // setIsExploding(true);
              }}
            >
              Erledigt
              {/* {isExploding && (
                <ConfettiExplosion
                  onComplete={() => setIsExploding(false)}
                  zIndex={9999}
                />
              )} */}
            </Button>
            <ButtonGroup
              variant="outline"
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Button onClick={onClose}>Abbrechen</Button>
              <Button colorScheme="red" onClick={() => deleteTodo(clickedTodo)}>
                Löschen
              </Button>
              <Button colorScheme="green" isDisabled={true}>
                Bearbeiten
              </Button>
            </ButtonGroup>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TodoEditModal;
