import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import Alpha from "../models/Alpha";
import MenuBar from "./MenuBar";

// const ydoc = new Y.Doc();

export interface EditorProps {
  alpha: Alpha;
}

export default function Editor({ alpha }: EditorProps) {
  // const [status, setStatus] = useState("connecting");

  // const [websocketProvider] = useState(
  //   () =>
  //     new HocuspocusProvider({
  //       url: "wss://connect.hocuspocus.cloud",
  //       parameters: {
  //         key: "write_B0sHbuV5xwYl6WzGjoqL",
  //       },
  //       name: alpha.attributes.name,
  //       document: ydoc,
  //     })
  // );

  const editor = useEditor({
    content: alpha.attributes.notes,
    extensions: [
      StarterKit.configure({
        // history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      // Collaboration.configure({
      //   document: ydoc,
      // }),
      // CollaborationCursor.configure({
      //   provider: websocketProvider,
      // }),
    ],
    onBlur: ({ editor }) => alpha.save({ notes: editor.getHTML() }),
  });

  useEffect(() => {
    // setCurrentUser(getInitialUser());
    // Update status changes
    // websocketProvider.on("status", (event) => {
    //   setStatus(event.status);
    // });
  }, []);

  // Save current user to localStorage and emit to editor
  // useEffect(() => {
  //   if (editor && currentUser) {
  //     localStorage.setItem("currentUser", JSON.stringify(currentUser));
  //     editor.chain().focus().updateUser(currentUser).run();
  //   }
  // }, [editor, currentUser]);

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}

      <EditorContent className="editor__content" editor={editor} />

      {/* <div className="editor__footer">
        <div className={`editor__status editor__status--${status}`}>
          {status === "connected"
            ? `${editor.storage.collaborationCursor.users.length} user${
                editor.storage.collaborationCursor.users.length === 1 ? "" : "s"
              } online in ${room}`
            : "offline"}
        </div>
        <div className="editor__name">
          <button onClick={setName}>{currentUser.name}</button>
        </div>
      </div> */}

      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </BubbleMenu>
      )}

      {/* {editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )} */}
    </div>
  );
}
