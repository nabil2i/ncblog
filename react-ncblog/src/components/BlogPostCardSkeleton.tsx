import { Box, Text, Heading, Skeleton, SkeletonText } from "@chakra-ui/react";

const BlogPostCardSkeleton = () => {
  return (
    <Box  height={228} borderWidth="1px" borderRadius="lg" overflow="hidden">
      {/* <Skeleton height="100px" /> */}
        {/* <Box m="5" as="a"> */}

        <Skeleton height={10}></Skeleton>
          <SkeletonText/>
          {/* <Heading m="5" mb="0" as="h4" size="md" fontSize="2xl">
            {post.title}
          </Heading> */}

          <SkeletonText />
          {/* <Text m="5" mt="0">
            My cool blog post
          </Text> */}
        {/* </Box> */}
    </Box>
  )
}

export default BlogPostCardSkeleton