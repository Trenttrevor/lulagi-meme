"use client"

import React from 'react'
import Post from './Post'
import PostSkeleton from './skeletons/PostSkeleton'
import {posts, admin} from '@/dummy_data'
import { useQuery } from '@tanstack/react-query'


const Posts = () => {
    const isLoading = false
 
  return (
    <div>
        {!isLoading && posts?.map((post)=>(
            <Post key={post.id} post={post} />
        ))}

        {isLoading && (
            <div className='mt-10 px-3 flex flex-col gap-10'>
                {[...Array(3)].map((_,index)=>(
                    <PostSkeleton key={index}/>
                ))}
            </div>
        )}

        {posts.length === 0 && !isLoading &&(
            <div className='mt-10 px-3 items-center'>              
                    <p className='text-xl font-semibold text-center'>
                        No Posts Yet
                    </p>
            </div>
        )}
    </div>
  )
}

export default Posts