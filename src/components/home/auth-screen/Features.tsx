import UnderlinedText from '@/components/decorators/UnderlinedText';
import { Badge } from '@/components/ui/badge';
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface FeatureProps {
    title: string;
    description: string;
    image: string;
}
//both syntax works : ) 
const features: { title: string, description: string, image: string }[] = [
    {
        title: "Expert Cat Care Tips",
        description:
            "Discover the best practices for keeping your cat healthy and happy. From feeding tips to grooming advice.",
        image: "/gifs/gip5.webp",
    },
    {
        title: "Cat Training Techniques",
        description:
            "Enhance your cat's behavior with our detailed training tutorials. Whether it's litter box training or tricks, find expert advice.",
        image: "/gifs/gif4.webp",
    },
    {
        title: "Daily Cat Life",
        description: "Get a glimpse into how we care for our cats, maintain their environment, and enjoy fun moments with them.",
        image: "/gifs/gip6.webp",
    },
];

const featureList: string[] = [
    "Cat Health Insights",
    "Daily Tips for Cats",
    "Behind-the-Scenes with Cats",
    "Training and Behavior Tips",
    "Cat Playtime Ideas",
    "Cat Care Advice",
];


const Features = () => {
    return (
        <section className='container py-24 sm:py-32 space-y-8'>
            <h2 className='text-3xl lg:text-4xl font-bold md:text-center'>
                Many <UnderlinedText className='underline-offset-8'>OnlyCat{" "}</UnderlinedText>Features 🐈
            </h2>
            <div className='flex flex-wrap md:justify-center gap-4'>
                {featureList.map((feature) => (
                    <div key={feature}>
                        <Badge className='text-sm rounded-full' variant={"secondary"}>
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {features.map(({ title, description, image }) => (
                    <Card key={title} className='flex flex-col'>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>

                        <CardContent>{description}</CardContent>

                        <CardFooter className='mt-auto'>
                            <img
                                src={image}
                                alt='Feature Item'
                                className='rounded w-[200px] h-32 lg:w-[px]  mx-auto z-0 select-none pointer-events-none'
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </section>
    )
}

export default Features