import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import useSearchPosts from "../../hooks/useSearchPosts";
import { useSearchPostQueryStore } from "../../store";
import PaginationBox from "../common/PaginationBox";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";

interface Props {
  paginate: (page: number) => void;
}

const SearchPostGrid = ({ paginate }: Props) => {
  const { data: payload, isLoading } = useSearchPosts();
  const data = payload?.data;

  const searchText = useSearchPostQueryStore(
    (s) => s.searchPostQuery.searchText
  );
  const { colorMode } = useColorMode();

  // console.log(data)
  // if (isLoading)
  //   return (
  //     <Box p={10}>
  //       <VStack marginTop={2}>
  //         <Spinner />
  //       </VStack>
  //     </Box>
  //   );

  const skeletons = [1, 2, 3, 4];
  return (
    <>
      {/* {error && <Text py={8}> We encountered a problem.</Text>} */}

      {/* <Center>
      <Flex
        direction="column"
        width= "1000px"
        // height="100%"
        // alignContent={"center"}
        // justifyContent={"center"}
        >
      </Flex>
    </Center> */}
      <Box paddingLeft={20}>
        {searchText && (
          <Heading as="h2" marginY={5} fontSize="5xl">
            {`Results for: `}
            <Text
              as="span"
              color={colorMode === "light" ? "gray.300" : "green.300"}
            >
              {`${searchText || ""}`}
            </Text>
          </Heading>
        )}
      </Box>
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

        {data?.count && data.count > 1 ? (
          <PaginationBox
            itemPerPage={data?.limit as number}
            totalItems={data?.count as number}
            currentPage={data?.current as number}
            prev={data?.prev as number}
            next={data?.next as number}
            paginate={paginate}
          ></PaginationBox>
        ) : (
          <></>
        )}

        {!data?.count && (
          <VStack>
            <Text>Oops, try a diffent search</Text>
          </VStack>
        )}
      </VStack>
    </>
  );
};

export default SearchPostGrid;
