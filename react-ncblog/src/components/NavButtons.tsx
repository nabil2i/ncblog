import { Search2Icon } from "@chakra-ui/icons";
import { Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const NavButtons = () => {
  return (
    <ColorModeSwitch />
    // <Flex 
    //   // alignItems="right"
    //   // gap="2"
    // >
    //   <Spacer />
    //   <HStack
    //     // justifyContent="space-between"
    //     // padding="10px"
    //     >
    //     {/* <HStack>
    //       <Search2Icon boxSize={6} />
    //       <Text >Search</Text>
    //     </HStack> */}

    //     <ColorModeSwitch />
    //   </HStack>
    // </Flex>
  );
};

export default NavButtons;
