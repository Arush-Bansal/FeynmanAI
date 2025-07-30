"use client"
import { Brain } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"

export function Navigation() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

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
              <div className="flex items-center gap-4">
                <Link href="/history">
                  <Button 
                    variant={pathname === '/history' ? 'default' : 'ghost'}
                    className={pathname === '/history' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'text-white hover:bg-gray-800 hover:text-white'
                    }
                  >
                    History
                  </Button>
                </Link>
                <Link href="/profile">
                  <Image
                    src={session.user?.image || "/default-avatar.svg"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/default-avatar.svg"; }}
                  />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}