import { cn } from "@/lib/utils";
import RotatedText from "@/components/decorators/RotatedText";





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


const Testimonials = () => {
    return (
        <div className='mt-12'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl text-center tracking-tighter font-bold'>
                Why <RotatedText>choose</RotatedText> Us
            </h1>

            <p className='mt-4 mb-10 text-md md:text-xl text-muted-foreground text-center'>
                Hear from our happy customers and see why they love our service.
            </p>

            
        </div>
    );
};

export default Testimonials;