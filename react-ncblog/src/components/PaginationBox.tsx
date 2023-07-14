import { Button, HStack } from "@chakra-ui/react";

interface Props {
  postPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (number: number) => void;
}
const PaginationBox = ({
  postPerPage,
  totalPosts,
  currentPage,
  paginate,
}: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <HStack>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          size="sm"
          variant={number === currentPage ? "solid" : "outline"}
          colorScheme="teal"
          onClick={() => paginate(number)}
        >
          {number}
        </Button>
      ))}
    </HStack>
  );
};

export default PaginationBox;
