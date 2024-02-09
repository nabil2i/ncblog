import { useState } from "react";
// import 'draft-js/dist/Draft.css';
import { Box } from "@chakra-ui/react";
import { ContentState, Editor, EditorState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PostFormData } from "../../entities/Post";

interface Props {
  content: string;
  id: "title" | "body" | "userId";
  defaultValue?: string;
  placeholder: string;
  register: UseFormRegister<PostFormData>;
  setFieldValue: UseFormSetValue<PostFormData>;
}

const PostTitleEditor = ({
  content,
  id,
  placeholder,
  register,
  setFieldValue,
}: Props) => {
  const [editorState, setEditorState] = useState(() => {
    if (content) {
      // If updating a post, convert HTML to ContentState
      const blocksFromHTML = convertFromHTML(content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(state);
    } else {
      // For a new post, start with an empty editor state
      return EditorState.createEmpty();
    }
  });

  const handleEditorChange = (newEditorState: EditorState) => {
    register(id, {
      required: "Title is required",
      minLength: {
        value: 10,
        message: "Title must be at least 10 characters.",
      },
    });
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    // const contentState = convertToRaw(newEditorState.getCurrentContent());
    // Convert ContentState to HTML and update the form value
    const html = stateToHTML(contentState);
    setFieldValue(id, html);
  };

  return (
    <Box fontSize={40} fontWeight="bold">
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default PostTitleEditor;
