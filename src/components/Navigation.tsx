"use client"
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from 'next/link';

interface NavigationProps {
  currentPage?: string;
}

export function Navigation({ currentPage }: NavigationProps) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "Dashboard" },
  ];

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
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button 
                variant="ghost" 
                className={`${
                  currentPage === item.href 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
          <Link href="/practice">
            <Button className="bg-violet-600 hover:bg-violet-700">
              Start Practice
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
} 