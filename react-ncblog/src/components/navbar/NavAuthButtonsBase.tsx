import { Divider, Flex } from "@chakra-ui/react";
import NavAuthButtons from "./NavAuthButtons";

const NavAuthButtonsBase = () => {
  return (
    <Flex marginRight={5} my={2} w="full" justify="end" direction="column">
      <NavAuthButtons />
      <Flex w="full">
        <Divider my={2} orientation="horizontal" />
      </Flex>
    </Flex>
  );
};

export default NavAuthButtonsBase;
