import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BookCardContainer = ({ children }: Props) => {
  return (
    <Box
      as="article"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .05s ease-in",
      }}
      // bg='white'
      minWidth="400px"
      maxWidth="420px"
      // borderRadius="lg"
      // borderWidth="1px"
      overflow="hidden"
      p="6"
    >
      {children}
    </Box>
  );
};

export default BookCardContainer;
