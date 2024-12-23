
'use client'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { user } from '@/dummy_Data'
import { Heart, ImageIcon, LockKeyhole, MessageCircle, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'



const Post = ({ post, isSubscribed, admin }: { post: any, isSubscribed: boolean, admin: any }) => {


    const [isLiked, setIsLiked] = useState(true)


    return (
        <div className='flex flex-col gap-3 p-3 border-t'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={admin.image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='font-semibold text-sm  md:text-md'>
                        {admin.name}
                    </span>
                </div>
                <div className='flex items-center gap-2'>

                    <p className='text-zinc-500 text-xs md:text-sm tracking-tighter'>
                        17.06.2024
                    </p>
                    {
                        admin.id === user.id && (
                            <Trash className='w-4 h-4 text-muted-foreground cursor-pointer
                            hover:text-red-500'/>
                        )
                    }
                </div>
            </div>

            <p className='text-sm md:text-md'>{post.content}</p>

            {
                (post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "image"
                && (
                    <div className='relative w-full pb-[56.25%] rounded-lg overflow-hidden'>
                        <Image
                            src={post.mediaUrl}
                            alt='post-image'
                            fill
                            className='rounded-lg object-cover'
                        />
                    </div>
                )
            }


            {/* for rendering video */}
            {/* {
                (post.isPublic || isSubscribed)  && post.mediaUrl && post.mediaType==="image"
                && (
                    <div>

                    </div>
                )
            } */}


            {
                !isSubscribed && !post.isPublic && (
                    <div className='rounded-md flex-col flex items-center h-96 bg-slate-800 justify-center'>
                        <LockKeyhole className='w-16 h-16 z-0 bottom-0 absolute' />
                        <div />
                        <div className='flex flex-col gap-2 z-10 border p-2 border-gray-500
                        w-full rounded-md'>
                            <div className='flex gap-1 items-center'>
                                <ImageIcon className='w-4 h-4' />
                                <span className='text-xs'>1</span>
                            </div>

                            <Link className={buttonVariants({ className: "rounded-full w-full font-bold text-white," })} href={'/pricing'}
                            >Pricing</Link>
                        </div>
                    </div>
                )
            }

            <div className='flex gap-4'>
                <div className='flex gap-1 items-center'>
                    <Heart className='w-4 h-4 cursor-pointer' />
                    <span className='text-xs tracking-tighter'>55</span>
                </div>
                <div className='flex gap-1 items-center'>
                    <MessageCircle className='w-4 h-4 cursor-pointer' />
                    <span className='text-xs tracking-tighter'>55</span>
                </div>

            </div>
        </div>
    )
}

export default Post
