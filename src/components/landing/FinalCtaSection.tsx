"use client";

import React from "react";
import Link from "next/link";
import { landingContent } from "@/data/landing-content";
import { PrimaryActionButton } from "@/components/ActionButtons";

export const FinalCtaSection = () => {
    const content = landingContent.finalCta;

    return (
        <section className="pt-20 pb-24 relative">
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
                    {content.heading}
                </h2>
                <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                    {content.description}
                </p>
                <PrimaryActionButton
                    asChild
                    size="lg"
                    className="text-xl font-bold px-12 py-8 uppercase tracking-wider"
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
