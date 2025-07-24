"use client"
import { Brain } from "lucide-react";
import Link from 'next/link';
// import feynmanLogo from "@/assets/feynman-logo.png"; // Uncomment if you have a logo image

export function Navigation() {
  return (
    <header className="border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Uncomment below and provide a valid logo if you have one */}
              {/* <img src={feynmanLogo} alt="feynman AI" className="h-8 w-8" /> */}
              <Brain className="h-8 w-8 text-green-400 group-hover:scale-105 transition-transform" />
              <div className="text-xl font-bold flex items-center">
                <span className="text-green-400">Feynman</span>
                <span className="text-white text-sm ml-2">by Grifi</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* <GoogleLoginButton /> Removed as per request */}
          </div>
        </div>
      </div>
    </header>
  );
}