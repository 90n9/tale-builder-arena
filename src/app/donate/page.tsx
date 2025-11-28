"use client";

import React from "react";
import Link from "next/link";
import { HeartHandshake, Coffee, ArrowLeft, Server, Wrench, PenTool, Timer } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrimaryActionButton, SecondaryActionButton } from "@/components/ActionButtons";
import { KO_FI_URL } from "@/lib/external-links";
import { donateContent } from "@/data/donate-content";

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

      <main className="pt-28 pb-20">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="absolute inset-0 bg-gradient-overlay" />
          <div className="absolute -left-12 top-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
              <div className="space-y-6">
                <PageHeader
                  eyebrow={donateContent.heroEyebrow}
                  title={donateContent.heroTitle}
                  description={donateContent.heroSubtitle}
                />
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
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

              <Card className="ornate-corners bg-gradient-card border-2 border-border/70 shadow-epic backdrop-blur-md">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/15 border border-primary/40 text-primary">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-accent">{donateContent.whyHeading}</p>
                      <h2 className="text-2xl font-semibold text-foreground mt-1">
                        {donateContent.donationHeading}
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{donateContent.whyBodyOne}</p>
                  <p className="text-muted-foreground leading-relaxed">{donateContent.whyBodyTwo}</p>
                  <blockquote className="border-l-4 border-accent/60 pl-4 italic text-foreground">
                    {donateContent.quote}
                  </blockquote>
                  <Badge className="bg-background border border-border text-foreground">
                    {donateContent.donationBody}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="space-y-10 max-w-5xl mx-auto">
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/15 border border-primary/40 text-primary">
                  <Coffee className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-accent">{donateContent.impactHeading}</p>
                  <h3 className="text-2xl font-bold text-foreground">{donateContent.impactDescription}</h3>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {impactItems.map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-lg border border-border/60 bg-muted/20 hover:border-accent/60 transition-all flex items-start gap-3 ornate-corners"
                  >
                    <div className="mt-1">{item.icon}</div>
                    <p className="text-foreground leading-relaxed">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Card className="relative ornate-corners bg-gradient-card border-2 border-border/70 shadow-epic overflow-hidden">
            <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />
            <CardContent className="relative p-10 md:p-12 text-center space-y-6">
              <h3 className="text-4xl font-bold text-foreground">{donateContent.thanksHeading}</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {donateContent.thanksBody}
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">{donateContent.suggestedAmounts}</p>
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
