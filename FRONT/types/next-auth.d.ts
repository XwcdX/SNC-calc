import NextAuth, { DefaultSession, User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
  }
}