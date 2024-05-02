import { dateFormatter } from "@/lib/utils";
import { Box, Badge } from "@chakra-ui/react";

function TodoItem({ todo, color }) {
  return (
    <Box
      //   boxShadow={"lg"}
      width={"100%"}
      borderWidth="2px"
      borderRadius="md"
      overflow="hidden"
      borderColor={"blackAlpha.300"}
      borderLeftWidth={"4px"}
      borderLeftColor={`${color}.500`}
      px={4}
      py={3}
    >
      <Box display="flex" alignItems="baseline">
        <Badge borderRadius="full" px="2">
          {dateFormatter(todo.createdAt)}
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
        {todo.title}
      </Box>

      <Box>{todo.content}</Box>
    </Box>
  );
}

export default TodoItem;
