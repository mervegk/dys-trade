import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      accessScope: string
      activeCompany: {
        id: number
        name: string
        logo?: string
        plan?: string
      }
      permissions: string[]
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    accessScope: string
    activeCompany: any
    permissions: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    accessScope: string
    activeCompany: any
    permissions: string[]
  }
}