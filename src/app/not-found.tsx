// This page reads client-side language context, so keep it as a client component.
"use client";

import Link from "next/link";
import { Compass, Home, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function NotFound() {
  const { language } = useLanguage();
  const copy = {
    th: {
      title: "ไม่พบหน้านี้",
      description: "ดูเหมือนว่าคุณเดินออกนอกเส้นทาง กลับสู่ด่านหลักหรือเริ่มการผจญภัยใหม่เพื่อเดินหน้าต่อ",
      backHome: "กลับหน้าหลัก",
      play: "เริ่มการผจญภัย",
    },
    en: {
      title: "Page not found",
      description: "Looks like you strayed off the path. Return to base or start a new run to keep going.",
      backHome: "Back home",
      play: "Start adventure",
    },
  } as const;
  const text = language === "en" ? copy.en : copy.th;

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-hero opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-20 pb-16">
        <div className="w-full max-w-3xl">
          <Card className="ornate-corners border-2 border-border/60 bg-gradient-card backdrop-blur-sm shadow-epic">
            <CardContent className="p-10 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-accent/15 border border-accent/30">
                  <Compass className="h-12 w-12 text-accent" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-foreground uppercase tracking-wide">{text.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {text.description}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                >
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    {text.backHome}
                  </Link>
                </Button>
                <Button className="bg-gradient-primary hover:shadow-glow-orange">
                  <Link href="/game" className="flex items-center">
                    <Play className="h-5 w-5 mr-2" />
                    {text.play}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
