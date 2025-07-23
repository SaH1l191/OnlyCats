"use client"
import React, { useState } from 'react'
import Post from './Post'
import UnderlinedText from '@/components/decorators/UnderlinedText'
import PostSkeleton from '@/components/skeletons/PostSkeleton'
import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './actions'

const Posts = ({ admin, isSubscribed }: {
  admin: User,
  isSubscribed: boolean
}) => {

  const {data:data,isLoading} = useQuery({
    queryKey: ["posts"],
    queryFn:async()=>await getPosts(),
  }) 

  return (
    <div>
      {!isLoading && data?.posts.map(post =>
        <Post key={post.id} post={post} admin={admin} isSubscribed={isSubscribed} />
      )
      }


      {
        isLoading && (
          <div className='mt-10 px-3 flex flex-col gap-10'>
            {
              [...Array(10)].map((_, index) => (
                <PostSkeleton key={index} />
              ))
            }
          </div>
        )
      }




      {/* <Post/>
      <Post/>
      <Post/> */}
      {!isLoading && data?.posts.length === 0 && (
        <div className='mt-10 px-3' >
          <div className='flex flex-col items-center space-y-3 md:w-3/4 w-full mx-auto'>
            <p className='text-xl font-semibold'>No Posts <UnderlinedText>
              yet </UnderlinedText> </p>
            <p className='text-center'>
              Stay tuned for more posts from {" "}
              <span className="text-primary font-semibold text-xl">OnlyHorse.</span>
              You can Subscribe to access exclusive content when it's available
            </p>
          </div>
        </div>
      )}


    </div>
  )
}

export default Posts
