import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import PostForm from "../../components/admin/posts/PostForm";
import PostsTable from "../../components/admin/posts/PostsTable";
import AddPostButton from "../../components/admin/posts/AddPostButton";
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

      <Flex direction="column" p={"0"}>
        <Flex justify="end" p={0}>
          <AddPostButton />
        </Flex>
        <Box >
          <PostsTable />  
        </Box>
      </Flex>

      {/* <Tabs variant="enclosed">
        <TabList>
          <Tab _selected={{ bg: "teal", color: "white" }}>All Posts</Tab>
          <Tab _selected={{ bg: "teal", color: "white" }}>Create a post</Tab>
        </TabList>

        <TabPanels>
          <TabPanel overflow={"hidden"}>
            <PostsTable />
          </TabPanel>

          <TabPanel>
            <PostForm />
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </>
  );
};

export default PostsPage;
