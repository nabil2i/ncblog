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
  variant?: "solid" | "outline" | "ghost";
}

export const CustomButton = ({
  onClick,
  children,
  color,
  text,
  disabled,
  textFontSize,
  colorScheme,
  variant = "solid",
}: Props) => {
  // Styles based on the variant
  let buttonStyles;

  switch (variant) {
    case "outline":
      buttonStyles = {
        border: `2px solid ${colorScheme}`,
        background: "transparent",
        color: color || colorScheme,
      };
      break;

    case "ghost":
      buttonStyles = {
        background: "transparent",
        color: color || colorScheme,
        border: "none",
      };
      break;

    default:
      buttonStyles = {
        background: colorScheme,
        color: color || "white",
        border: "none",
      };
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        // padding: "8px 16px",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...buttonStyles, // Apply variant styles
      }}
    >
      <Flex justify="center" align="center">
        {children}
        <Text
          fontSize={textFontSize}
          size="2"
          color={color || "gray"}
          colorScheme={colorScheme}
        >
          {text}
        </Text>
      </Flex>
    </button>
  );
};
