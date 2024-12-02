import { addNote } from "@/utils/actions/note";
import NoteCollection from "@/components/NoteCollection";

export default function NoteSidebar() {
  return (
    <div className="p-4">
      <button onClick={addNote}>Add note</button>
      <NoteCollection />
    </div>
  );
}
