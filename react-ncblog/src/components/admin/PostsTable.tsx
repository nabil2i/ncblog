import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import useDeletePost from "../../hooks/useDeletePost";
import usePosts from "../../hooks/usePosts";
import BlogPostDate from "../posts/BlogPostDate";

const PostsTable = () => {
  const { data: payload, error, isLoading } = usePosts();
  const data = payload?.data;

  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  // const showToast = () => {
  //   toast({
  //     title: "Delete a post",
  //     description: "Successfully deleted the post.",
  //     duration: 5000, // 5s
  //     isClosable: true,
  //     status: "success",
  //     position: "top",
  //     icon: <DeleteIcon />,
  //   });
  // };

  // const showErrorToast = () => {
  //   toast({
  //     title: "Delete a post",
  //     description: "An error occured while deleting the post.",
  //     duration: 5000, // 5s
  //     isClosable: true,
  //     status: "error",
  //     position: "top",
  //     icon: <DeleteIcon />,
  //   });
  // };

  const deletePost = useDeletePost(
    () => {
      // reset();
    },
    () => {
      toast({
        title: "Delete a post",
        description: "Successfully deleted the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        icon: <DeleteIcon />,
      });
    },
    () => {
      toast({
        title: "Delete a post",
        description: "An error occured while deleting the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "error",
        position: "top",
        icon: <DeleteIcon />,
      });
    }
  );
  // const deletePost = useMutation({
  //   mutationFn: (postId: string) =>
  //     // console.log("deleting..."); return;
  //     axios
  //       .delete(`http://localhost:5000/api/posts/${postId}`)
  //       .then(res => res.data),
  //   onSuccess: () => {
  //     showToast();
  //     queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
  //   },
  //   onError: () =>  {
  //     showErrorToast();
  //   }
  // });

  const triggerDeletePost = (postId: string) => {
    // console.log(postId);
    if (postId) deletePost.mutate(postId);
  };

  if (isLoading)
    return (
      <Box p={10}>
        <VStack marginTop={2}>
          <Spinner />
        </VStack>
      </Box>
    );

  // const deletePost = (postId: string) => {
  //   // console.log("deleting..."); return;
  //   axios
  //     .delete(`http://localhost:5000/api/posts/${postId}`)
  //     .then(res => {
  //       res.data;
  //       showToast();
  //       redirect("/admin/posts");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       showErrorToast();
  //     })

  // };

  const updatePost = (postId: string) => {
    navigate(`/admin/posts/${postId}`);
    // console.log("updating...");
    // axios
    //   .delete(`http://localhost:5000/api/posts/${postId}`)
    //   .then(res => {
    //     res.data;
    //     showToast();
    //     redirect("/admin/posts");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     showErrorToast();
    //   })
  };

  return (
    <>
      {error && <Text> We encountered a problem.</Text>}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Blog posts</TableCaption>
          <Thead>
            <Tr>
              <Th>Post title</Th>
              <Th>Date</Th>
              {/* <Th isNumeric>multiply by</Th> */}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.results.map((post) => (
              <Tr key={post._id}>
                <Td _hover={{ color: "green", cursor: "grab" }}>
                  <NavLink to={`/admin/posts/${post._id}`}>
                    {post.title}
                  </NavLink>
                </Td>
                <Td>
                  <BlogPostDate date={post.createdAt} />
                </Td>
                <Td>
                  <Flex gap="3">
                    <Button
                      colorScheme="blue"
                      onClick={() => updatePost(post._id as string)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => triggerDeletePost(post._id as string)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </>
  );
};

export default PostsTable;
