import { Button, HStack } from "@chakra-ui/react";

interface Props {
  postPerPage: number;
  totalPosts: number;
  currentPage: number;
  prev: number;
  next: number;
  paginate: (page: number) => void;
}
const PaginationBox = ({
  postPerPage,
  totalPosts,
  currentPage,
  prev,
  next,
  paginate,
}: Props) => {
  // const [pageNumberLimit, setPageNumberLimit] = useState(3);
  // const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  // const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  
  const totalPages = Math.ceil(totalPosts / postPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <HStack spacing={2}>
      { currentPage && 
      <Button
        disabled={currentPage === 1}
        onClick={() => paginate(prev)}
        size="sm"
        variant={currentPage !== 1 ? "solid" : "outline"}
        colorScheme="teal"
        >Prev</Button>
      }

      {pageNumbers.map((page) => (

          <Button
          key={page}
          size="sm"
          variant={page === currentPage ? "solid" : "outline"}
          colorScheme="teal"
          onClick={() => paginate(page)}
          >
            {page}
          </Button>

      )
      )}

      {/* {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          size="sm"
          variant={index + 1 === currentPage ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </Button>
      ))} */}

      {currentPage && 
      <Button
        disabled={currentPage === totalPages}
        onClick={() => paginate(next)}
        size="sm"
        variant={currentPage !== totalPages ? "solid" : "outline"}
        colorScheme="teal"
        >Next</Button>
      }
    </HStack>
  );
};

export default PaginationBox;
