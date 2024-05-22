import { Text, HStack, VStack } from "@chakra-ui/react";
import { Trash as TrashIcon } from "@phosphor-icons/react";

function Trash({ rest, bio, gelb, papier }) {
  return (
    <HStack alignSelf={"center"} gap={24}>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-gray-600" />
        <Text as={"b"} fontSize={"3xl"}>
          {rest == 1 ? "Morgen" : `${rest} Tage`}
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-green-700" />
        <Text as={"b"} fontSize={"3xl"}>
          {bio == 1 ? "Morgen" : `${bio} Tage`}
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-yellow-400" />
        <Text as={"b"} fontSize={"3xl"}>
          {gelb == 1 ? "Morgen" : `${gelb} Tage`}
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-blue-700" />
        <Text as={"b"} fontSize={"3xl"}>
          {papier == 1 ? "Morgen" : `${papier} Tage`}
        </Text>
      </VStack>
    </HStack>
  );
}

export default Trash;
