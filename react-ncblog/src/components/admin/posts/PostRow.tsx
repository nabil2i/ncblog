import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useGetPostsQuery } from "../../../app/features/posts/postsApiSlice";
import BlogPostDate from "../../posts/BlogPostDate";
import DeletePostAction from "./DeletePostAction";
import EditPostAction from "./EditPostAction";

const PostRow = ({ postId }: { postId: EntityId }) => {
  // const id = postId.toString();
  // console.log(postId);
  // console.log(id);

  // const state = useSelector((state: RootState) => state);
  // console.log("state: ", state);

  //
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.posts.entities[postId],
    }),
  });

  // // NORMAL SELECTOR
  // const post = useSelector((state: RootState) => selectPostById(state, id));
  // console.log(post);

  if (post)
    return (
      <>
        <Tr key={post._id}>
          <Td mb={2}>
            <Box>
              <Flex
                display="column"
                // w="100%"
                // mb={2}
                // flexBasis={{ base: "100%", lg: "50%" }}
              >
                <Box>
                  <Link
                    as={NavLink}
                    to={`/admin/posts/${post._id}`}
                    _hover={{ cursor: "pointer" }}
                    fontSize={{ base: "16px", lg: "20px" }}
                    fontWeight={500}
                    // noOfLines={{ base: 2, lg: 2 }}
                    // whiteSpace="pre-wrap"
                  >
                    {post.title}
                  </Link>
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  iste eveniet doloribus ipsum nostrum officiis dolorum adipisci
                  enim corporis eos! */}
                </Box>
                <Flex mt="5px">
                  <Text>
                    <BlogPostDate date={post.createdAt} />
                  </Text>
                </Flex>
              </Flex>

              {/* <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdOutlineMoreHoriz />}
                ></MenuButton>
                <MenuList>
                  <EditPostAction postId={post._id as string} />
                  <DeletePostAction postId={post._id as string} />
                </MenuList>
              </Menu> */}
            </Box>
          </Td>
          <Td>
            <Flex justify="end">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdOutlineMoreHoriz />}
                ></MenuButton>
                <MenuList>
                  <EditPostAction postId={post._id as string} />
                  <DeletePostAction postId={post._id as string} />
                </MenuList>
              </Menu>
            </Flex>
          </Td>
        </Tr>
      </>
    );
  else return null;
};

const memoizedPost = memo(PostRow);

export default memoizedPost;
