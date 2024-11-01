import { auth } from "@/auth";
import { prisma } from "@/prisma";

export default async function NoteCollection() {
  const session = await auth();
  if (!session) {
    return <div>Please log in to view your notes.</div>;
  }
  const notes = await prisma.note.findMany({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}
