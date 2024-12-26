"use client"
import { Loader } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div className='mt-20 w-full flex justify-center'>
			<div className='flex flex-col items-center gap-2'>
				<Loader className='w-10 h-10 animate-spin text-muted-foreground' /> 
				<p className='text-xl font-bold text-muted-foreground'>Loading...</p>
			</div>
		</div>
  )
}

export default Page