'use client';

import React from 'react';
import Link from 'next/link';
import { HeartHandshake, Coffee, ArrowLeft, Server, Wrench, PenTool, Timer } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PrimaryActionButton, SecondaryActionButton } from '@/components/ActionButtons';
import { KO_FI_URL } from '@/lib/external-links';
import { donateContent } from '@/data/donate-content';

const DonatePage = () => {
  const impactItems = [
    { icon: <Server className="h-5 w-5 text-primary" />, label: donateContent.impactHosting },
    { icon: <Wrench className="h-5 w-5 text-secondary" />, label: donateContent.impactFeatures },
    { icon: <PenTool className="h-5 w-5 text-primary" />, label: donateContent.impactStories },
    { icon: <Timer className="h-5 w-5 text-secondary" />, label: donateContent.impactTime },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pb-20 pt-28">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="bg-gradient-overlay absolute inset-0" />
          <div className="absolute -left-12 top-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4">
            <div className="grid items-center gap-12 py-16 lg:grid-cols-2">
              <div className="space-y-6">
                <PageHeader
                  eyebrow={donateContent.heroEyebrow}
                  title={donateContent.heroTitle}
                  description={donateContent.heroSubtitle}
                />
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {donateContent.heroDescription}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <PrimaryActionButton asChild size="lg" className="text-base">
                    <a
                      href={KO_FI_URL}
                      target="_blank"
                      rel="noreferrer"
                      data-ga-event="ko-fi-click"
                      data-ga-category="donation"
                      data-ga-label="donate-hero"
                    >
                      <div className="flex items-center gap-2">
                        <Coffee className="h-5 w-5" />
                        <span>{donateContent.heroPrimaryCta}</span>
                      </div>
                    </a>
                  </PrimaryActionButton>
                  <SecondaryActionButton asChild size="lg" className="text-base">
                    <Link href="/game">
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="h-5 w-5" />
                        <span>{donateContent.heroSecondaryCta}</span>
                      </div>
                    </Link>
                  </SecondaryActionButton>
                </div>
              </div>

              <Card className="ornate-corners border-2 border-border/70 bg-gradient-card shadow-epic backdrop-blur-md">
                <CardContent className="space-y-6 p-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full border border-primary/40 bg-primary/15 p-3 text-primary">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-accent">
                        {donateContent.whyHeading}
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold text-foreground">
                        {donateContent.donationHeading}
                      </h2>
                    </div>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">
                    {donateContent.whyBodyOne}
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    {donateContent.whyBodyTwo}
                  </p>
                  <blockquote className="border-l-4 border-accent/60 pl-4 italic text-foreground">
                    {donateContent.quote}
                  </blockquote>
                  <Badge className="border border-border bg-background text-foreground">
                    {donateContent.donationBody}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-primary/40 bg-primary/15 p-3 text-primary">
                  <Coffee className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-accent">
                    {donateContent.impactHeading}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    {donateContent.impactDescription}
                  </h3>
                </div>
              </div>
              <div className="grid gap-4 pt-2 sm:grid-cols-2">
                {impactItems.map((item) => (
                  <div
                    key={item.label}
                    className="ornate-corners flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-4 transition-all hover:border-accent/60"
                  >
                    <div className="mt-1">{item.icon}</div>
                    <p className="leading-relaxed text-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Card className="ornate-corners relative overflow-hidden border-2 border-border/70 bg-gradient-card shadow-epic">
            <div className="bg-gradient-overlay pointer-events-none absolute inset-0" />
            <CardContent className="relative space-y-6 p-10 text-center md:p-12">
              <h3 className="text-4xl font-bold text-foreground">{donateContent.thanksHeading}</h3>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {donateContent.thanksBody}
              </p>
              <p className="mx-auto max-w-3xl leading-relaxed text-muted-foreground">
                {donateContent.suggestedAmounts}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <PrimaryActionButton asChild size="lg" className="font-semibold">
                  <a
                    href={KO_FI_URL}
                    target="_blank"
                    rel="noreferrer"
                    data-ga-event="ko-fi-click"
                    data-ga-category="donation"
                    data-ga-label="donate-footer"
                  >
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      <span>{donateContent.heroPrimaryCta}</span>
                    </div>
                  </a>
                </PrimaryActionButton>
                <SecondaryActionButton asChild size="lg">
                  <Link href="/">
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="h-5 w-5" />
                      <span>{donateContent.backHome}</span>
                    </div>
                  </Link>
                </SecondaryActionButton>
              </div>
              <p className="text-sm text-muted-foreground">{donateContent.suggestedNote}</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DonatePage;
