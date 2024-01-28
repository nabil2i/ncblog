import { Flex } from "@chakra-ui/react";
import Post from "../../../entities/Post";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";

interface Props {
  post: Post;
}

const BlogDetailsActions = ({ post }: Props) => {
  // console.log(location.pathname)
  // console.log(isCreate)

  // const { isOpen, onClose, onOpen } = useDisclosure();
  // const icnRef = React.useRef();

  // const toast = useToast();

  // const showToast = () => {
  //   toast({
  //     title: "Logged out",
  //     description: "Successfully logged out.",
  //     duration: 3000, // 5s
  //     isClosable: true,
  //     status: "success",
  //     position: "top",
  //     icon: <UnlockIcon />,
  //   });
  // };

  return (
    <>
      <Flex
        // as="nav"
        justify="end"
        gap={2}
        align="center"
        w="full"
        bg="teal.500"
        minH="60px"
        position="fixed"
        right={0}
        zIndex={50}
        px={2}
      >
        <EditPostButton postId={post._id} />
        <DeletePostButton postId={post?._id as string} />
        {/* <IconButton
          icon={<MdOutlineMoreVert />}
          aria-label={"Settings"}
          onClick={onOpen}
          color="white"
          variant="ghost"
          fontSize={20}
          _hover={{ bg: "none" }}
        />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            // finalFocusRef={icnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>
              <DrawerBody>
                <Input placeholder="Type here..." />
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="teal">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer> */}
      </Flex>
    </>
  );
};

export default BlogDetailsActions;
