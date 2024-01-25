import {
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
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectPostById } from "../../../app/features/posts/postsApiSlice";
import { RootState } from "../../../app/store";
import BlogPostDate from "../../posts/BlogPostDate";
import DeletePostAction from "./DeletePostAction";
import EditPostAction from "./EditPostAction";

const PostRow = ({ postId }: { postId: EntityId }) => {
  const id = postId.toString();
  // console.log(postId);
  // console.log(id);

  // const state = useSelector((state: RootState) => state);
  // console.log("state: ", state);

  const post = useSelector((state: RootState) => selectPostById(state, id));
  // console.log(post);

  if (post)
    return (
      <>
        <Tr key={post._id}>
          <Td mb={2}>
            <Flex align="center" justify="space-between">
              <Flex
                display="column"
                mr={2}
                flexBasis={{ base: "100%", lg: "50%" }}
              >
                <Link
                  as={NavLink}
                  to={`/admin/posts/${post._id}`}
                  _hover={{ color: "teal", cursor: "pointer" }}
                  fontSize={{ base: "16px", lg: "20px" }}
                  fontWeight={500}
                  noOfLines={{ base: 2, lg: 1 }}
                  whiteSpace="pre-wrap"
                >
                  {post.title}
                </Link>
                <Flex align="center" mt="5px">
                  <Text>
                    <BlogPostDate date={post.createdAt} />
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Td>
          <Td>
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
          </Td>
        </Tr>
      </>
    );
  else return null;
};

export default PostRow;
