import { Flex, HStack, Switch, useColorMode } from "@chakra-ui/react";

interface Props {
  navSize?: string;
}

const AdminColorModeSwitch = ({ navSize }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();

  if (navSize === "large") {
    return (
      <Flex w="full" align="center" textAlign="center" py={6}>
        <Switch
          w="full"
          colorScheme="green"
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
        />
      </Flex>
    );
  }

  return (
    <HStack>
      {/* <IconButton
        aria-label="Dark Mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      /> */}

      {/* <Switch colorScheme='green' isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
      <Text whiteSpace="nowrap" display={{ base: 'none', md:'flex'}}> Dark Mode</Text>
      */}
    </HStack>
  );
};

export default AdminColorModeSwitch;
