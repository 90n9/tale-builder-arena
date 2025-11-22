"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Scroll } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const labels = {
    th: {
      home: "หน้าหลัก",
      achievements: "ความสำเร็จ",
      start: "เริ่มการผจญภัย",
      menu: "เมนู",
    },
    en: {
      home: "Home",
      achievements: "Achievements",
      start: "Start Adventure",
      menu: "Menu",
    },
  } as const;
  const text = language === "en" ? labels.en : labels.th;

  const navLinks = [
    { href: "/", label: text.home },
    { href: "/achievements", label: text.achievements },
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
              className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
                isActive(link.href) ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <Button asChild className="bg-gradient-primary hover:shadow-glow-orange transition-all text-sm font-semibold uppercase text-primary-foreground border border-secondary/50">
            <Link href="/game">
              {text.start}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            size="sm"
            className="bg-gradient-primary hover:shadow-glow-orange transition-all text-xs font-semibold uppercase text-primary-foreground border border-secondary/50 px-3"
          >
            <Link href="/game">{text.start}</Link>
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border border-border/60 text-foreground hover:border-accent hover:text-accent"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{text.menu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border">
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={handleCloseMenu}>
                    <Scroll className="h-5 w-5 text-accent" />
                    <span className="text-lg font-bold text-foreground">TaleBuilder Arena</span>
                  </Link>
                  <LanguageToggle />
                </div>
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`block rounded-md px-3 py-2 text-base font-semibold uppercase tracking-wide transition-colors hover:text-accent hover:bg-accent/5 ${
                          isActive(link.href) ? "text-accent" : "text-muted-foreground"
                        }`}
                        onClick={handleCloseMenu}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-gradient-primary hover:shadow-glow-orange text-sm font-semibold uppercase text-primary-foreground border border-secondary/50"
                    onClick={handleCloseMenu}
                  >
                    <Link href="/game">{text.start}</Link>
                  </Button>
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
