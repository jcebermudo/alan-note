"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [elements, setElements] = useState<
    { title: string; content: string }[]
  >([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleCreateNote = () => {
    setShowPopup(true);
    setEditingIndex(null);
    setNoteTitle("");
    setNoteContent("");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNoteTitle("");
    setNoteContent("");
    setEditingIndex(null);
  };

  const handleAddNote = () => {
    if (noteTitle.trim() && noteContent.trim()) {
      if (editingIndex !== null) {
        setElements((prevElements) =>
          prevElements.map((el, index) =>
            index === editingIndex
              ? { title: noteTitle, content: noteContent }
              : el
          )
        );
      } else {
        setElements([...elements, { title: noteTitle, content: noteContent }]);
      }
      handleClosePopup();
    }
  };

  const handleEditNote = (index: number) => {
    setEditingIndex(index);
    setNoteTitle(elements[index].title);
    setNoteContent(elements[index].content);
    setShowPopup(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (noteTitle.trim() && noteContent.trim() && editingIndex !== null) {
        setElements((prevElements) =>
          prevElements.map((el, index) =>
            index === editingIndex ? { ...el, content: noteContent } : el
          )
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [noteTitle, noteContent, editingIndex]);

  const getPreview = (content: string) => {
    const words = content.split(" ");
    return words.length > 15 ? words.slice(0, 15).join(" ") + "..." : content;
  };

  return (
    <div className="">
      <button onClick={handleCreateNote}>Create note</button>
      {showPopup && (
        <div className="flex flex-col popup fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000]">
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Enter note title"
          />
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Enter note content"
          />
          <button onClick={handleAddNote}>
            {editingIndex !== null ? "Save Note" : "Add Note"}
          </button>
          <button onClick={handleClosePopup}>Exit</button>
        </div>
      )}
      <div>
        {elements.map((element, index) => (
          <div
            key={index}
            className="note-preview cursor-pointer"
            onClick={() => handleEditNote(index)}
          >
            <h3>{element.title}</h3>
            <p>{getPreview(element.content)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
