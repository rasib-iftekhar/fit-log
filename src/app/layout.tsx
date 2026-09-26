import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/feedback/ToastProvider";
import WorkoutContextProvider from "@/context/WorkoutContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'FitLog — Workout Library',
    template: '%s — FitLog',
  },
  description: 'Track your daily workouts and build custom plans.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="min-h-screen flex flex-col bg-[#1E1E1E]">
        <WorkoutContextProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastProvider />
        </WorkoutContextProvider>
      </body>
    </html>
  );
}
