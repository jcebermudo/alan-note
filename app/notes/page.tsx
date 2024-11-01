import { auth } from "@/auth";

import NoteSidebar from "@/components/NoteSidebar";

export default async function NotesPage() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return (
    <div>
      <NoteSidebar />
    </div>
  );
}
