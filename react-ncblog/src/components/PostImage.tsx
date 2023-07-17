import { Box, Image } from "@chakra-ui/react";
import NabilConveys1 from "../assets/NabilConveys1.webp";

const PostImage = () => {
  return (
    <>
      <Box>
        <Image
          mt={3}
          mb={3}
          src={NabilConveys1}
          boxSize="350px"
          height="350px"
        />
      </Box>
    </>
  );
};

export default PostImage;
