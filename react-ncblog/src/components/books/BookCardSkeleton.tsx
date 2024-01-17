import { SkeletonText, Card, CardBody, HStack, CardFooter, Flex, SkeletonCircle, Box } from "@chakra-ui/react";

const BookCardSkeleton = () => {
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
          <SkeletonText />
        </CardFooter>
    </Card>

  )
}

export default BookCardSkeleton;
