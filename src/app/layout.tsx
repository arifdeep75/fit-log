import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Tracker",
  description:
    "Track your workouts, build your plan, and stay consistent with FitLog.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        {children}

        <Footer />

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0b0d10",
              color: "#ffffff",
              border: "1px solid #252a33",
            },
          }}
        />
      </body>
    </html>
  );
}