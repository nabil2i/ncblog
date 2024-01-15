import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const CustomCenter = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justify="center"
        minH="100vh"
      >
        {children}
      </Flex>
    </>
  );
};

export default CustomCenter;
