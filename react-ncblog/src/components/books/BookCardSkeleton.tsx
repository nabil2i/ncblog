import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const BookCardSkeleton = () => {
  return (
    <Card textAlign="left" height="full" borderRadius="xl">
      <CardBody width={"400px"}>
        <Skeleton mt={0} mb={3} height="200px" borderRadius="xl" mx="auto" />

        <Box mb={8}>
          <SkeletonText height="40px" />
        </Box>

        <SkeletonText />
        <SkeletonText />

        <Flex justify="space-between" align="center" mt={4}>
          <SkeletonText height="1" width="150px" />
          <SkeletonText height="1" width="20" />
        </Flex>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default BookCardSkeleton;
