import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import NavBar from "./NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "issues tracker App",
  description: "issues tracker to keep your Productivity ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seesion = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider
          session={seesion}
          refetchInterval={0} // Disable automatic refetch for better caching
          refetchOnWindowFocus={false}
        >
          <Theme accentColor="blue">
            <NavBar />
            <main className="p-8">{children}</main>
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
