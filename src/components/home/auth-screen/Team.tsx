import React from 'react'
import RotatedText from "@/components/decorators/RotatedText";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamProps {
    imageUrl: string;
    name: string;
    position: string;
    description: string;
}

const teamList: TeamProps[] = [
    {
        imageUrl: "https://i.pravatar.cc/150?img=35",
        name: "Sarah Thompson",
        position: "Cat Care Manager",
        description: "Sarah ensures the well-being of all our cats, overseeing their care and daily routines.",
    },
    {
        imageUrl: "https://i.pravatar.cc/150?img=60",
        name: "James Wilson",
        position: "Head Trainer",
        description: "James is an expert in cat behavior and training, helping cats with tricks and behavioral issues.",
    },
    {
        imageUrl: "https://i.pravatar.cc/150?img=36",
        name: "Dr. Emily Carter",
        position: "Veterinarian",
        description: "Dr. Carter is our dedicated veterinarian, ensuring the health and wellness of all our cats.",
    },
    {
        imageUrl: "https://i.pravatar.cc/150?img=17",
        name: "Michael Ramirez",
        position: "Cat Care Specialist",
        description: "Michael handles the daily care of our cats, from feeding to playtime and grooming.",
    },
];



const Team = () => {
    return (
        <section className='container py-24 sm:py-32'>
            <h2 className='text-2xl sm:text-3xl md:text-5xl text-center tracking-tighter font-bold'>
                Our <RotatedText>Dedicated</RotatedText> Crew
            </h2>
            <p className='mt-4 mb-10 text-md md:text-xl text-muted-foreground text-center'>
                Meet the team that makes our farm a special place for horses and riders alike.
            </p>
            <div className=' grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10'>
                {teamList.map(({ description, imageUrl, name, position }) => (
                    <Card className='bg-muted/50 relative mt-7 flex flex-col justify-center items-center'>
                        <CardHeader className='my-8 flex justify-center items-center pb-2'>
                            <img
                                src={imageUrl}
                                alt='Team member'
                                className='absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover'
                            />
                            <CardTitle className='text-center'>{name}</CardTitle>
                            <CardDescription className='text-secondary-foreground'>{position}</CardDescription>
                        </CardHeader>

                        <CardContent className='text-center pb-4 px-2'>
                            <p>{description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default Team