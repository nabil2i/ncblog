import { Box } from "@chakra-ui/react";
import LatestPostsGrid from "./LatestPostsGrid";

const LatestPosts = () => {

  return (
    <>
      <Box as="section" textAlign="center">
        <LatestPostsGrid />
      </Box>
    </>
  );
};

export default LatestPosts;
