import {
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchPostQueryStore } from "../../store";

const ModalSearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const finalRef = React.useRef(null);

  const setSearchText = useSearchPostQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <InputGroup onClick={onOpen}>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={finalRef}
          borderRadius={20}
          placeholder="Search blog..."
          variant="filled"
        />
      </InputGroup>

      <Show above="base" below="lg">
        <Modal
          // initialFocusRef={ref}
          // finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader></ModalHeader>
          <ModalCloseButton /> */}
            <ModalBody pb={2}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (ref.current) {
                    const searchText = ref.current.value;
                    setSearchText(searchText);
                    // navigate(`/search/${ref.current.value}`);
                    setSearchParams({ q: searchText });
                    navigate(`/search?q=${searchParams.get("q")}`);
                    onClose();
                  }
                }}
              >
                <InputGroup>
                  <InputLeftElement children={<BsSearch />} />
                  <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search blog..."
                    variant="filled"
                  />
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
