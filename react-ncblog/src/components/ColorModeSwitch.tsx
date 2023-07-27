import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, Switch, Text, useColorMode } from '@chakra-ui/react'

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();


  return (
    <HStack
      >
      
        <IconButton
        aria-label="Dark Mode"
        icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        onClick={toggleColorMode}
        variant="ghost"/>
     
      {/* <Switch colorScheme='green' isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
      <Text whiteSpace="nowrap" display={{ base: 'none', md:'flex'}}> Dark Mode</Text>
      */}
    </HStack>
  )
}

export default ColorModeSwitch