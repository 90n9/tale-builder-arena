"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Menu, Scroll } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PrimaryActionButton } from "@/components/ActionButtons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const labels = {
    donate: "สนับสนุน",
    start: "เริ่มการผจญภัย",
    menu: "เมนู",
  };

  const navLinks: Array<{ href: Route; label: string; icon?: JSX.Element }> = [
    { href: "/donate", label: labels.donate, icon: <Heart className="h-4 w-4 text-destructive fill-destructive" /> },
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Scroll className="h-6 w-6 text-accent group-hover:text-secondary transition-colors" />
          <span className="text-xl font-bold text-foreground">
            TaleBuilder Arena
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${isActive(link.href) ? "text-accent" : "text-muted-foreground"
                }`}
              data-ga-event="nav-link-click"
              data-ga-category="navigation"
              data-ga-label={link.href}
            >
              <span>{link.label}</span>
              {link.icon ? <span className="text-accent">{link.icon}</span> : null}
            </Link>
          ))}
          <PrimaryActionButton asChild className="text-sm font-semibold uppercase px-4">
            <Link
              href="/game"
              data-ga-event="nav-link-click"
              data-ga-category="navigation"
              data-ga-label="/game"
            >
              {labels.start}
            </Link>
          </PrimaryActionButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <PrimaryActionButton
            asChild
            size="sm"
            className="text-xs font-semibold uppercase px-3"
          >
            <Link
              href="/game"
              data-ga-event="nav-link-click"
              data-ga-category="navigation"
              data-ga-label="/game"
            >
              {labels.start}
            </Link>
          </PrimaryActionButton>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border border-border/60 text-foreground hover:border-accent hover:text-accent"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{labels.menu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border">
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={handleCloseMenu}
                    data-ga-event="nav-link-click"
                    data-ga-category="navigation"
                    data-ga-label="/"
                  >
                    <Scroll className="h-5 w-5 text-accent" />
                    <span className="text-lg font-bold text-foreground">TaleBuilder Arena</span>
                  </Link>
                </div>
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold uppercase tracking-wide transition-colors hover:text-accent hover:bg-accent/5 ${isActive(link.href) ? "text-accent" : "text-muted-foreground"
                          }`}
                        onClick={handleCloseMenu}
                        data-ga-event="nav-link-click"
                        data-ga-category="navigation"
                        data-ga-label={link.href}
                      >
                        <span>{link.label}</span>
                        {link.icon ? <span className="text-accent">{link.icon}</span> : null}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <SheetClose asChild>
                  <PrimaryActionButton
                    asChild
                    className="w-full text-sm font-semibold uppercase"
                    onClick={handleCloseMenu}
                  >
                    <Link
                      href="/game"
                      data-ga-event="nav-link-click"
                      data-ga-category="navigation"
                      data-ga-label="/game"
                    >
                      {labels.start}
                    </Link>
                  </PrimaryActionButton>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
