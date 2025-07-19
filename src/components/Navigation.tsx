"use client"
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from 'next/link';
import { GoogleLoginButton } from "./GoogleLoginButton";
import { useSession } from "next-auth/react";



export function Navigation({}: NavigationProps) {
  const { data: session } = useSession();

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-violet-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Feynman
          </span>
        </Link>
        <div className="flex items-center gap-4">
          
          
          <GoogleLoginButton />
        </div>
      </div>
    </nav>
  );
}
