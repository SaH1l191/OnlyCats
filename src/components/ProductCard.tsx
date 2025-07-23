"use client"
import React from 'react'
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ZoomedImage from './ZoomedImage';
import { Button, buttonVariants } from "./ui/button";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleProductArchiveAction } from '@/app/secret-dashboard/actions';
import { useToast } from '@/hooks/use-toast';

const ProductCard = ({ product,adminView= false }: { product: any ,adminView?:boolean}) => {

    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { mutate: toggleArchive, isPending } = useMutation({
        mutationKey: ["toggleArchive"],
        mutationFn: async () => await toggleProductArchiveAction(product.id),
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey :["getAllProducts"]})
            toast({
                title: "Success",
                description: `Product ${product.isArchived ? "unarchived " : "archived "}  
                successfully ! `
            })
        }
    })


    return (
        <Card className=' flex flex-col'>
            <CardHeader className='px-2 flex flex-row items-center justify-between space-y-0 pb-2 '>
                <CardTitle className=' text-sm font-medium'>
                    <p className='overflow-hidden w-28 text-nowrap'>{product.name}</p>
                </CardTitle>
                <div>
                    <DollarSign className='inline h-2 w-4 text-muted-foreground' />
                    <span className='text-sm'>{product.price}</span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-10 p-2'>
                <ZoomedImage imgSrc={product.image} />
                <div className='flex justify-center mt-auto'>
                    {adminView && (
                        <Button
                            className='w-full '
                            variant={"outline"}
                            onClick={()=>toggleArchive()}
                            disabled={isPending}
                        >
                            {product.isArchived ? <span className=''>Unarchive</span> :
                                <span className=''>Archived</span>}
                        </Button>
                    )}

                    {!adminView && (
                        <Link href={`/merch/${product.id}`} className={cn("w-full ", buttonVariants())}>
                            <span className='text-primary-foreground'>Buy</span>
                        </Link>
                    )}
                </div>
                <div className='my-1 mx-2 '>
                    {
                        adminView && (
                            <span className={`text-sm font-medium ${product.isArchived ? "text-red-500" : "text-green-500"}`}>{product.isArchived ?
                                "Archived " : "Live"
                            }</span>
                        )
                    }
                    {!adminView && <span className={"text-sm font-medium text-green-500 "}>In Stock</span>}

                </div>

            </CardContent>
        </Card>
    )
}

export default ProductCard