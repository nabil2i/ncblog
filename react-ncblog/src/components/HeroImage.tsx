import hero from '../assets/hero-image.webp'
import { Box, Image } from '@chakra-ui/react'

const HeroImage = () => {
  return (
      <Image
        src={hero}
        padding="10px"
        overflow="hidden"
        textAlign="center"
        border-radius="lg"
        width="100%"
        maxH="528px"
        />
  )
}

export default HeroImage;