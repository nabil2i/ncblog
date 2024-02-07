import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex>
      <IconButton
        aria-label="Dark Mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />

      {/* <Switch colorScheme='green' isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
      <Text whiteSpace="nowrap" display={{ base: 'none', md:'flex'}}> Dark Mode</Text>
      */}
    </Flex>
  );
};

export default ColorModeSwitch;
