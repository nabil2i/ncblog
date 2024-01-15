import { Box, Flex } from "@chakra-ui/react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: Array<{ url: string; caption: string }>;
}

const ImageCarousel = ({ images }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Box width="100%" height="400px">
        <Fade>
          {images.map((image, index) => (
            <Box key={index}>
              <Flex
                height="400px"
                bgSize="cover"
                justify="center"
                align="center"
                bg={image.url}
              >
                {/* <span >{image.caption}</span> */}
              </Flex>
            </Box>
          ))}
        </Fade>
      </Box>
    </>
  );
};

export default ImageCarousel;
