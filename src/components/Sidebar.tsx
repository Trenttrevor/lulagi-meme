import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./ModeToggle";

const Sidebar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex lg:w-1/5 flex-col gap-3 px-2 py-10 border-r sticky left-0 top-0 h-screen">
      <div
        className="flex w-20 h-20 lg:w-full items-center gap-2  font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
      >
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="hidden lg:block ml-5 text-2xl">{user?.given_name}</span>
      </div>

      <Link href='/mainpage' className="p-2 rounded-lg hover:bg-primary-foreground">
        <span>HOME</span>
      </Link>

      <Link href='/secret-dashboard' className="p-2 rounded-lg hover:bg-primary-foreground">
        <span>POST MEME</span>
      </Link>

      <ModeToggle />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
