import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchPostQueryStore } from "../../store";

const SearchInputModalIcon = () => {
  const ref = useRef<HTMLInputElement>(null);
  // const finalRef = React.useRef(null);

  const setSearchText = useSearchPostQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Box>
        <IconButton
          aria-label="Dark Mode"
          icon={<BsSearch />}
          onClick={onOpen}
          variant="ghost"
        />
      </Box>

      <Box display={{ base: "flex", md: "none", lg: "flex" }}>
        <Modal isOpen={isOpen} onClose={onClose}>
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
          </ModalContent>
        </Modal>
      </Box>
      {/* <ModalFooter>
                <Button colorScheme='blue' mr={3}>
                Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter> */}
    </>
  );
};

export default SearchInputModalIcon;
