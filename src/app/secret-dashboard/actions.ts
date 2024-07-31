"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

type PostArgs = {
    mediaUrl: string,
    mediaType: "image" | "video",
    text: string
}

export const createPostAction = async ({mediaUrl, mediaType, text}: PostArgs)=> {
    const {isAuthenticated, getUser}= getKindeServerSession()
    const user = await getUser()

    if(!(await isAuthenticated())){
        throw new Error('user not found')
    }

    if(!mediaUrl){
        throw new Error("You should post media!")
    }

    const newPost = await prisma.post.create({
        data: {
            mediaUrl,
            mediaType,
            text,
            userId: user?.id!
        }
    })
    return { success: true, post: newPost };
}

