import { Image, Td, Tr, useColorMode } from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { useGetPostsQuery } from "../../../app/features/posts/postsApiSlice";

const PostRow = ({ postId }: { postId: EntityId }) => {
  // const showOnLargeScreen = useBreakpointValue({ base: false, lg: true });

  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.posts.entities[postId],
    }),
  });
  // console.log(post)

  const { colorMode } = useColorMode();

  // console.log(post?.img);
  // console.log(role);

  if (post)
    return (
      <>
        <Tr
          _hover={{
            cursor: "pointer",
            bg: colorMode === "light" ? "teal.300" : "black",
          }}
        >
          <Td>
            <Image src={post.img} w={14} h={10} rounded="md" />
          </Td>
          {/* <Td >{post.title}</Td> */}
          <Td w={96}>{post.title}</Td>
          <Td w={5}>{post.category}</Td>
        </Tr>
      </>
    );
  else return null;
};

const memoizedPost = memo(PostRow);

export default memoizedPost;
