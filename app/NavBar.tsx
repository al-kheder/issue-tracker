"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
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
    <nav
      aria-label="Main navigation"
      className="flex space-x-6 border-b mb-5 px-5 h-14 items-center"
    >
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          const isActive = currentPath === link.href;

          return (
            <Link
              key={link.href}
              aria-current={isActive ? "page" : undefined}
              aria-describedby={
                isActive ? `${link.href}-description` : undefined
              }
              className={getNavLinkClasses(currentPath === link.href)}
              href={link.href}
            >
              {link.label}
              {isActive && <span className="sr-only"> (current page)</span>}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
