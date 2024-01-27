import { Box, Flex } from "@chakra-ui/react";
import AddPostButton from "../../components/admin/posts/AddPostButton";
import PostsTable from "../../components/admin/posts/PostsTable";
import EditPostNav from "../../components/admin/posts/EditPostNav";
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
      <Box>
        <Flex direction="column" maxW="1440px" p={4}>
          <Flex justify="space-between" align="center">
            <Box>Posts</Box>
            <AddPostButton />
          </Flex>
          <Box>
            <PostsTable />
          </Box>
        </Flex>
      </Box>

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
