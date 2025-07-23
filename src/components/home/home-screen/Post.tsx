"use client";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Prisma } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart, ImageIcon, LockKeyhole, MessageCircle, Trash } from 'lucide-react'
import { CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { commentOnPostAction, deletePostAction, likePostAction } from './actions';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';
import Comment from './Comment';


//because we cannot populate post.comments. .... , so we create custom type 
type PostWithComments = Prisma.PostGetPayload<{
    include: {
        comments: {
            include: {
                user: true;
            };
        };
        likesList: true;
    };
}>;
const Post = ({ post, isSubscribed, admin }: { post: PostWithComments, isSubscribed: boolean, admin: any }) => {

    const { toast } = useToast();
    const queryClient = useQueryClient();


    const [isLiked, setIsLiked] = useState(true)
    const [comment, setComment] = useState("");
    const { user } = useKindeBrowserClient();

    const { mutate: deletePost } = useMutation({
        mutationKey: ["deletePost"],
        mutationFn: async () => await deletePostAction(post.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast({
                title: "Success",
                description: "Post deleted successfully",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    })

    const { mutate: likePost } = useMutation({
        mutationKey: ["likePost"],
        mutationFn: async () => await likePostAction(post.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast({
                title: "Success",
                description: `${isLiked ? "Unliked" : "Liked"} post successfully`
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    })

    const handleCommentSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!comment) return;
		commentPost();
	};



    useEffect(() => {
        if (post.likesList && user?.id) setIsLiked(post.likesList.length > 0)
    }, [post.likesList, user?.id])


    const { mutate: commentPost, isPending: isCommenting } = useMutation({
		mutationKey: ["commentPost"],
		mutationFn: async () => await commentOnPostAction(post.id, comment),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			setComment("");
			toast({
				title: "Success",
				description: "Comment added successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: error.message || "Something went wrong. Please try again.",
				variant: "destructive",
			});
		},
	});

    return (
        <div className='flex flex-col gap-3 p-3 border-t'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage className='object-cover' src={admin.image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='font-semibold text-sm  md:text-md'>
                        {admin.name}
                    </span>
                </div>
                <div className='flex items-center gap-2'>

                    <p className='text-zinc-500 text-xs md:text-sm tracking-tighter'>
                        17.06.2024
                    </p>
                    {admin.id === user?.id && (
                        <Trash
                            className='w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer'
                            onClick={() => deletePost()}
                        />
                    )}
                </div>
            </div>

            <p className='text-sm md:text-md'>{post.text}</p>

            {
                (post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "image"
                && (
                    <div className='relative w-full pb-[56.25%] rounded-lg overflow-hidden'>
                        <Image
                            src={post.mediaUrl}
                            alt='post-image'
                            fill
                            className='rounded-lg object-cover'
                        />
                    </div>
                )
            }


            {/* for rendering video */}
            {(post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "video" && (
                <div className='w-full mx-auto'>
                    <CldVideoPlayer muted={true} width='960' height={540}  className='rounded-md' src={post.mediaUrl} />
                </div>
            )}


            {
                !isSubscribed && !post.isPublic && (
                    <div className='rounded-md flex-col flex items-center h-96 bg-slate-800 justify-center'>
                        <LockKeyhole className='w-16 h-16 z-0 bottom-64 absolute' />
                        <div />
                        <div className='flex flex-col gap-2 z-10 border p-2 border-gray-500
                        w-full rounded-md'>
                            <div className='flex gap-1 items-center'>
                                <ImageIcon className='w-4 h-4' />
                                <span className='text-xs'>1</span>
                            </div>

                            <Link className={buttonVariants({ className: "rounded-full w-full font-bold text-white," })} href={'/pricing'}
                            > <span className='text-primary-foreground'>Pricing</span>  </Link>
                        </div>
                    </div>
                )
            }

            <div className='flex gap-4'>
                <div className='flex gap-1 items-center'>
                    <Heart className={cn("w-5 h-5 cursor-pointer", { "text-red-500": isLiked, "fill-red-500": isLiked })}
                        onClick={() => {
                            if (!isSubscribed) {
                                return;
                            }
                            likePost()
                            
                        }} />
                    <span className='text-xs tracking-tighter'>{post.likes}</span>
                </div> 
            <div className='flex gap-1 items-center'>
					<Dialog>
						<DialogTrigger>
							<MessageCircle className='w-5 h-5 cursor-pointer' />
						</DialogTrigger>
						{isSubscribed && (
							<DialogContent className='sm:max-w-[425px]'>
								<DialogHeader>
									<DialogTitle>Comments</DialogTitle>
								</DialogHeader>
								<ScrollArea className='h-[400px] w-[350px] rounded-md p-4'>
									{post.comments.map((comment) => (
										<Comment key={comment.id} comment={comment} />
									))}

									{post.comments.length === 0 && (
										<div className='flex flex-col items-center justify-center h-full'>
											<p className='text-zinc-400'>No comments yet</p>
										</div>
									)}
								</ScrollArea>

								<form onSubmit={handleCommentSubmission}>
									<Input
										placeholder='Add a comment'
										onChange={(e) => setComment(e.target.value)}
										value={comment}
									/>

									<DialogFooter>
										<Button type='submit' className='mt-4' disabled={isCommenting}>
											{isCommenting ? "Commenting..." : "Comment"}
										</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						)}
					</Dialog>
					<div className='flex gap-1 items-center'>
						<span className='text-xs text-zinc-400 tracking-tighter'>
							{post.comments.length > 0 ? post.comments.length : 0}
						</span>
					</div>
				</div>

            </div>
        </div>
    )
}

export default Post
