"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import { FaBug } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { Button, Avatar, DropdownMenu } from "@radix-ui/themes";

const NavBar = memo(() => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];

  const getNavLinkClasses = (isActive: boolean) => {
    const baseClasses = "px-3 py-2 rounded-md transition-colors";
    const activeClasses = "bg-blue-100 text-blue-700 font-medium";
    const inactiveClasses =
      "text-zinc-500 hover:text-zinc-800 hover:bg-gray-100";
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="flex items-center justify-between space-x-6 border-b mb-5 px-5 h-14">
      {/* Left side - Logo and Navigation */}
      <div className="flex items-center space-x-6">
        <Link
          href={session ? "/dashboard" : "/"}
          className="text-blue-600 text-xl"
        >
          <FaBug />
        </Link>

        {/* Show navigation links only when signed in */}
        {session && (
          <ul className="flex space-x-6">
            {links.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <li key={link.href}>
                  <Link
                    className={getNavLinkClasses(isActive)}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Right side - Authentication */}
      <div className="flex items-center">
        {status === "loading" ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        ) : session ? (
          // Signed in - Show user dropdown with sign-out
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar
                  src={session.user?.image || undefined}
                  fallback={session.user?.name?.[0] || "U"}
                  size="2"
                  radius="full"
                />
                <span className="hidden md:block text-sm">
                  {session.user?.name}
                </span>
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content align="end">
              <DropdownMenu.Label>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </DropdownMenu.Label>

              <DropdownMenu.Separator />
              {/* 
              <DropdownMenu.Item asChild>
                <Link href="/profile">Profile Settings</Link>
              </DropdownMenu.Item>}
            */}
              <DropdownMenu.Separator />

              <DropdownMenu.Item
                color="red"
                onClick={() => signOut({ callbackUrl: "/" })} // 🚪 Sign out to homepage
              >
                Sign Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          // Not signed in - Show sign-in button
          <Button asChild>
            <Link href="/api/auth/signin">Sign In with Google</Link>
          </Button>
        )}
      </div>
    </nav>
  );
});

NavBar.displayName = "NavBar";
export default NavBar;
