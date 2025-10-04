"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@radix-ui/themes";
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-8 h-8 rounded-full"
          />
        )}
        <div className="hidden md:block">
          <p className="text-sm font-medium">{session.user.name}</p>
          <p className="text-xs text-gray-500">{session.user.email}</p>
        </div>
        <Button variant="soft" color="red" size="1" onClick={() => signOut()}>
          <FaSignOutAlt />
          <span className="hidden sm:inline ml-1">Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => signIn("google")} // ✅ Direct Google sign-in
      variant="solid"
      className="flex items-center gap-2"
    >
      <FaGoogle />
      Sign in with Google
    </Button>
  );
}
