import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();

// this stuff provide us endpoint
// like api/auth/ login, sign up, etc