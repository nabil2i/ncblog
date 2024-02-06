import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import image4 from "../../assets/images/hero-image.webp";
import image2 from "../../assets/images/landscape.jpeg";
import image1 from "../../assets/images/login.jpg";
import image5 from "../../assets/images/pof.jpg";
import image3 from "../../assets/images/pol.jpg";
import CallToActionOneReason from "../../components/common/CallToActionOneReason";
import HeroSection from "../../components/common/HeroSection";
import ImageCarousel from "../../components/common/ImageCarousel";
import LatestPosts from "../../components/posts/LatestPosts";

const HomePage = () => {
  // const setPage = usePostQueryStore((s) => s.setPage);
  // const searchText = usePostQueryStore((s) => s.postQuery.searchText);
  const images: Array<{ url: string; caption: string }> = [
    { url: image1, caption: "Image 1" },
    { url: image2, caption: "Image 2" },
    { url: image3, caption: "Image 3" },
    { url: image4, caption: "Image 4" },
    { url: image5, caption: "Image 5" },
  ];

  return (
    // <Box as="main">
    <Box>
      <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          <HeroSection />
          <Box as="section">
            <ImageCarousel images={images} />
          </Box>

          <Box maxW="1440px" mx="auto" w="full">
            <LatestPosts />
          </Box>
          <Flex m={5}>
            <CallToActionOneReason />
            {/* <CallToActionIera /> */}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
