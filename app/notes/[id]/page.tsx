import NoteSidebar from "@/components/NoteSidebar";
import { prisma } from "@/prisma";
import Tiptap from "@/components/Tiptap";

export default async function NotePage({ params }: { params: { id: string } }) {
  const id = await params;
  const idParams = id.id;
  const note = await prisma.note.findUnique({
    where: { id: idParams },
    select: { title: true, content: true },
  });

  return (
    <div>
      <NoteSidebar />
      <Tiptap id={idParams} content={note?.content || ""} />
    </div>
  );
}
