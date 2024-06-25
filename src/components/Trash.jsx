import { Text, HStack, VStack } from "@chakra-ui/react";
import { Trash as TrashIcon } from "@phosphor-icons/react";

function Trash({ rest, bio, gelb, papier }) {
  function trashDays(trash) {
    switch (trash) {
      case 0:
        return "Heute";
      case 1:
        return "Morgen";
      default:
        return `${trash} Tage`;
    }
  }

  return (
    <HStack alignSelf={"center"} gap={24}>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-gray-600" />
        <Text as={"b"} fontSize={"3xl"}>
          {trashDays(rest)}
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-green-700" />
        <Text as={"b"} fontSize={"3xl"}>
          {trashDays(bio)}
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-yellow-400" />
        <Text as={"b"} fontSize={"3xl"}>
          {trashDays(gelb)}
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-blue-700" />
        <Text as={"b"} fontSize={"3xl"}>
          {trashDays(papier)}
        </Text>
      </VStack>
    </HStack>
  );
}

export default Trash;
