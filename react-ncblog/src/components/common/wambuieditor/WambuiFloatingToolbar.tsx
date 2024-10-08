// src/components/FloatingToolbar.tsx
import { fa2 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  // FaListOl,
  // FaListUl,
  FaQuoteRight,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import styled from "styled-components";

interface FloatingToolbarProps {
  editor: Editor | null;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ editor }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && editor) {
        const range = selection.getRangeAt(0);
        if (!range.collapsed) {
          const rect = range.getBoundingClientRect();
      
          // Calculate desired top and left positions
          const top = rect.top - 60 + window.scrollY;
          let left = rect.left + rect.width / 2 + window.scrollX + 30;

        // Adjust position if toolbar is out of viewport
        const toolbarWidth = 300; // Approximate width of the toolbar
        const viewportWidth = window.innerWidth;

        if (left + toolbarWidth > viewportWidth) {
          left = viewportWidth - toolbarWidth - 20; // Ensure it fits in the screen
        }
        if (left < 0) {
          left = 10; // Padding from the left edge
        }

          setPosition({
            top,
            left
          });
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener("selectionchange", handleSelection);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, [editor]);

  if (!isVisible) return null;

  return (
    <ToolbarContainer style={{ top: position.top, left: position.left }}>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleBold().run()}
        active={editor?.isActive("bold") ?? false}
      >
        <FaBold />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        active={editor?.isActive("italic") ?? false}
      >
        <FaItalic />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        active={editor?.isActive("underline") ?? false}
      >
        <FaUnderline />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        active={editor?.isActive("strike") ?? false}
      >
        <FaStrikethrough />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleCode().run()}
        active={editor?.isActive("code") ?? false}
      >
        <FaCode />
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        active={editor?.isActive("heading", { level: 1 }) ?? false}
      >
        <FaHeading />
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        active={editor?.isActive("heading", { level: 2 }) ?? false}
      >
        <FontAwesomeIcon icon={fa2} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        active={editor?.isActive("blockquote") ?? false}
      >
        <FaQuoteRight />
      </ToolbarButton>
      {/* <ToolbarButton
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        active={editor?.isActive("bulletList") ?? false}
      >
        <FaListUl />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        active={editor?.isActive("orderedList") ?? false}
      >
        <FaListOl />
      </ToolbarButton> */}
    </ToolbarContainer>
  );
};

export default FloatingToolbar;

const ToolbarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap; /* Enable wrapping */
  gap: 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0.3rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateX(-50%);
  z-index: 1000;
  max-width: 90vw; /* Set max width based on viewport */
  overflow-x: auto; /* Add horizontal scrolling if necessary */
  box-sizing: border-box; /* Prevent overflow due to padding */

  @media (max-width: 768px) {
    /* Additional styling for smaller screens */
    max-width: 95vw;
    transform: translateX(0); /* Disable centering on very small screens */
  }
`;

interface ToolbarButtonProps {
  active: boolean;
}

const ToolbarButton = styled.button.attrs({
  type: "button",
})<ToolbarButtonProps>`
  background: ${(props) => (props.active ? "#e5e7eb" : "transparent")};
  border: none;
  padding: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
  color: #374151;

  &:hover {
    background: #e5e7eb;
  }

  svg {
    width: 1em;
    height: 1em;
  }
`;
