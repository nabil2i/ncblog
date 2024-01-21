import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import book1 from "../../assets/thepurposeoflife.jpg";
import Book from "../../entities/Book";
// import BlogPostAuthor from "./BlogPostAuthor";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

  return (
    <Link to={"/books/" + book._id}>
      <Card textAlign="left" height="100%" key={book._id} borderRadius="4">
        <CardBody>
          {/* <Center> */}
          <Image
            // objectFit='cover'
            mt={3}
            mb={3}
            src={book1}
            // boxSize="350px"
            height="200px"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
          />
          {/* </Center> */}

          <Heading as="h3" my="4" fontSize="xl" noOfLines={2}>
            {book.title}
          </Heading>

          <Text fontSize={"md"} noOfLines={3}>
            {book.about}
          </Text>
        </CardBody>
        {/* <Divider borderColor="gray.200"/> */}
        {/* <CardHeader>
          
        </CardHeader> */}
        <CardFooter as="div">
          <Flex justify="space-between" align="center" gap={"10px"}>
            {/* <Box display={"inline-block"}>
              {" "}
              <Text>
                {" "}
                {book?.author?.firstname} {book?.author?.lastname}
              </Text>
            </Box> */}
            {""}
            <Box>
              <Button
                variant="ghost"
                onClick={() => navigate(`/books/${book._id}`)}
              >
                Read more
              </Button>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Link>

    // <Box m="5" as="a" href="/blog-post-thing">
    //   <Heading m="5" mb="0" as="h4" size="md">
    //     Blog Post
    //   </Heading>
    //   <Text m="5" mt="0">
    //     My cool blog post
    //   </Text>
    // </Box>
  );
};

export default BookCard;
