import { Heading } from "@chakra-ui/react";
import { PostQuery } from "../App";

interface Props {
  postQuery: PostQuery;
}

const PostHeading = ({ postQuery }: Props) => {
  let heading;
  if (postQuery.searchText){
    heading = `Search Posts containing: ${postQuery?.searchText || ''}`;
  }
  else {
    heading = "Posts";
  }
  return <Heading as="h2" marginY={5} fontSize='5xl'>{heading}</Heading>;
};

export default PostHeading;
