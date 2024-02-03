import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  text?: string;
  textFontSize?: string;
  disabled?: boolean;
  colorScheme?: string;
  color?: string;
}

export const CustomButton = ({ onClick, children, color, text, disabled, textFontSize, colorScheme }: Props) => (
  <button onClick={onClick} disabled={disabled}>
    <Flex justify="center" align="center" gap={2}>
      {children}
      <Text fontSize={textFontSize} size="2" color={color || "gray"} colorScheme={colorScheme}>
        {text}
      </Text>
    </Flex>
  </button>
);