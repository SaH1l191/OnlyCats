import Marquee from '@/components/magicui/marquee'
import React from 'react'
import { cn } from "@/lib/utils";



const MarqueeTestimonials = () => {


    const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => {
        return (
            <figure
                className={cn(
                    "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                    // light styles
                    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    // dark styles
                    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                )}
            >
                <div className='flex flex-row items-center gap-2'>
                    <img className='rounded-full' width='32' height='32' alt='' src={img} />
                    <div className='flex flex-col'>
                        <figcaption className='text-sm font-medium dark:text-white'>{name}</figcaption>
                        <p className='text-xs font-medium dark:text-white/40'>{username}</p>
                    </div>
                </div>
                <blockquote className='mt-2 text-sm'>{body}</blockquote>
            </figure>
        );
    };



    const reviews = [
        {
            name: "Jack",
            username: "@jack",
            body: "The cat care tips are incredibly helpful. Love this site!",
            img: "https://avatar.vercel.sh/jack",
        },
        {
            name: "Jill",
            username: "@jill",
            body: "Fantastic insights on cat training. Highly recommend!",
            img: "https://avatar.vercel.sh/jill",
        },
        {
            name: "John",
            username: "@john",
            body: "Great community for cat lovers. Very informative!",
            img: "https://avatar.vercel.sh/john",
        },
        {
            name: "Jane",
            username: "@jane",
            body: "Wonderful content about daily life with cats. Amazing!",
            img: "https://avatar.vercel.sh/jane",
        },
        {
            name: "Jenny",
            username: "@jenny",
            body: "The exclusive cat footage is just stunning. I love it!",
            img: "https://avatar.vercel.sh/jenny",
        },
        {
            name: "James",
            username: "@james",
            body: "Cat health tips are spot on. Very useful website!",
            img: "https://avatar.vercel.sh/james",
        },
    ];
    

    const firstRow = reviews.slice(0, reviews.length / 2);
    const secondRow = reviews.slice(reviews.length / 2);


    return (
        <div>
            <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl'>
                <Marquee pauseOnHover className='[--duration:20s]'>
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className='[--duration:20s]'>
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background'></div>
                <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background'></div>
            </div>
        </div>
    )
}

export default MarqueeTestimonials