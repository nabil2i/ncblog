import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import styled from "styled-components";
import "./WambuiEditor.css";
import WambuiFloatingToolbar from "./WambuiFloatingToolbar";

// interface ToolbarButton {
//   name: string;
//   icon: JSX.Element;
//   action: () => void;
//   isActive: boolean;
// }

interface Props {
  // id: "title" | "body" | "userId";
  // register: UseFormRegister<PostFormData>;
  // setFieldValue: UseFormSetValue<PostFormData>;
  placeholder: string;
  value: string;
  handleEditorChange: (value: string) => void;
}

const WambuiEditor = ({ placeholder, value, handleEditorChange }: Props) => {
  // const [editorContent, setEditorContent] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Underline,
    ],
    content: value,
    autofocus: true,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // setEditorContent(html);
      handleEditorChange(html);
    },
  });

  // Toolbar Buttons
  // const toolbarButtons: ToolbarButton[] = [
  //   {
  //     name: "bold",
  //     icon: <FaBold />,
  //     action: () => editor?.chain().focus().toggleBold().run(),
  //     isActive: editor?.isActive("bold") || false,
  //   },
  //   {
  //     name: "italic",
  //     icon: <FaItalic />,
  //     action: () => editor?.chain().focus().toggleItalic().run(),
  //     isActive: editor?.isActive("italic") || false,
  //   },
  //   {
  //     name: "underline",
  //     icon: <FaUnderline />,
  //     action: () => editor?.chain().focus().toggleStrike().run(),
  //     isActive: editor?.isActive("underline") || false,
  //   },
  //   {
  //     name: "strike",
  //     icon: <FaStrikethrough />,
  //     action: () => editor?.chain().focus().toggleStrike().run(),
  //     isActive: editor?.isActive("strike") || false,
  //   },
  //   {
  //     name: "code",
  //     icon: <FaCode />,
  //     action: () => editor?.chain().focus().toggleCode().run(),
  //     isActive: editor?.isActive("code") || false,
  //   },
  //   {
  //     name: "heading",
  //     icon: <FaHeading />,
  //     action: () =>
  //       editor
  //         ?.chain()
  //         .focus()
  //         .toggleHeading({
  //           level: 1,
  //         })
  //         .run(),
  //     isActive: editor?.isActive("heading", { level: 1 }) || false,
  //   },
  //   {
  //     name: "heading",
  //     icon: <FontAwesomeIcon icon={fa2} />,
  //     action: () =>
  //       editor
  //         ?.chain()
  //         .focus()
  //         .toggleHeading({
  //           level: 2,
  //         })
  //         .run(),
  //     isActive: editor?.isActive("heading", { level: 2 }) || false,
  //   },
  //   {
  //     name: "blockquote",
  //     icon: <FaQuoteRight />,
  //     action: () => editor?.chain().focus().toggleBlockquote().run(),
  //     isActive: editor?.isActive("blockquote") || false,
  //   },
  //   {
  //     name: "bulletList",
  //     icon: <FaListUl />,
  //     action: () => editor?.chain().focus().toggleBulletList().run(),
  //     isActive: editor?.isActive("bulletList") || false,
  //   },
  //   {
  //     name: "orderedList",
  //     icon: <FaListOl />,
  //     action: () => editor?.chain().focus().toggleOrderedList().run(),
  //     isActive: false,
  //   },
  //   {
  //     name: "image",
  //     icon: <FaImage />,
  //     action: () => addImage(),
  //     isActive: false,
  //   },
  //   {
  //     name: "link",
  //     icon: <FaLink />,
  //     action: () => addLink(),
  //     isActive: editor?.isActive("link") || false,
  //   },
  //   {
  //     name: "undo",
  //     icon: <FaUndo />,
  //     action: () => editor?.chain().focus().undo().run(),
  //     isActive: false,
  //   },
  //   {
  //     name: "redo",
  //     icon: <FaRedo />,
  //     action: () => editor?.chain().focus().redo().run(),
  //     isActive: false,
  //   },
  // ];

  // const addImage = () => {
  //   const url = window.prompt("Enter image URL");

  //   if (url) {
  //     editor?.chain().focus().setImage({ src: url }).run();
  //   }
  // };

  // const addLink = () => {
  //   const url = window.prompt("Enter URL");

  //   if (url) {
  //     editor
  //       ?.chain()
  //       .focus()
  //       .extendMarkRange("link")
  //       .setLink({ href: url })
  //       .run();
  //   }
  // };

  // Clean up the editor when the component unmounts
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <EditorContainer>
      {/* <Toolbar>
        {toolbarButtons.map((button) => (
          <ToolbarButton
            key={button.name}
            onClick={button.action}
            active={button.isActive}
            type="button"
          >
            {button.icon}
          </ToolbarButton>
        ))}
      </Toolbar> */}
      <StyledEditorContent editor={editor} />
      {/* Optional: Display the HTML content for debugging */}
      {/* <pre>{editorContent}</pre> */}
      <WambuiFloatingToolbar editor={editor} />
    </EditorContainer>
  );
};

export default WambuiEditor;

const EditorContainer = styled.div`
  /* position: relative;  To position the floating toolbar correctly */
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #e5e7eb; /* Tailwind Gray-200 */
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// const Toolbar = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-bottom: 1rem;
// `;

// interface ToolbarButtonProps {
//   active: boolean;
// }

// const ToolbarButton = styled.button<ToolbarButtonProps>`
//   background: ${(props) => (props.active ? "#e5e7eb" : "transparent")};
//   border: none;
//   padding: 0.5rem;
//   border-radius: 4px;
//   cursor: pointer;
//   color: #374151; /* Tailwind Gray-700 */
//   transition: background 0.2s;

//   &:hover {
//     background: #e5e7eb;
//   }

//   &:focus {
//     outline: none;
//   }

//   svg {
//     width: 1em;
//     height: 1em;
//   }
// `;

const StyledEditorContent = styled(EditorContent)`
  min-height: 300px;
  font-size: 1.125rem;
  line-height: 1.5;
  color: #111827; /* Tailwind Gray-900 */

  .ProseMirror {
    outline: none;
  }

  p {
    margin: 0.5em 0;
  }

  h1,
  h2 h3,
  h4,
  h5,
  h6 {
    margin: 1em 0 0.5em;
    line-height: 1.2;
    font-weight: bold;
  }

  h1 {
    margin: 1em 0 0.5em;
    font-size: 2.5rem; /* Set font size for h1 */
    line-height: 1.2;
  }

  h2 {
    margin: 1em 0 0.5em;
    font-size: 2rem; /* Set font size for h2 */
    line-height: 1.2;
  }

  blockquote {
    border-left: 4px solid #d1d5db; /* Tailwind Gray-300 */
    padding-left: 1em;
    color: #6b7280; /* Tailwind Gray-500 */
    font-style: italic;
  }

  ul,
  ol {
    list-style-type: disc; /* For bullets */
    list-style-position: outside; /* Default position for bullets */
    padding-left: 2em;
    margin: 0.5em 0;
  }

  li {
    list-style-position: inside; /* Ensure bullets are inside the list */
  }

  a {
    color: #3b82f6; /* Tailwind Blue-500 */
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    background-color: #f3f4f6; /* Tailwind Gray-100 */
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: "Fira Code", monospace;
  }
`;
