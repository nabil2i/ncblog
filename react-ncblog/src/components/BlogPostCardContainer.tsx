import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const BlogPostCardContainer = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        transform: 'scale(1.03)',
        transition: 'transform .05s ease-in'
      }}
      maxWidth="350px" borderRadius="lg" borderWidth="1px" overflow="hidden">
      {children}
    </Box>
  )
}

export default BlogPostCardContainer;
