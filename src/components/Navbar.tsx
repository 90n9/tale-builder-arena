"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Scroll } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Scroll className="h-6 w-6 text-accent group-hover:text-secondary transition-colors" />
          <span className="text-xl font-bold text-foreground">
            TaleBuilder Arena
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
              isActive("/") ? "text-accent" : "text-muted-foreground"
            }`}
          >
            หน้าหลัก
          </Link>
          <Link
            href="/achievements"
            className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
              isActive("/achievements") ? "text-accent" : "text-muted-foreground"
            }`}
          >
            ความสำเร็จ
          </Link>
          
          <Button asChild className="bg-gradient-primary hover:shadow-glow-orange transition-all text-sm font-semibold uppercase text-primary-foreground border border-secondary/50">
            <Link href="/game">
              เริ่มการผจญภัย
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
