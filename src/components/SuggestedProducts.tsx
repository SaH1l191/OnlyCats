import { products } from '@/dummy_Data'
import React from 'react'
import SuggestedProduct from './SuggestedProduct'
import prisma from '@/db/prisma'

const SuggestedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isArchived: false
    },
    take:4
  })
  return (
    <div className='hidden md:flex flex-col gap-3 px-2 sticky top-0 right-0 ml-3'>

      <div className='flex flex-col gap-2 mt-20'>
        <p className='uppercase text-muted-foreground font-semibold tracking-tight '>Recommended Products</p>
        {
          products.map((product) => {
            return <SuggestedProduct key={product.id} product={product} />
          })
        }
      </div>

    </div>
  )
}

export default SuggestedProducts