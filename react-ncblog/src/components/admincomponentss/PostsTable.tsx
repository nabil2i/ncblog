import {
  Button,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import usePosts from "../../hooks/usePosts";
import BlogPostDate from "../BlogPostDate";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

const PostsTable = () => {
  const { data, error, isLoading } = usePosts();
  const toast = useToast();
  const navigate = useNavigate();

  const showToast = () => {
    toast({
      title: "Delete a post",
      description: "Successfully deleted the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "success",
      position: "top",
      icon: <DeleteIcon />,
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Delete a post",
      description: "An error occured while deleting the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "error",
      position: "top",
      icon: <DeleteIcon />,
    });
  };

  if (isLoading)
    return (
      <VStack marginTop={2}>
        <Spinner />
      </VStack>
    );
    

  const deletePost = (postId: string) => {
    // console.log("deleting..."); return;
    axios
      .delete(`http://localhost:5000/api/posts/${postId}`)
      .then(res => {
        res.data;
        showToast();
        redirect("/admin/posts");
      })
      .catch(err => {
        console.log(err);
        showErrorToast();
      })
    
  };

  const updatePost = (postId: string) => {
    navigate(`/admin/posts/${postId}`);
    console.log("updating...");
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
                      onClick={() => updatePost(post._id)}
                    >Edit</Button>
                    <Button
                      colorScheme="red"
                      onClick={() => deletePost(post._id)}
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
