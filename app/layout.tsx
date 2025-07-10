// app/layout.tsx

import "./globals.css";               // ← ensures Tailwind is applied
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../components/AuthContext";

// Load Google fonts and expose CSS variables
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Page metadata (Next.js App Router way)
export const metadata: Metadata = {
  title: "Avyra.ai",
  description: "AI tutor MVP",
};

// Root layout: only global CSS + AuthProvider
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
