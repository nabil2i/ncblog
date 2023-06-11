import hero from '../assets/hero-image.webp'
import { Box, HStack, Image } from '@chakra-ui/react'

const Hero = () => {
  return (
    
      <Image src={hero} padding="10px" overflow="hidden" textAlign="center" border-radius="lg" width="90%" maxH="528px" />
   
    
  )
}

export default Hero