import { addNote } from "@/utils/actions/addnote";

export default function NoteSidebar() {
  return (
    <div className="p-4">
      <button onClick={addNote}>Add note</button>
    </div>
  );
}
