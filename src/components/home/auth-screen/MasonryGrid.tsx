"use client";
import Image from "next/image";
import { useState } from "react";


const MasonryGrid = () => {

    
	



    return (
        <div className='p-5 sm:p-8'>
            <div className='columns-1 sm:columns-2 md:columns-3 lg:row-4 gap-4 [&>div:not(:first-child)]:mt-8'>
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className='relative overflow-hidden rounded-md'
                    >
                        <Image
                            src={`/featured/featured${i + 1}.jpg`}
                            className='cursor-pointer hover:scale-150 transition-transform duration-500 ease-in-out'
                            alt='Featured Horse'
                            width={500}
                            height={500}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MasonryGrid