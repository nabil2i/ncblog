import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Heading, IconButton, Slide, VStack, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import useAdminLayout from '../../admin/useAdminLayout';

const ResponsiveDrawer = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const { state, dispatch } = useAdminLayout();

    useEffect(() => {
        dispatch({ type: "SET_ON_CLOSE_MAIN", onCloseMain: onClose})
        dispatch({ type: "SET_ON_TOGGLE", onToggle: onToggle})
      }, [dispatch, isOpen, onClose])

  return (
    <>
    {/* Drawer toggle button at top left */}       
    {/* <div style={{position: 'absolute', left: '5px', top: '5px', zIndex: '100'}}>
        <Button ref={btnRef} colorScheme="teal" onClick={onToggle}>
            Controls
        </Button>           
    </div>  */}

    {/* Imitation drawer below */}
    <Slide direction="left" in={isOpen} style={{height:'100vh', width: '300px', zIndex: 100 }}>
      <VStack            
        color="black"
        bg="white"
        rounded="md"
        h="100vh"
        w="300px"
        // overflowY="scroll"
        >
        <Box p={5} shadow="md" borderWidth="1px" m="5px">
          <Heading fontSize="xl">Insert more contents!!</Heading>
        </Box>
        {/* Insert other contents */}
      </VStack>
    </Slide>
    
    </>
  )
}

export default ResponsiveDrawer