import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ezPrep AI - Master New Skills With ProjectQ",
  description: "AI-powered learning platform for effortless skill acquisition and enjoyable knowledge growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Solway&family=Alata&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}