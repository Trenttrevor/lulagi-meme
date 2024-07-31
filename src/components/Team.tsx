import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { BorderBeam } from "./magicui/border-beam"

export function Team() {
  return (
    <Carousel>
      <CarouselContent className="rounded-lg">

       <CarouselItem className="h-[400px] w-[200px] rounded-md ">
        <div className="flex h-full w-full items-center">
          <div className="flex h-full items-center justify-center">
          <Image src='/citra.jpg' alt="saya" width={300} height={100} className="p-2 rounded-2xl object-contain" />
          </div>

          <div className="max-w-full flex flex-col ml-4">
            <h2 className="text-2xl">Saya Sendiri</h2>
            <h1 className="text-muted-foreground text-3xl">Satia Krista</h1>
          </div>
        </div>
        </CarouselItem>

        <CarouselItem className="h-[400px] w-[200px] rounded-md ">
        <div className="flex h-full w-full items-center">
          <div className="flex h-full items-center justify-center">
          <Image src='/citra.jpg' alt="saya" width={300} height={100} className="p-2 rounded-2xl object-contain" />
          </div>

          <div className="flex flex-col ml-4 gap-y-2">
            <h2 className="text-2xl">Saya Lagi</h2>
            <h1 className="text-muted-foreground text-3xl">Satia Krista</h1>
          </div>
        </div>
        </CarouselItem>

        <CarouselItem className="h-[400px] w-[200px] rounded-md ">
        <div className="flex h-full w-full items-center">
          <div className="flex h-full items-center justify-center">
          <Image src='/citra.jpg' alt="saya" width={300} height={100} className="p-2 rounded-2xl object-contain" />
          </div>

          <div className="flex flex-col ml-4 gap-y-2">
            <h2 className="text-2xl">Lagi Lagi Saya</h2>
            <h1 className="text-muted-foreground text-3xl">Satia Krista</h1>
          </div>
        </div>
        </CarouselItem>
        
        
      </CarouselContent>
      <BorderBeam size={200} duration={12} delay={9} />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
