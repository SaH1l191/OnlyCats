"use client"

import UnderlinedText from '@/components/decorators/UnderlinedText'
import React, { useState } from 'react'
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from 'next/image';

import { TriangleAlert } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import { createPostAction } from '../actions';
import { useToast } from '@/hooks/use-toast';

const ContentTab = () => {



  const [text, setText] = useState("");
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>("");

  const { toast } = useToast()


  const { mutate: createPost, isPending } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async () => createPostAction({ text, isPublic, mediaUrl, mediaType }),
    onSuccess: () => {
      toast({
        title: "Post Created",
        description: 'Post created Successfully!'
      })
      setText("")
      setMediaType("video")
      setMediaUrl("")
      setIsPublic(false)

    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
      setText("")
      setMediaType("video")
      setMediaUrl("")
      setIsPublic(false)
    }
  })

  return (
    <>
      <p className='text-3xl my-5 font-bold text-center uppercase'>
        <UnderlinedText className='decoration-wavy'>Share</UnderlinedText> Post
      </p>
      <form onSubmit={(e) => {
        e.preventDefault()
        createPost()

      }}>
        <Card className='w-full max-w-md mx-auto'>
          <CardHeader>
            <CardTitle className='text-2xl'>New Post</CardTitle>
            <CardDescription>
              Share your exclusive content with your audience. Select only one video/image at a time.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='content'>Content</Label>
              <Textarea
                id='content'
                placeholder="Share today's exclusive"
                required
              />
            </div>

            <Label>Media Type</Label>

            <RadioGroup
              defaultValue='video'
              value={mediaType}
              onValueChange={(value: "image" | "video") => setMediaType(value)}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='video' id='video' />
                <Label htmlFor='video'>Video</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='image' id='image' />
                <Label htmlFor='image'>Image</Label>
              </div>
            </RadioGroup>


            {/* from next clooudinary dox */}
            <CldUploadWidget
              signatureEndpoint={"/api/sign-image"}
              onSuccess={(result, { widget }) => {
                setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <Button onClick={() => open()} variant={"outline"} type='button'>
                    Upload Media
                  </Button>
                );
              }}
            </CldUploadWidget>

            {mediaUrl && mediaType === "image" && (
              <div className='flex justify-center relative w-full h-96'>
                <Image fill src={mediaUrl} alt='Uploaded Image' className='object-contain rounded-md' />
              </div>
            )}

            {mediaUrl && mediaType === "video" && (
              <div className='w-full mx-auto'>
                <CldVideoPlayer width={960} height={540} className='rounded-md' src={mediaUrl} />
              </div>
            )}

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='public'
                checked={isPublic}
                onCheckedChange={(e) => setIsPublic(e as boolean)}
              />

              <Label
                htmlFor='public'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Mark as public
              </Label>
            </div>

            <Alert variant='default' className='text-yellow-400'>
              <TriangleAlert className='h-4 w-4 !text-yellow-400' />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Public posts will be visible to all users.</AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter>
            <Button className='w-full' type='submit' disabled={isPending}>
              {isPending ? "Creating Post..." : "Create Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}

export default ContentTab