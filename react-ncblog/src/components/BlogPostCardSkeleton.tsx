import { SkeletonText, Card, CardBody, HStack, CardFooter, Flex, SkeletonCircle, Box } from "@chakra-ui/react";

const BlogPostCardSkeleton = () => {
  return (
      <Card height="100%" borderRadius='4'>
        <CardBody>
          <SkeletonText
            height="200px"
            borderRadius='xl'
            mx='auto'
          />
          <HStack mt='5' spacing="3">
            <SkeletonText width={2}/>
            <SkeletonText width={2}/>
          </HStack>
            <SkeletonText />
            <SkeletonText />
        </CardBody>
        <CardFooter>
          <Flex mt="4" gap='2'>
            <SkeletonCircle />
              <Box>
                <SkeletonText />
                <SkeletonText />
              </Box>
            </Flex>
        </CardFooter>
    </Card>

  )
}

export default BlogPostCardSkeleton;