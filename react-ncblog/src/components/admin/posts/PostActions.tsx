import { Box, Flex, Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useLocation } from "react-router-dom";
import categories from "../../../data/categories";
import Post, { PostFormData } from "../../../entities/Post";
import CreateUpdatePostButton from "./CreateUpdatePostButton";
import DeletePostButton from "./DeletePostButton";
interface Props {
  post?: Post;
  isSubmittingPost?: boolean;
  setFieldValue: UseFormSetValue<PostFormData>;
}

const PostActions = ({ post, isSubmittingPost, setFieldValue }: Props) => {
  const location = useLocation();
  const isCreate =
    location.pathname.startsWith("/dashboard/posts/new") ||
    location.pathname.startsWith("/blog/new-post") ||
    location.pathname.startsWith("/myposts/new-post");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to track the selected category

  useEffect(() => {
    if (post?.category) {
      setSelectedCategory(post.category)
    }
  }, [post?.category])
  
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setFieldValue("category", categoryValue);
  };

  // useEffect(() => {
  //   console.log(selectedCategory)
  //   console.log()
  // }, [selectedCategory])

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
        <Box>
          <Select
            value={selectedCategory || categories[0].value}
            onChange={handleCategoryChange}
            variant="filled"
            fontSize="lg"
            // placeholder={post?.category || "Select a category"}
            _hover={{ cursor: "pointer" }}
          >
            {categories.map((category) => (
              <option key={category.label} value={category.value} className="nabhover">
                {category.label}
              </option>
            ))}
          </Select>
        </Box>
        <CreateUpdatePostButton
          post={post}
          isSubmittingPost={isSubmittingPost as boolean}
        />
        {!isCreate && <DeletePostButton postId={post?._id as string} />}
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

export default PostActions;
