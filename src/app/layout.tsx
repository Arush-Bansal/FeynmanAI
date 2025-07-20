import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { RouteProtection } from "@/features/route-protection/RouteProtection";
import { SessionWrapper } from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feynman - Master Any Concept by Explaining Simply",
  description: "Use the Feynman Technique to deepen your understanding. Explain concepts out loud, get instant feedback, and identify gaps in your knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-950 relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
        }}></div>
        <SessionWrapper>
          <div className="relative z-10">
            <Navigation />
            <div className="container mx-auto px-4 py-8 max-w-4xl pt-20">
              <RouteProtection>{children}</RouteProtection>
            </div>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}