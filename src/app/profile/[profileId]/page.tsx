import BaseLayout from '@/components/BaseLayout'
import Posts from '@/components/Posts'
import UserProfile from '@/components/UserProfile'
import prisma from '@/db/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'

const Page = async ({params}:{params:{profileId:string}}) => {
  const thisPosts = await prisma.post.findMany({
    where:{
      userId:params.profileId
    }
  })

  return (
    <BaseLayout>
        <UserProfile/>
        {thisPosts.map((post)=>(
          <span key={post?.id}>{post.userId}</span>
        ))}
    </BaseLayout>
  )
}

export default Page