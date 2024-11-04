"use client";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { updateNote } from "@/utils/actions/addnote";

export default function Tiptap(data: { id: string; content: string }) {
  const { id, content } = data;
  let parsedContent;

  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    console.error("Invalid JSON content:", error);
    parsedContent = ""; // or set to a default value
  }

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold],
    content: parsedContent,
    onUpdate({ editor }) {
      const jsonContent = editor.getJSON();
      console.log(editor.getJSON());
      updateNote({ id: id, content: JSON.stringify(jsonContent) });
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <EditorContent editor={editor} />
    </div>
  );
}
