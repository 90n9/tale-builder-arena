'use client';

import React from 'react';
import Link from 'next/link';
import { landingContent } from '@/data/landing-content';
import { PrimaryActionButton } from '@/components/ActionButtons';

export const FinalCtaSection = () => {
  const content = landingContent.finalCta;

  return (
    <section className="relative pb-24 pt-20">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="mb-8 text-5xl font-bold text-foreground md:text-6xl">{content.heading}</h2>
        <p className="mx-auto mb-8 max-w-3xl text-2xl leading-relaxed text-muted-foreground">
          {content.description}
        </p>
        <PrimaryActionButton
          asChild
          size="lg"
          className="px-12 py-8 text-xl font-bold uppercase tracking-wider"
        >
          <Link
            href="/game"
            data-ga-event="hero-cta-click"
            data-ga-category="cta"
            data-ga-label="/game"
          >
            {content.button}
          </Link>
        </PrimaryActionButton>
      </div>
    </section>
  );
};
