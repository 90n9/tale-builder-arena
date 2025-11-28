"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import { PrimaryActionButton } from "@/components/ActionButtons";
import { landingContent } from "@/data/landing-content";

export const HeroSection = () => {
    const { language } = useLanguage();
    const heroImageSrc = "/assets/hero-illustration.jpg";
    const t = (value: LocalizedText) => getLocalizedText(value, language);
    const content = landingContent.hero;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImageSrc})` }}
            />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute inset-0 bg-gradient-overlay" />

            <div className="container mx-auto px-4 relative z-10 text-center pt-24">
                <div className="max-w-4xl mx-auto space-y-6">
                    <p className="text-accent text-lg font-semibold tracking-wide">TaleBuilder Arena</p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                        {t(content.headline)}
                    </h1>
                    <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
                        {t(content.subhead)}
                    </p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <PrimaryActionButton
                            asChild
                            size="lg"
                            className="text-lg font-semibold px-10 py-7"
                        >
                            <Link
                                href="/game"
                                data-ga-event="hero-cta-click"
                                data-ga-category="cta"
                                data-ga-label="/game"
                            >
                                {t(content.primaryCta)}
                            </Link>
                        </PrimaryActionButton>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-accent/70 rounded-full" />
                </div>
            </div>
        </section>
    );
};
