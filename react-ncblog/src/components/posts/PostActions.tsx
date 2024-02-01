import { Box, Flex, Select } from "@chakra-ui/react";
import { UseFormSetValue } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Post, { PostFormData } from "../../entities/Post";
import DeletePostButton from "../admin/posts/DeletePostButton";
import CreateUpdateButton from "./CreateUpdatePostButton";
import { useState, ChangeEvent } from "react";

interface Props {
  post?: Post;
  isSubmittingPost?: boolean;
  setFieldValue: UseFormSetValue<PostFormData>;
}

const PostActions = ({ post, isSubmittingPost, setFieldValue }: Props) => {
  const location = useLocation();
  const isCreate =
    location.pathname.startsWith("/blog/write") ||
    location.pathname.startsWith("/myposts/write");
    
  const [selectedCategory, setSelectedCategory] = useState(""); // State to track the selected category

  const categories = ["Religion", "Lifestyle", "Education", "Uncategorized"];

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setFieldValue("category", categoryValue);
  };
  // console.log(location.pathname)
  // console.log(isCreate)

  return (
    <Flex
      // px={4}
      position="fixed"
      align="center"
      // minH="20px"
      bg="teal.500"
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
      <Box>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="filled"
          size="lg"
          placeholder="Select a category"
          _hover={{ cursor: "pointer" }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Box>
      <CreateUpdateButton
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

export default PostActions;
