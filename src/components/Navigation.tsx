"use client"
import { Brain } from "lucide-react";
import Link from 'next/link';
import { GoogleLoginButton } from "./GoogleLoginButton";

export function Navigation() {

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-green-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Feynman
          </span>
          <span className="text-lg font-semibold text-gray-400 ml-2">
            by Grifi
          </span>
        </Link>
        <div className="flex items-center gap-4">
          
          
          <GoogleLoginButton />
        </div>
      </div>
    </nav>
  );
}