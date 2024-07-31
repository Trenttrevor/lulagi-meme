"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { Button } from "../ui/button";
import Image from "next/image";
import 'next-cloudinary/dist/cld-video-player.css';
import { useMutation } from "@tanstack/react-query";
import { createPostAction } from "@/app/secret-dashboard/actions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const ContentTab = () => {
  const [text, setText] = useState("");
  const [mediaType, setMediaType] = useState<"video" | "image">("image");
  const [mediaUrl, setMediaUrl] = useState<string>("");

  const {toast} = useToast()
  const router = useRouter()

  const {mutate:createPost, isPending} = useMutation({
    mutationKey:["createPost"],
    mutationFn: async ()=> createPostAction({text, mediaType, mediaUrl}),
    onSuccess: ()=>{
      toast({
        title: "Post Created!",
        description:"Your post has been successfully created"
      })
      setText("")
      setMediaType("video")
      setMediaUrl("")
      router.push('/mainpage')
    },
    onError:(error)=>{
      toast({
        title:"Error",
        description:error.message,
        variant:"destructive"
      })
    }
  })

  const handlePost =(e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    createPost()
  }

  return (
    <>
      <p className="text-3xl my-5 font-bold text-center uppercase">
        Share Meme!
      </p>

      <form onSubmit={handlePost}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">New Post</CardTitle>
            <CardDescription>
              Share your funniest meme from your arsenal!
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Caption</Label>
              <Textarea
                id="content"
                placeholder="Share your funniest thought! Nothing sounds stupid but creativity!..."
                required
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <Label>Media Type</Label>
            <RadioGroup
              defaultValue="image"
              value={mediaType}
              onValueChange={(value: "image" | "video") => setMediaType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image">Image</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
            </RadioGroup>

            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              onSuccess={(result, { widget }) => {
                setMediaUrl(
                  (result.info as CloudinaryUploadWidgetInfo).secure_url)
                  widget.close()
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    onClick={() => open()}
                    variant={"outline"}
                    type="button"
                  >
                    Upload Meme!
                  </Button>
                );
              }}
            </CldUploadWidget>

            {mediaUrl && mediaType === "image" && (
                <div className="flex justify-center relative w-full h-96">
                    <Image
                        src={mediaUrl}
                        alt="post"
                        className="object-contain rounded-md"
                        fill
                    />
                </div>
            )}

            {mediaUrl && mediaType==="video" && (
                <div className="w-full mx-auto">
                    <CldVideoPlayer src={mediaUrl} width={960} height={540} className="rounded-md"/>
                </div>
            )}
          </CardContent>

          <CardFooter>
            <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? "Creating Post...":"Create Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default ContentTab;
