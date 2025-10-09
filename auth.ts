import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    // Runs in middleware + server components (used by export { auth as middleware })
    // Decide gating + redirects here.
    authorized({ auth, request }) {
      const loggedIn = !!auth?.user
      const path = request.nextUrl.pathname

      const wantsDashboard =
        path.startsWith("/dashboard") ||
        path.startsWith("/issues") ||
        path.startsWith("/profile") ||
        path.startsWith("/analytics")

      // Not logged in but requesting protected area -> send to home
      if (wantsDashboard && !loggedIn) {
        return Response.redirect(new URL("/", request.nextUrl))
      }

      // Logged in but hitting public root -> send to dashboard
      if (path === "/" && loggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl))
      }

      return true
    },

    async jwt({ token, account, user }) {
      // Persist user id (sub already set by provider, but ensure)
      if (account && user) {
        token.sub = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        // Attach id so client components can read session.user.id
        ;(session.user as any).id = token.sub
      }
      return session
    },
  },


  debug: process.env.NODE_ENV === "development",
})