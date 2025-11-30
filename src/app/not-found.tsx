// This page reads client-side language context, so keep it as a client component.
'use client';

import Link from 'next/link';
import { Compass, Home, Play } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  const copy = {
    title: 'ไม่พบหน้านี้',
    description:
      'ดูเหมือนว่าคุณเดินออกนอกเส้นทาง กลับสู่ด่านหลักหรือเริ่มการผจญภัยใหม่เพื่อเดินหน้าต่อ',
    backHome: 'กลับหน้าหลัก',
    play: 'เริ่มการผจญภัย',
  };
  const text = copy;

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-40" />
      <div className="bg-gradient-overlay pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-16 pt-20">
        <div className="w-full max-w-3xl">
          <Card className="ornate-corners border-2 border-border/60 bg-gradient-card shadow-epic backdrop-blur-sm">
            <CardContent className="space-y-6 p-10 text-center">
              <div className="flex justify-center">
                <div className="rounded-full border border-accent/30 bg-accent/15 p-4">
                  <Compass className="h-12 w-12 text-accent" />
                </div>
              </div>
              <h1 className="text-5xl font-bold uppercase tracking-wide text-foreground">
                {text.title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {text.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
                >
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    {text.backHome}
                  </Link>
                </Button>
                <Button className="bg-gradient-primary hover:shadow-glow-orange">
                  <Link href="/game" className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
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
