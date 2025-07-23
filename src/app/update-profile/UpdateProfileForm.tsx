"use client";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Label } from '@radix-ui/react-label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { useMutation, useQuery } from '@tanstack/react-query';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'
import { getUserProfileAction, updateUserProfileAction } from './actions';

type Props = {}

const UpdateProfileForm = (props: Props) => {

    const [mediaUrl, setMediaUrl] = useState<string>("");
    const [name, setName] = useState<string>(""); 

    const { toast } = useToast();

    const { data: userProfile } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => await getUserProfileAction(),
    });

    const { mutate: updateProfile, isPending } = useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: updateUserProfileAction,
        onSuccess: () => {
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error updating profile",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name)
        }
    }, [userProfile])

    const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateProfile({ name, image: mediaUrl })
    }

    return (
        <div className='px-2 md:px-10 my-20'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Update Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-center'>
                        <Avatar className='w-20 h-20'>
                            <AvatarImage className='object-cover' src={mediaUrl || userProfile?.image || "/user-placeholder.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <form onSubmit={(e) => handleUpdateProfile(e)} >
                        <Label>Name</Label>
                        <Input
                            className='my-2'
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <Label>Email</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='w-full' type='button'>
                                    <Input disabled={isPending}
                                        value={userProfile?.email} className='my-2 text-gray-400' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='text-sm'>For security reasons, your email cannot be changed. 😥</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <CldUploadWidget
                            signatureEndpoint={"/api/sign-image"}
                            onSuccess={(result, { widget }) => {
                                setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
                                widget.close();
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button
                                        onClick={() => open()}
                                        variant={"outline"}
                                        type='button'
                                        className='w-full mt-2 mb-4'>
                                        Change Image
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>

                        <Button className='w-full' type='submit' disabled={isPending}>
                            {isPending ? "Updating..." : "Update"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
export default UpdateProfileForm
