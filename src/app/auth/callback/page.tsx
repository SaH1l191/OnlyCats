"use client"
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { checkAuthStatus } from './actions'

const Page = () => {
	const router = useRouter()
	const { data } = useQuery({
		queryKey: ["authCheck"],
		queryFn: async () => await checkAuthStatus()
	})

	useEffect(() => {
		if (data?.sucess || data?.sucess === false) {//user created and redirect to home to prevent stuck here 
			router.push("/")
		}
	}, [data])

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