import { Flex, Text, Heading, Icon } from '@chakra-ui/react';
import { ElementType } from 'react';

interface Props {
  title: string;
  icon: ElementType;
  description?: string;
}
const NavHoverBox = ({ title, icon, description }: Props) => {
  return (
    <>
      <Flex 
        className="arrow"/>
      <Flex
        h={200}
        // w={200}
        w="100%"
        direction="column"
        align="center"
        justify="center"
        backgroundColor="teal"
        borderRadius="10px"
        color="#fff"
        textAlign="center"
      >
        <Icon as={icon} fontSize="3xl" mb={4}/>
        <Heading size="md" fontWeight="normal">{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  )
}

export default NavHoverBox