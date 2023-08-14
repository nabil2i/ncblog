import { Heading } from "@chakra-ui/react";
import usePostQueryStore from "../store";

const PostsHeading = () => {
  let heading;
  
  const searchText = usePostQueryStore(s => s.postQuery.searchText);

  if (searchText){
    heading = `Search Posts containing: ${searchText || ''}`;
  }
  else {
    heading = "Posts";
  }
  return <Heading as="h2" marginY={5} fontSize='5xl'>{heading}</Heading>;
};

export default PostsHeading;
