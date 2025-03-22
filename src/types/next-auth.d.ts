import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    nickname: string;
    permisos: string[];
    token: string;
  }

  interface Session {
    user: User;
  }
}
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nickname: string;
    permisos: string[];
    token: string;
  }
}
