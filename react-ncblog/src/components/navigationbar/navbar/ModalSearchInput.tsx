import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Show, useDisclosure } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs';
// import usePostQueryStore from '../store';
import { useNavigate } from 'react-router-dom';
import usePostQueryStore from '../../../store';

const ModalSearchInput = (
  // { onSearch }: Props
  ) => {
    const ref = useRef<HTMLInputElement>(null);
    const finalRef = React.useRef(null)

    const setSearchText = usePostQueryStore(s => s.setSearchText);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    // const [searchParams, setSearchParams] = useSearchParams();
  
    return (
      <>
      {/* <form style={{ width: '100%'}} onSubmit={(event) => { */}

      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <InputGroup onClick={onOpen}>
        <InputLeftElement children={<BsSearch/>}/>
        <Input  ref={finalRef} borderRadius={20} placeholder="Search blog..." variant="filled" />
        {/* <Box>Search blog...</Box> */}
      </InputGroup>

      <Show above="base" below="lg">
      <Modal
        // initialFocusRef={ref}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay  />
        <ModalContent>
          {/* <ModalHeader></ModalHeader>
          <ModalCloseButton /> */}
          <ModalBody pb={2}>
            <form onSubmit={(event) => {
              event.preventDefault();
              if (ref.current) {
                setSearchText(ref.current.value);
                // setSearchParams({ q: 'active'});
                navigate(`/`);
                onClose();
              }
            }}>
              <InputGroup>
                <InputLeftElement children={<BsSearch/>}/>
                <Input ref={ref} borderRadius={20} placeholder="Search blog..." variant="filled" />
              </InputGroup>
            </form>
            
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3}>
            Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
        
      </Modal>
      </Show>

      </>
    );
  };

  export default ModalSearchInput;
  