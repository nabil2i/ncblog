import { VStack } from "@chakra-ui/react";
import Headline from "./HeroHeadline";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  return (
    <VStack as="section">
      <Headline></Headline>
      <HeroImage></HeroImage>
    </VStack>
  );
};

export default HeroSection;
