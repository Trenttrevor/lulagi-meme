"use client"

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const AuthButtons = () => {
    const [loading, setLoading] = useState(false)

  return (
    <div className="flex gap-x-20">
      <RegisterLink onClick={()=>setLoading(true)}>
        <Button size={"lg"} disabled={loading}>Sign up</Button>
      </RegisterLink>
      <LoginLink onClick={()=>setLoading(true)}>
        <Button size={"lg"} disabled={loading}>Login</Button>
      </LoginLink>
    </div>
  );
};

export default AuthButtons;
