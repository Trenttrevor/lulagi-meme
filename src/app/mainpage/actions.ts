"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

interface GetPostsParams{
    orderDate?: 'asc' | 'desc'
   orderLikes?: 'asc' | 'desc'
}

export const getPostsAction = async ({orderDate, orderLikes}:GetPostsParams)=> {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user) throw new Error("Unauthorized")

    const customOrder = orderDate
     ? {createdAt: orderDate}
      : {likeList:{_count: orderLikes}}


    const posts = await prisma.post.findMany({
        orderBy: customOrder,
        include:{
            user:true,
            comments:{
                include:{
                    user:true
                }
            },
            likeList:{
                where:{userId:user.id}
            }
        }
    })
    return posts
}

export const deletePostAction = async (postId:string)=> {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    const post = await prisma.post.findUnique({where:{id:postId}})

    if(post?.userId !== user?.id) throw new Error("delete your own!")
    
    await prisma.post.delete({where:{id:postId}})

    return {success:true}
}

export const likePostAction = async (postId:string)=> {
    const {getUser} =getKindeServerSession()
    const user = await getUser()

    if(!user){
        throw new Error('Unauthorized')
    }

    // search post that liked by user
    const thisPost = await prisma.post.findUnique({
        where:{id:postId},
        select:{
            likes:true,
            likeList:{where:{userId:user.id}}
        }
    })

    if(!thisPost) throw new Error('Post not found')

    const isLikedByUser = thisPost.likeList.length > 0

    const newLikes = isLikedByUser? Math.max((thisPost.likes-1,0)):thisPost.likes +1

    if(isLikedByUser){
        await prisma.like.deleteMany({
            where:{postId:postId, userId:user.id}
        })
    }else{
        await prisma.like.create({
            data:{postId:postId, userId:user.id}
        })
    }

    await prisma.post.update({
        where:{id:postId},
        data:{likes:newLikes}
    })

    return {success:true}
}

export const commentOnPostAction = async (postId:string, text:string)=> {
    const {getUser} =getKindeServerSession()
    const user = await getUser()

    if(!user){
        throw new Error('Unauthorized')
    }

    const comment = await prisma.comment.create({
        data:{
            text,
            postId,
            userId:user.id
        }
    })

    return {success:true}
}