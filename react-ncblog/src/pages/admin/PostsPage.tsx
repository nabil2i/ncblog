/* eslint-disable react-refresh/only-export-components */
import { ChatIcon, EmailIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, List, ListIcon, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useToast } from "@chakra-ui/react";
import { Form, redirect } from "react-router-dom";

const PostsPage = () => {
  return (
  <>
    <Tabs mt="10px" p="20px" colorScheme="green.300" variant="enclosed">
        <TabList>
          <Tab _selected={{ bg: "green" }}>All Posts</Tab>
          <Tab _selected={{ bg: "green" }}>Create a post</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* <List spacing={4}>
              <ListItem>
                <ListIcon as={EmailIcon}/>
                Email: johndoe@gmail.com
              </ListItem>
              <ListItem>
                <ListIcon as={ChatIcon}/>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, sunt.
              </ListItem>
              <ListItem>
                <ListIcon as={StarIcon}/>
                Lorem ipsum dolor sit amet.
              </ListItem>
            </List> */}
          </TabPanel>

          <TabPanel>
            <Box maxH="480px">
              <Form method="post" action="/admin/posts">
                <FormControl isRequired mb="40px">
                  <FormLabel>Title:</FormLabel>
                  <Input type="text" name="title" />
                  <FormHelperText>Enter the title of the post</FormHelperText>
                </FormControl>

                <FormControl isRequired mb="40px">
                  <FormLabel>Post content:</FormLabel>
                  <Textarea placeholder="Write something..." name="content"/>
                  <FormHelperText>Post content</FormHelperText>
                </FormControl>

                <Button type="submit">Create post</Button>

              </Form>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
  </>
  );
};

export const createAction = async ({ request }) => {
  const data = await request.formData();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const toast = useToast();

  // const showToast = () => {
  //   toast({
  //     title: 'Post created',
  //     description: 'Successfully created a post.',
  //     duration: 5000, // 5s
  //     isClosable: true
  //   });
  // }

  const post = {
    title: data.get('title'),
    body: data.get('content'),
  }

  console.log(post);
  // showToast();

  return redirect('/admin/posts');
}

export default PostsPage;
