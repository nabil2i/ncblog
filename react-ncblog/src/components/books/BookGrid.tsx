import { Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import useBooks from "../../hooks/useBooks";
import PaginationBox from "../common/PaginationBox";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import BookCardSkeleton from "./BookCardSkeleton";

interface Props {
  paginate: (page: number) => void;
}

const BookGrid = ({ paginate }: Props) => {
  const { data: payload, error, isLoading } = useBooks();
  const data = payload?.data;
  // console.log(data);

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
      {error && (
        <Text py={8} textAlign={"center"}>
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
          <Flex justify="center" align="center">
            {isLoading &&
              skeletons.map((skeleton) => (
                <VStack>
                  <BookCardContainer key={skeleton}>
                    <BookCardSkeleton />{" "}
                  </BookCardContainer>
                </VStack>
              ))}

            {data?.results.map((book) => (
              <BookCardContainer key={book._id}>
                <BookCard book={book} />
              </BookCardContainer>
            ))}
          </Flex>
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
            <Text>Nothing found. Try a different search.</Text>
          </VStack>
        )}
      </VStack>
    </>
  );
};

export default BookGrid;
