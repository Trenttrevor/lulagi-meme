"use client"

import React from "react";
import AuthButtons from "./AuthButtons";
import { Team } from "@/components/Team";
import ShimmerButton from "@/components/magicui/shimmer-button";
import BlurIn from "@/components/magicui/blur-in";
import BoxReveal from "./magicui/box-reveal";


const Hero = () => {
  const scrollSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="h-screen flex flex-col justify-center gap-5 items-center">
      <BlurIn
      word="LULAGI"
      className="text-4xl font-bold text-black dark:text-white"
    />
    <BoxReveal boxColor={"gray"} duration={0.5}>
      <div className="max-w-3xl text-center mt-5">
        <p className="font-semibold text-xl">
        About this website:<br />
        You can explore by your own. Just hit the sign up or login button.<br />
        Enjoy your adventure and experience the best MEMES !
        </p>
      </div>
      </BoxReveal>

      <BoxReveal boxColor={"gray"} duration={0.5}>
        <div className="flex">
          <AuthButtons />
        </div>
        </BoxReveal>

        
      
        <div className="z-10 flex min-h-[16rem] items-center justify-center">
          <ShimmerButton
            onClick={()=>scrollSection('team')}
            className="shadow-6xl p-5"
            shimmerDuration="2s"
            shimmerSize="3px"
          >
            <span className="whitespace-pre-wrap text-center text-md font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Meet The Amazing Creator Team!
            </span>
          </ShimmerButton>
        </div>

      </div>

      <div id="team" className="flex flex-col max-w-5xl mx-auto items-center justify-center h-screen mt-40 mb-20 ">
        <h2 className="text-3xl mb-2">Our Team</h2>
        <p className="text-center text-lg mb-5">Struktur Team kami terinspirasi langsung dari pengalaman sang Tech Leader yang semasa di bangku kuliah mengerjakan tugas kelompok bersama teman-teman sekelas yg datang hanya saat presentasi dan bertugas menjadi operator pengganti slide Powerpoint</p>
        <Team />
      </div>
      
    </div>
    
  );
};

export default Hero;
