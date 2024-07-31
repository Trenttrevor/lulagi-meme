"use client";

import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Trash } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post, Prisma } from "@prisma/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { commentOnPostAction, deletePostAction, likePostAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Comment from "@/components/Comment";

type PostFullPackage = Prisma.PostGetPayload<{
  include: {
    user: true;
    comments: {
      include: {
        user: true;
      };
    };
    likeList: true;
  };
}>;

const BerandaPost = ({ post }: { post: PostFullPackage }) => {
  const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState("")

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  const clientQuery = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => deletePostAction(post.id),
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "success",
        description: "Deleted Post!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
  });

  const { mutate: likePost } = useMutation({
    mutationKey: ["likePost"],
    mutationFn: async () => {
      post.likes += isLiked ? -1 : 1;
      setIsLiked(!isLiked);
      likePostAction(post.id);
    },
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast({
        title: "error!",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const{mutate:commentPost, isPending } = useMutation({
    mutationKey:["commentPost"],
    mutationFn: async () => await commentOnPostAction(post.id, comment),
    onSuccess:()=>{
        clientQuery.invalidateQueries({queryKey:["posts"]})
        setComment("")
        toast({
            title:'success',
            description:'Comment added successfully'
        })
    },
    onError:(error)=>{
        toast({
            title:"error",
            description:error.message,
            variant:"destructive"
        })
    }
  })

  const handleSubmitComment = async (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    if(!comment) return
    commentPost()
  }

  useEffect(() => {
    if (post.likeList && user?.id) setIsLiked(post.likeList.length > 0);
  }, [post.likeList, user?.id]);

  return (
    <div className="flex flex-col gap-3 p-3 border-t ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.user.image!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm md:text-md">
            {post.user.name}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-zinc-400 text-xs">17.06.2024</p>
          {post.userId === user?.id && (
            <Trash
              onClick={() => deletePost()}
              className="w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer"
            />
          )}
        </div>
      </div>

      <p className="text-sm">{post.text}</p>
      {post.mediaUrl && post.mediaType === "image" && (
        <div className="relative w-full h-[700px] rounded-lg overflow-hidden">
          <Image
            src={post.mediaUrl}
            alt="post"
            className="rounded-lg object-contain"
            fill
          />
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <Heart
            onClick={() => likePost()}
            className={`w-5 h-5 cursor-pointer ${
              isLiked ? "text-red-800 fill-red-800" : ""
            }`}
          />
          <span className="text-sm">{post.likes}</span>
        </div>

        <div className="flex gap-1 items-center">
          <Dialog>
            <DialogTrigger>
              <MessageCircle className="w-5 h-5 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Comments
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] w-[350px] rounded-md p-4">
                    {post.comments.map((comment)=>(
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                    {post.comments.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-zinc-400">No comments yet</p>
                        </div>
                    )}
                </ScrollArea>
                <form onSubmit={handleSubmitComment}>
                    <Input
                     placeholder="Add a comment"
                    onChange={(e)=>setComment(e.target.value)}
                    value={comment}
                    />
                     <DialogFooter>
                        <Button type="submit" className="mt-4" disabled={isPending}>
                            {isPending?'commenting':'Comment'}
                        </Button>
                     </DialogFooter>
                </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-sm">
            {post.comments.length > 0 ? post.comments.length : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BerandaPost;
