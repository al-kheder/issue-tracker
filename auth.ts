import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!, 
      clientSecret: process.env.AUTH_GOOGLE_SECRET!, 
    })
  ],

  session: {
    strategy: "jwt" 
  },

  callbacks: {
    authorized({ auth, request }) {
      const loggedIn = !!auth?.user
      const path = request.nextUrl.pathname

      const wantsDashboard =
        path.startsWith("/dashboard") ||
        path.startsWith("/issues") ||
        path.startsWith("/profile") ||
        path.startsWith("/analytics")

      if (wantsDashboard && !loggedIn) {
        return Response.redirect(new URL("/", request.nextUrl))
      }

      if (path === "/" && loggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl))
      }

      return true
    },

    // JWT callback for JWT strategy
    async jwt({ token, account, user }) {
      if (account && user) {
        token.sub = user.id
      }
      return token
    },

    // Session callback for JWT strategy
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },

  debug: process.env.NODE_ENV === "development",
})