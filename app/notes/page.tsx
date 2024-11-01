import { auth } from "@/auth";
import NoteCollection from "@/components/NoteCollection";
import NoteSidebar from "@/components/NoteSidebar";

export default async function NotesPage() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return (
    <div>
      <NoteSidebar />
      <NoteCollection />
    </div>
  );
}
