import { Editor } from "@tiptap/react";
import React, { Fragment } from "react";
import MenuItem from "./MenuItem";

export interface MenuBarProps {
  editor: Editor;
}

export default function MenuBar({ editor }: MenuBarProps) {
  const items = [
    {
      icon: "bx-bold",
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: "bx-italic",
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: "bx-strikethrough",
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: "bx-code",
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: "bx-highlight",
      title: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      type: "divider",
    },
    {
      icon: "bx-heading",
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: "bx-heading",
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: "bx-paragraph",
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: "bx-list-ul",
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: "bx-list-ol",
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: "bx-list-check",
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      icon: "bx-code-block",
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "divider",
    },
    {
      icon: "bxs-quote-alt-left",
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    // {
    //   icon: "bx-separator",
    //   title: "Horizontal Rule",
    //   action: () => editor.chain().focus().setHorizontalRule().run(),
    // },
    // {
    //   type: "divider",
    // },
    // {
    //   icon: "bx-text-wrap",
    //   title: "Hard Break",
    //   action: () => editor.chain().focus().setHardBreak().run(),
    // },
    // {
    //   icon: "bx-format-clear",
    //   title: "Clear Format",
    //   action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    // },
    {
      type: "divider",
    },
    {
      icon: "bx-undo",
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: "bx-redo",
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className="divider" />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
