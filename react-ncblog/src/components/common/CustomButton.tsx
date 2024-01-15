import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  text?: string;
  textFontSize?: string;
  disabled?: boolean;
}

export const CustomButton = ({ onClick, children, text, disabled, textFontSize }: Props) => (
  <button onClick={onClick} disabled={disabled}>
    <Flex justify="center" align="center" gap={2}>
      {children}
      <Text fontSize={textFontSize} size="2" color="gray">
        {text}
      </Text>
    </Flex>
  </button>
);