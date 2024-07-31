"use client"

import PostSkeleton from '@/components/skeletons/PostSkeleton'
import BerandaPost from './BerandaPost'
import { useQuery } from '@tanstack/react-query'
import { getPostsAction } from './actions'

interface BerandaPostsProps {
   orderDate?: 'desc' 
   orderLikes?:'desc'
}

const BerandaPosts = ({orderDate, orderLikes}:BerandaPostsProps) => {

    const {data:posts, isLoading}= useQuery({
        queryKey:["posts"],
        queryFn:async ()=> await getPostsAction({orderDate, orderLikes})
    })
 
  return (

    <div>
        {!isLoading && posts?.map((post)=>(
            <BerandaPost key={post.id} post={post} />
        ))}

        {isLoading && (
            <div className='mt-10 px-3 flex flex-col gap-10'>
                {[...Array(3)].map((_,index)=>(
                    <PostSkeleton key={index}/>
                ))}
            </div>
        )}

        {posts?.length === 0 && !isLoading &&(
            <div className='mt-10 px-3 items-center'>              
                    <p className='text-xl font-semibold text-center'>
                        No Posts Yet
                    </p>
            </div>
        )}
    </div>
  )
}

export default BerandaPosts