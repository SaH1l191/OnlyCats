import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { DollarSign } from 'lucide-react'
import Link from 'next/link'
import ZoomedImage from './ZoomedImage'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

const SuggestedProduct = ({ product }: { product: any }) => {
    return (
        <Card className=' flex flex-col  '>
            <CardHeader className='px-2 flex flex-row items-center justify-between space-y-0 pb-0 '>
                <CardTitle className=' text-sm font-medium'>
                    <p className='overflow-hidden w-28 text-nowrap'>{product.name}</p>
                </CardTitle>
                <div>
                    <DollarSign className='inline h-2 w-4 text-muted-foreground' />
                    <span className='text-sm'>{product.price}</span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-2 p-2'>
                <ZoomedImage imgSrc={product.image} className='h-44 object-cover' />
                <div className='flex justify-center mt-auto '>
                    <Link href={`/merch/${product.id}`} className={cn("w-full", buttonVariants({ size: "sm" }))}>
                        <span className='text-primary-foreground'>Buy Now</span></Link>
                </div>

            </CardContent>
        </Card>
    )
}

export default SuggestedProduct