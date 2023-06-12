import { Text } from '@chakra-ui/react'

interface Props {
  date: string
}
const BlogPostDate = ({ date }: Props) => {
  return (
    <Text>{date}</Text>
    // <Text>{date.toDateString()}</Text>
  )
}

export default BlogPostDate