import { VStack } from "@chakra-ui/react";
import Headline from "./HeroHeadline";

const HeroSection = () => {
  return (
    <VStack as="section">
      <Headline></Headline>
    </VStack>
  );
};

export default HeroSection;
