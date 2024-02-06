import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { ReactElement } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";

export interface Stats {
  totalItems: number;
  lastMonthItems: number;
}
interface Props {
  name: string;
  stats: Stats;
  icon: ReactElement;
}
const StatsCard = ({ name, stats, icon }: Props) => {
  const { colorMode } = useColorMode();
  
  return (
    <Flex
      direction="column"
      gap={4}
      p={3}
      w={{ base: "full", md: 72 }}
      className="rounded-md shadow-md"
      bg={ colorMode === 'light' ? '' : 'gray.900'}
    >
      <Flex justify="space-between">
        <Flex direction="column">
          <Box as={"h3"} className=" text-gray-500 text-md uppercase">
            {name}
          </Box>
          <Box className="text-2xl ">{stats?.totalItems}</Box>
        </Flex>
        {icon}
      </Flex>
      <Flex gap={2} align="center">
        <Box as="span" color="green.500" display="flex" alignItems="center">
          <HiArrowNarrowUp />
          {stats?.lastMonthItems}
        </Box>
        <Text color="gray">Last month</Text>
      </Flex>
    </Flex>
  );
};

export default StatsCard;
