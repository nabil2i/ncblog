import { Box, Button, Collapse, Flex, HStack, IconButton, Show, Spacer, Stack, Text, VStack, useBreakpointValue, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import SearchInput from "./SearchInput";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
    <Box
      position="static"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="saturate(180%) blur(5px)" 
      w="100%">
      <VStack
        display={{ lg: 'none'}}
        py={5}
        px={6}>
          <SearchInput />
      </VStack>

      <Flex
        
        as="nav"
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        // borderBottom={1}
        // borderStyle={'solid'}
        boxShadow={'dark-lg'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto'}}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
          >
          <IconButton 
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon  w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex
          flex={{ base: 2}}
          justify={{base : 'center', md: 'start'}}
          align={'center'}
        >
          <NavLogo/>
          {/* <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left'})}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Logo
          </Text> */}

          <Flex display={{ base: 'none', md: 'flex' }} ml={10} align={'center'}>
            <DesktopNav />
          </Flex>
        </Flex>

        {/* Right end of menu */}
        <Stack
          flex={{ base: 1, md: 0}}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {/* <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
          >
            Sign in
          </Button>
          <Button
            as={'a'}
            display={ {base: 'none', md: 'inline-flex'}}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            href={'#'}
            _hover={{
              bg: 'green.300'
            }}
          >
            Sign up
          </Button> */}
        </Stack>

        <HStack spacing={5}>
          {/* <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
            >
              Sign in
            </Button>
            <Button
              as={'a'}
              display={ {base: 'none', md: 'inline-flex'}}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'green.400'}
              href={'#'}
              _hover={{
                bg: 'green.300'
              }}
            >
              Sign up
            </Button> */}
          <Show above="lg">
            <SearchInput/>
          </Show>
          <NavButtons/>
      </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>


    {/* <Flex
      // padding="10px"
      py="2"
      px="4"
      align={'center'}
      // justifyContent="space-between"
      // borderStyle={'solid'}
      // borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <NavLogo/>
      <Spacer />
      <HStack spacing={5}>
        <Show above="lg">
          <SearchInput/>
        </Show>
        <NavButtons/>
      </HStack>
    </Flex> */}
    </>
  );
};

export default NavBar;
