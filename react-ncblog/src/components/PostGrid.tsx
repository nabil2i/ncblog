import { SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { PostQuery } from "../App";
import usePosts from "../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";
import PaginationBox from "./PaginationBox";

interface Props {
  postQuery: PostQuery;
  paginate: (page: number) => void;
  // prevPaginate: (page: number) => void;
  // nextPaginate: (page: number) => void;
}

const PostGrid = ({ postQuery, paginate }: Props) => {
  //const { posts, error, isLoading } = usePosts();
  const { data, error, isLoading } = usePosts(postQuery);
  // console.log(data);
 
  

  if (isLoading) return <Spinner />;

  const skeletons = [1, 2, 3, 4];

  return (
    <>
      {/* {error && <Text>{error}</Text>} */}
      {error && <Text> We encountered a problem.</Text>}
      {/* <LatestPosts></LatestPosts> */}
      <VStack paddingBottom={5}>
        <SimpleGrid
          textAlign="center"
          columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
          spacing={10}
          padding={10}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <BlogPostCardContainer key={skeleton}>
                <BlogPostCardSkeleton />{" "}
              </BlogPostCardContainer>
            ))}

          {data?.results?.map((post) => (
            <BlogPostCardContainer key={post._id}>
              <BlogPostCard post={post} />
            </BlogPostCardContainer>
          ))}
        </SimpleGrid>

        <PaginationBox
            postPerPage={data.perPage}
            totalPosts={data.count}
            currentPage={data.current}
            prev={data.prev}
            next={data.next}
            paginate={paginate}
            // prevPaginate={prevPaginate}
            // nextPaginate={nextPaginate}
          ></PaginationBox>
      </VStack>
      
    </>
  );
};

export default PostGrid;
