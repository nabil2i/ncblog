import { Flex, HStack, Switch, Text, useColorMode } from '@chakra-ui/react'

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();


  return (
    <HStack
      >
      <Switch colorScheme='green' isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
      <Text whiteSpace="nowrap" display={{ base: 'none', md:'flex'}}> Dark Mode</Text>
    </HStack>
  )
}

export default ColorModeSwitch