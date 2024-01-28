import { Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Post from "../../entities/Post";
import UpdatePostButton from "./UpdatePostButton";
import DeletePostButton from "../admin/posts/DeletePostButton";

interface Props {
  post?: Post;
  isSubmittingPost?: boolean;
}

const EditPostNav = ({ post, isSubmittingPost }: Props) => {
  const location = useLocation();
  const isCreate = location.pathname.startsWith("/blog/write");
  // console.log(location.pathname)
  // console.log(isCreate)

  return (
    <Flex
      // px={4}
      position="fixed"
      align="center"
      // minH="20px"
      bg="black"
      gap={2}
      w="full"
      h="60px"
      zIndex="90"
      top="60px"
      justify="flex-end"
      px={5}
      // display="none"
    >
      {/* <IconButton
        aria-label={"Settings"}
        onClick={onOpen}
        icon={<MdOutlineMoreHoriz />}
        borderRadius="full"
        color="gray.400"
        variant="ghost"
        fontSize={20}
      /> */}
      <UpdatePostButton
        isSubmittingPost={isSubmittingPost as boolean}
        post={post}
      />
      {!isCreate && <DeletePostButton postId={post?._id as string} />}
      {/* <Menu>
        <MenuButton
          as={IconButton}
          icon={<MdOutlineMoreVert />}
          aria-label={"Settings"}
          // borderRadius="full"
          color="white"
          variant="ghost"
          fontSize={20}
          _hover={{ bg: "none" }}
        ></MenuButton>
        <MenuList>
          <UpdatePostAction
            post={post}
            isSubmittingPost={isSubmittingPost}
          />
        </MenuList>
      </Menu> */}
      
      {/* <Drawer
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
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </Flex>
  );
};

export default EditPostNav;
