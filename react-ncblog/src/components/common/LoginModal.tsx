import { Modal, ModalOverlay, ModalContent, ModalHeader, Center, ModalCloseButton, ModalBody, Flex, Button, ModalFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  redirectLink: string;
}

export const LoginModal = ({ isOpen, onClose, redirectLink }: Props) => {
  const navigate = useNavigate();
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader><Center>Please log in</Center></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={2} justify="center">
            <Button
              variant="ghost"
              colorScheme="teal"
              onClick={() => navigate(`/login?redirect=${redirectLink}`)}
            >
              Login
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>Close</Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
