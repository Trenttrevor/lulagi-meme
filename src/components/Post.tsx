"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { user } from '@/dummy_data'
import { Heart, MessageCircle, Trash } from 'lucide-react'
import Image from 'next/image'

const Post = ({post}:{post:any}) => {
    const [isLiked, setIsLiked] = useState(false)
  return (
    <div className='flex flex-col gap-3 p-3 border-t'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Avatar>
                    <AvatarImage src={post.image}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-semibold text-sm md:text-md'>{post.name}</span>
            </div>
            <div className='flex gap-2 items-center'>
                <p className='text-zinc-400 text-xs'>17.06.2024</p>
                {post.id === user.id && (
                    <Trash className='w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer'/>
                )}
            </div>
        </div>

        <p className='text-sm'>{post.text}</p>
        {post.mediaUrl && post.mediaType === "image" && (
            <div className='relative w-full pb-[56%] rounded-lg overflow-hidden'>
                <Image
                    src={post.mediaUrl}
                    alt='post'
                    className='rounded-lg object-contain'
                    fill
                />
            </div>
        )}

        <div className='flex gap-4'>
            <div className='flex gap-1 items-center'>
                <Heart
                    onClick={()=>setIsLiked(!isLiked)}
                    className={`w-5 h-5 cursor-pointer ${isLiked?"text-red-800 fill-red-800":""}`}
                />
                <span className='text-sm'>55</span>
            </div>
            <div className='flex gap-1 items-center'>
                <MessageCircle
                    className='w-5 h-5 cursor-pointer'
                />
                <span className='text-sm'>11</span>
            </div>
        </div>
    </div>
  )
}

export default Post