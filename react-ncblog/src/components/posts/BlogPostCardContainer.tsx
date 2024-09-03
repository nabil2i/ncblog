import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BlogPostCardContainer = ({ children }: Props) => {
  // const smallDevice = useBreakpointValue({ "370px": true });
  return (
    <Box
      as="article"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .05s ease-in",
      }}
      // bg='white'
      minWidth={"250px"}
      // minWidth={ smallDevice ? "0px" : "350px"}
      maxWidth="400px"
      // borderRadius="lg"
      // borderWidth="1px"
      // overflow="hidden"
      p="2"
    >
      {children}
    </Box>
  );
};

export default BlogPostCardContainer;
