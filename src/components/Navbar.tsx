'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart, Menu, Scroll } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PrimaryActionButton } from '@/components/ActionButtons';

import { UserMenu } from '@/components/UserMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const labels = {
    donate: 'สนับสนุน',
    start: 'เริ่มการผจญภัย',
    menu: 'เมนู',
  };

  const navLinks: Array<{ href: Route; label: string; icon?: JSX.Element }> = [
    {
      href: '/donate',
      label: labels.donate,
      icon: <Heart className="h-4 w-4 fill-destructive text-destructive" />,
    },
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/90 shadow-lg backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:h-16">
        <Link href="/" className="group flex items-center gap-2">
          <Scroll className="h-6 w-6 text-accent transition-colors group-hover:text-secondary" />
          <span className="text-xl font-bold text-foreground">TaleBuilder Arena</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
                isActive(link.href) ? 'text-accent' : 'text-muted-foreground'
              }`}
              data-ga-event="nav-link-click"
              data-ga-category="navigation"
              data-ga-label={link.href}
            >
              <span>{link.label}</span>
              {link.icon ? <span className="text-accent">{link.icon}</span> : null}
            </Link>
          ))}
          <PrimaryActionButton asChild className="px-4 text-sm font-semibold uppercase">
            <Link
              href="/game"
              data-ga-event="nav-link-click"
              data-ga-category="navigation"
              data-ga-label="/game"
            >
              {labels.start}
            </Link>
          </PrimaryActionButton>
          <UserMenu />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <UserMenu />
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
            <SheetContent side="right" className="border-border bg-background/95 backdrop-blur-xl">
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
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold uppercase tracking-wide transition-colors hover:bg-accent/5 hover:text-accent ${
                          isActive(link.href) ? 'text-accent' : 'text-muted-foreground'
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
