import NoteSidebar from "@/components/NoteSidebar";

import { prisma } from "@/prisma";
import React from "react";
import { Autosave } from "react-autosave";
import Tiptap from "@/components/Tiptap";

export default async function NotePage({ params }: { params: { id: string } }) {
  const id = await params;
  const idParams = id.id;
  const note = await prisma.note.findUnique({
    where: { id: idParams },
    select: { title: true, content: true },
  });
  async function updateTitle(changes: string) {
    await prisma.note.update({
      where: { id: idParams },
      data: { title: changes },
    });
  }

  return (
    <div>
      <NoteSidebar />
      <Tiptap id={idParams} content={note?.content || ""} />
    </div>
  );
}
