"use client"
import { Brain } from "lucide-react";
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <Brain className="h-8 w-8 text-green-400 group-hover:scale-105 transition-transform" />
              <div className="text-xl font-bold flex items-center">
                <span className="text-green-400">Feynman</span>
                <span className="text-white text-sm ml-2">by Grifi</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <Button variant="outline" disabled className="border-gray-600 text-white">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading...
              </Button>
            ) : session ? (
              <Link href="/profile">
                <img
                  src={session.user?.image || "/default-avatar.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onError={(e) => { e.currentTarget.src = "/default-avatar.svg"; }}
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}