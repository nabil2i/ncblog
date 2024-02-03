import { Box, Image } from "@chakra-ui/react";

const PostImage = ({ img }: { img: string }) => {
  // const aspectRatio = "16:9";

  return (
    <>
      <Box w="100%">
        <Image
          src={img}
          maxW="100%"
          maxH="500px"
          objectFit="cover"
          alt="Image description"
        />
      </Box>
      {/* <Box
        maxW="100%"
        position="relative"
        w="100%"
        h="0"
        paddingBottom={`calc(${aspectRatio.split(":")[1]} / ${
          aspectRatio.split(":")[0]
        } * 100%)`}
      >
        <Image
          position="absolute"
          src={img}
          // maxW="100%"
          // maxH="500px"
          top="0"
          left="0"
          w="100%"
          h="100%"
          objectFit="cover"
          alt="Image description"
        />
      </Box> */}
    </>
  );
};

export default PostImage;
