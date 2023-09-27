import { SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
// import { PostQuery } from "../App";
import usePosts from "../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";
import PaginationBox from "./PaginationBox";
// import usePostQueryStore from "../store";

interface Props {
  paginate: (page: number) => void;
}

const PostGrid = ({ paginate }: Props) => {
  const { data, error, isLoading } = usePosts();
  // console.log(data);

  if (isLoading)
    return (
      <VStack marginTop={2}>
        <Spinner />
      </VStack>
    );

  const skeletons = [1, 2, 3, 4];

  return (
    <>
      {error && (
        <Text textAlign={"center"}>
          {" "}
          We encountered a problem. Please retry later.
        </Text>
      )}

      <VStack paddingBottom={5}>
        <SimpleGrid
          textAlign="center"
          columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
          spacing={3}
          padding={1}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <BlogPostCardContainer key={skeleton}>
                <BlogPostCardSkeleton />{" "}
              </BlogPostCardContainer>
            ))}

          {data?.results.map((post) => (
            <BlogPostCardContainer key={post._id}>
              <BlogPostCard post={post} />
            </BlogPostCardContainer>
          ))}
        </SimpleGrid>

        {data?.count ? (
          <PaginationBox
            postPerPage={data?.perPage as number}
            totalPosts={data?.count as number}
            currentPage={data?.current as number}
            prev={data?.prev as number}
            next={data?.next as number}
            paginate={paginate}
          ></PaginationBox>)
          : <VStack><Text>Nothing found. Try a different search.</Text></VStack>
        }
      </VStack>
    </>
  );
};

export default PostGrid;
