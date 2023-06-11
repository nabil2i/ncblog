import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const BlogPostCardContainer = ({ children }: Props) => {
  return (
    <Box width="350px"  borderRadius="lg" overflow="hidden">
      {children}
    </Box>
  )
}

export default BlogPostCardContainer