import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Bestbrain - Student Performance Tracker",
  description: "Track your students' performance with ease.",
};

const inter = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
});
const sora = localFont({
  src: "./fonts/Sora.ttf",
  variable: "--font-sora",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.variable} ${sora.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
