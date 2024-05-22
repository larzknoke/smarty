import { Text, HStack, VStack } from "@chakra-ui/react";
import { Trash as TrashIcon } from "@phosphor-icons/react";

function Trash() {
  return (
    <HStack alignSelf={"center"} gap={24}>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-gray-600" />
        <Text as={"b"} fontSize={"3xl"}>
          Morgen
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-green-700" />
        <Text as={"b"} fontSize={"3xl"}>
          7 Tage
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-yellow-400" />
        <Text as={"b"} fontSize={"3xl"}>
          10 Tage
        </Text>
      </VStack>
      <VStack gap={2}>
        <TrashIcon size={32} className=" text-blue-700" />
        <Text as={"b"} fontSize={"3xl"}>
          4 Tage
        </Text>
      </VStack>
    </HStack>
  );
}

export default Trash;
