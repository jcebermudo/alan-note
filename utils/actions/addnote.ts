'use server'
import { prisma } from '@/prisma'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

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
                title: "New note",
                content: "New note content",
                userId: userId,
            },
        })

        console.log('Note created:', note)

        revalidatePath('/notes')
        return note
    } catch (err) {
        console.error("Error in addNote:", err)
        throw err
    }
}

