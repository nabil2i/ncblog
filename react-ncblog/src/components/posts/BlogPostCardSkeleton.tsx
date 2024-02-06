import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const BlogPostCardSkeleton = () => {
  return (
    <Card height="100%" borderRadius="4">
      <CardBody>
        <Skeleton mt={3} mb={3} height="200px" borderRadius="xl" mx="auto" />
        <Box mb={8}>
          <SkeletonText height="40px" width="100px" />
        </Box>

        <Box mb={5}>
          <SkeletonText height="40px" />
        </Box>
        <Box mb={2}>
          <SkeletonText height="40px" />
        </Box>
      </CardBody>
      <CardFooter>
        <Flex gap="2" align="center">
          <SkeletonCircle size="60px" />
          <Box>
            <SkeletonText height="40px" width="90px" />
          </Box>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCardSkeleton;
