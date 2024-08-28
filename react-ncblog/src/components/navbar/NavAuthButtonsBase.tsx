import { Divider, Flex, useBreakpointValue } from "@chakra-ui/react";
import NavAuthButtons from "./NavAuthButtons";

const NavAuthButtonsBase = () => {
  const showNavAuthButtonsOnBase = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      { showNavAuthButtonsOnBase && (
      <Flex w="full" direction="column">
        <Flex w="full" justify="end" my={2} mr={2}>
          <NavAuthButtons />
        </Flex>
        <Flex w="full">
          <Divider orientation="horizontal" />
        </Flex>
      </Flex>

    )}
    </>
  );
};

export default NavAuthButtonsBase;
