import NoteSidebar from "@/components/NoteSidebar";
import { prisma } from "@/prisma";
import Tiptap from "@/components/Tiptap";

type Params = Promise<{ id: string }>;

export default async function NotePage(props: { params: Params }) {
  const id = await props.params;
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
