import NextAuth from "next-auth"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import fs from "fs"
import path from "path"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "DYS Dashboard",
      credentials: {
        email: { label: "E-posta", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const dataDir = path.join(process.cwd(), "public", "data")

          const { users } = JSON.parse(
            fs.readFileSync(path.join(dataDir, "users.json"), "utf-8")
          );
          const user = users.find((u: any) => u.email === credentials.email)

          if (!user) return null;

          // if (user.password !== credentials.password) return null;

          const { companies } = JSON.parse(
            fs.readFileSync(path.join(dataDir, "companies.json"), "utf-8")
          );
          const { permissions } = JSON.parse(
            fs.readFileSync(path.join(dataDir, "permissions.json"), "utf-8")
          );

          const activeCompany = companies.find((c: any) => c.id === user.activeCompanyId)
          const userPermissions = permissions[user.role] || [];

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            accessScope: user.accessScope,
            activeCompany,
            permissions: userPermissions
          };
        } catch (error) {
          console.error("Yetkilendirme Hatası:", error)
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.accessScope = user.accessScope;
        token.activeCompany = user.activeCompany;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.accessScope = token.accessScope;
        session.user.activeCompany = token.activeCompany;
        session.user.permissions = token.permissions;
      }
      return session;
    }
  },
  pages: {
    signIn: "/giris-yap",
  },
  session: {
    strategy: "jwt"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };