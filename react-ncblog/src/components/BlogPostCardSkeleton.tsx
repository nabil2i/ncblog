import { SkeletonText, Card, CardBody } from "@chakra-ui/react";

const BlogPostCardSkeleton = () => {
  return (
      <Card>
        <CardBody>
          <SkeletonText />
          <SkeletonText />
        </CardBody>
    </Card>

  )
}

export default BlogPostCardSkeleton;