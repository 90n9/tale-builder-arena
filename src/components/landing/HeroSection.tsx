'use client';

import React from 'react';
import Link from 'next/link';
import { PrimaryActionButton } from '@/components/ActionButtons';
import { landingContent } from '@/data/landing-content';

export const HeroSection = () => {
  const heroImageSrc = '/assets/hero-illustration.jpg';
  const content = landingContent.hero;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImageSrc})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="bg-gradient-overlay absolute inset-0" />

      <div className="container relative z-10 mx-auto px-4 pt-24 text-center">
        <div className="mx-auto max-w-4xl space-y-6">
          <p className="text-lg font-semibold tracking-wide text-accent">TaleBuilder Arena</p>
          <h1 className="text-5xl font-bold leading-tight text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] md:text-6xl lg:text-7xl">
            {content.headline}
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-foreground/90 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] md:text-2xl">
            {content.subhead}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <PrimaryActionButton asChild size="lg" className="px-10 py-7 text-lg font-semibold">
              <Link
                href="/game"
                data-ga-event="hero-cta-click"
                data-ga-category="cta"
                data-ga-label="/game"
              >
                {content.primaryCta}
              </Link>
            </PrimaryActionButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-accent/50 pt-2">
          <div className="h-3 w-1 rounded-full bg-accent/70" />
        </div>
      </div>
    </section>
  );
};
