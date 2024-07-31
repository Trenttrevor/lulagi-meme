"use client"

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";


const LogoutButton = () => {
  return (
    <LogoutLink className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
>
        <span className="text-2xl">Logout</span>
    </LogoutLink>
  )
}

export default LogoutButton