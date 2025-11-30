'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { landingContent } from '@/data/landing-content';
import { PrimaryActionButton } from '@/components/ActionButtons';
import { Flame } from 'lucide-react';

export const StoriesSection = () => {
  const content = landingContent.stories;

  const storyItems = content.items.map((story) => ({
    ...story,
    title: story.title,
    hook: story.hook,
    cta: story.cta,
  }));

  return (
    <section id="stories" className="relative pb-20 pt-16">
      <div className="absolute inset-0 bg-gradient-card opacity-50" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 space-y-6 text-center">
          <h2 className="text-5xl font-bold text-foreground">{content.heading}</h2>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {storyItems.map((story) => (
            <Card
              key={story.title}
              className="ornate-corners border-2 border-border/60 bg-gradient-card backdrop-blur-sm transition-all hover:border-accent/60 hover:shadow-card"
            >
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center gap-3 text-accent">
                  <Flame className="h-6 w-6" />
                  <p className="font-semibold">{story.title}</p>
                </div>
                <p className="text-lg leading-relaxed text-foreground">{story.hook}</p>
                <PrimaryActionButton asChild>
                  <Link href="/game">{story.cta}</Link>
                </PrimaryActionButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
