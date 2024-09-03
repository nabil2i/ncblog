import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import book1 from "../../assets/images/thepurposeoflife.jpg";
import Book from "../../entities/Book";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

  return (
    <Link
      as={NavLink}
      _hover={{ textDecoration: "none" }}
      to={"/books/" + book._id}
    >
      <Card textAlign="left" height="100%" key={book._id} borderRadius="xl">
        <CardBody>
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

          <Heading as="h3" my="4" fontSize="xl" noOfLines={2}>
            {book.title}
          </Heading>

          <Text fontSize={"md"} noOfLines={3}>
            {book.about}
          </Text>

          {/* <Divider borderColor="gray.200"/> */}
          <Flex justify="space-between" align="center" mt={4}>
            <Box display={"inline-block"}>
              <Text>
                {" "}
                by{" "}
                <span className="font-semibold">
                  {book?.author?.firstname} {book?.author?.lastname}
                </span>
              </Text>
            </Box>
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
        </CardBody>
      </Card>
    </Link>
  );
};

export default BookCard;
