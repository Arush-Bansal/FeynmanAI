import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { RouteProtection } from "@/features/auth/components/RouteProtection";
import { SessionWrapper } from "@/features/auth/lib/SessionWrapper";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { DatabaseInitializer } from "@/features/db/components/DatabaseInitializer";

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
      <head>
        <link rel="icon" type="image/svg+xml" href="/brain-favicon.svg" />
      </head>
      <body>
        <ReactQueryProvider>
          {/* Provides React Query context to all components within the application */}
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black opacity-90"></div>
            <SessionWrapper>
              <DatabaseInitializer />
              <div className="relative z-10">
                <Navigation />
                <RouteProtection>{children}</RouteProtection>
              </div>
            </SessionWrapper>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}