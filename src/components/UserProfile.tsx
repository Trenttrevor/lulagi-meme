import React from 'react'
import CoverImage from './CoverImage'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const UserProfile = () => {
  return (
    <div className='flex flex-col'>
        <CoverImage/>

        <div className='flex flex-col p-4'>
            <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <Avatar className='w-20 h-20 border-2 -mt-10'>
						<AvatarImage src="/banner.jpg" className='object-cover' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>                   
            </div>

            <div className='flex flex-col mt-4'>
                <p className='text-lg font-semibold'>John ededad</p>
                <p className='text-sm mt-2 md:text-md'>Enjoy having fun with me, i dont care who you are. we are happier than before</p> 
            </div>
        </div>
        <div
            aria-hidden
            className='h-2 w-full bg-muted'
        />
    </div>
  )
}

export default UserProfile