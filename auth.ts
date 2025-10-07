import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import  prisma  from "./prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // If user is signing in, go to dashboard
      // If user is signing out, go to homepage
      if (url.includes('/api/auth/signout')) {
        return baseUrl  // Go to homepage after sign-out
      }
      
      // After successful sign-in, go to dashboard
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboard`
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.sub = user.id
      }
      return token
    },
  },

  events: {
    async signIn({ user }) {
      console.log(`✅ ${user.email} signed in`)
    },
    async signOut() {
      console.log(`🚪 User signed out`)
    }
  },

  debug: process.env.NODE_ENV === 'development',
})