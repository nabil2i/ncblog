// import { ChatIcon, EmailIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
// import { Form, redirect } from "react-router-dom";
import AddPostForm from "../../components/admin/AddPostForm";
import PostsTable from "../../components/admin/PostsTable";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const schema = z.object({
//   title: z
//     .string()
//     .min(20, { message: "Title must be at least 20 characters." }),
//   body: z.string().min(50, { message: "Body must be at least 50 characters." }),
// });

// type FormData = z.infer<typeof schema>;

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
            <PostsTable />
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
              {/* <Form
                method="post"
                action="/admin/posts"
              > */}
              <AddPostForm />
              {/* </Form> */}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

// export const createAction = async ({ request }) => {
//   const data = await request.formData();

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   // const toast = useToast();

//   // const showToast = () => {
//   //   toast({
//   //     title: 'Post created',
//   //     description: 'Successfully created a post.',
//   //     duration: 5000, // 5s
//   //     isClosable: true
//   //   });
//   // }

//   const post = {
//     title: data.get('title'),
//     body: data.get('content'),
//   }

//   console.log(post);
//   // showToast();

//   return redirect('/admin/posts');
// }

export default PostsPage;
