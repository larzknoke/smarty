import { Box, Badge } from "@chakra-ui/react";

function TodoItem() {
  return (
    <Box
      //   boxShadow={"lg"}
      maxW={"250px"}
      borderWidth="2px"
      borderRadius="md"
      overflow="hidden"
      borderColor={"blackAlpha.300"}
      borderLeftWidth={"4px"}
      borderLeftColor={"blue.500"}
      px={4}
      py={3}
    >
      <Box display="flex" alignItems="baseline">
        <Badge borderRadius="full" px="2" colorScheme="orange">
          30.04.24
        </Badge>
      </Box>

      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        noOfLines={2}
        fontSize={"2xl"}
      >
        Küche aufräumen und wischen
      </Box>

      <Box>Lorem ipsum</Box>
    </Box>
  );
}

export default TodoItem;
