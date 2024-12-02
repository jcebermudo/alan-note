'use server'
import { prisma } from '@/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'

export async function addNote() {
    try {
         
        // Add debugging
        console.log('Starting addNote function')
        
        const session = await auth()
        console.log('Session:', !!session)

        if (!session) {
            throw new Error("Not authenticated")
        }

        const userId = session.user?.id
        console.log('UserId:', userId)

        if (!userId) {
            throw new Error("User ID is undefined")
        }

        // Debug prisma instance
        console.log('Prisma available:', !!prisma)
        console.log('Prisma note model available:', !!prisma.note)

        const note = await prisma.note.create({
            data: {
                userId: userId,
                useUpdatedAt: dayjs().format(),
            },
        })

        const newNote = await prisma.note.findFirst({
            where: {
                id: note.id,
                userId: userId,
            },
            select: {
                id: true,
            },
        })

        console.log('Note created:', note)

        revalidatePath('/notes')
        
        redirect(`/notes/${newNote?.id}`)

        return note
    } catch (err) {
        console.error("Error in addNote:", err)
        throw err
 
    }
}

export async function updateNote(data: {id: string, content: string}) {
    try {
        const newNote = await prisma.note.update({
            where: { id: data.id },
            data: { content: data.content, useUpdatedAt: dayjs().format() },

        });
        revalidatePath('/notes')
        return newNote;
    } catch (error) {
        console.error("Error in updateNote:", error)
        throw Error("Failed to update the form")
    }
}
