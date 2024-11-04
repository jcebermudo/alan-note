import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
      useUpdatedAt: "desc",
    },
  });

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <Link href={`/notes/${note.id}`}>{note.title}</Link>
          <p>{dayjs(note.useUpdatedAt).fromNow()}</p>
        </div>
      ))}
    </div>
  );
}
