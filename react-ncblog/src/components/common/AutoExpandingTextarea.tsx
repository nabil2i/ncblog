import { Flex, Textarea } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PostFormData } from "../../entities/Post";

interface Props {
  id: "title" | "body" | "userId";
  defaultValue: string;
  placeholder: string;
  register: UseFormRegister<PostFormData>;
  setFieldValue: UseFormSetValue<PostFormData>;
}

const AutoExpandingTextarea = ({
  id,
  defaultValue,
  placeholder,
  register,
  setFieldValue,
}: Props) => {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    register(id, {
      required: "Title is required",
      minLength: {
        value: 10,
        message: "Title must be at least 10 characters.",
      },
    }).onChange(event);
    setFieldValue(id, event.target.value);
  };

  return (
    <Flex direction="column">
      <Textarea
        onChange={handleInputChange}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        focusBorderColor="transparent"
        borderColor="transparent"
        _hover={{ borderColor: "transparent" }}
        resize="none"
        _focus={{
          borderColor: "transparent.500",
        }}
        fontSize={40}
        fontWeight="bold"
        overflow="hidden"
        overflowY="hidden"
      />
    </Flex>
  );
};

export default AutoExpandingTextarea;
