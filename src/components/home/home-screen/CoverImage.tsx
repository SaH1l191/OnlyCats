import prisma from '@/db/prisma'
import { Heart, ImageIcon, Video } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CoverImage = async() => {

	const imageCount = await prisma.post.count({
		where :{
			mediaType:"image"
		}
	})
	const videoCount = await prisma.post.count({
		where :{
			mediaType:"video"
		}
	})

	const totalLikes = await prisma.post.aggregate({
		_sum :{
			likes :true
		}
	})
	const totalLikes1 = await prisma.like.count()
	console.log("totalLikes1 ",totalLikes1)

	return (
		<div className='h-44 overflow-hidden relative '>
			<Image src={"/featured/featured10_.jpg"} className="h-full object-cover pointer-events-none select-none" fill alt='Horse Cover Image' />
			{/* now we are giving some shading from top */}
			<div
				className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-transparent'
			/>
			<div className='flex justify-between items-center absolute top-0 left-0 w-full z-20 py-1 px-2 '>
				<div className='flex gap-2 items-center'>
					<div className='flex flex-col text-white'>
						<p className='font-bold'>John</p>

						<div className='flex gap-2 items-center'>
							<div className='flex items-center gap-1'>
								<ImageIcon className='w-4 h-4' />
								<span className='text-sm font-bold'>{imageCount}</span>
							</div>

							<span className='text-xs'>•</span>
							<div className='flex items-center gap-1'>
								<Video className='w-4 h-4' />
								<span className='text-sm font-bold'>{videoCount}</span>
							</div>

							<span className='text-xs'>•</span>
							<div className='flex items-center gap-1'>
								<Heart className='w-4 h-4' />
								<span className='text-sm font-bold'>{totalLikes._sum.likes}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default CoverImage