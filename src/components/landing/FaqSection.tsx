"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { landingContent } from "@/data/landing-content";
import { CircleHelp } from "lucide-react";

export const FaqSection = () => {
    const content = landingContent.faq;

    const faqItems = content.items.map((item) => ({
        ...item,
        question: item.question,
        answer: item.answer,
    }));

    return (
        <section className="pt-16 pb-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 space-y-6">
                    <h2 className="text-5xl font-bold text-foreground">{content.heading}</h2>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqItems.map((item) => (
                        <Card
                            key={item.question}
                            className="border-2 border-border/50 bg-gradient-card backdrop-blur-sm ornate-corners hover:border-accent/60 transition-all"
                        >
                            <CardContent className="p-6 space-y-2">
                                <p className="text-foreground font-semibold text-lg flex items-center gap-3">
                                    <CircleHelp className="h-5 w-5 text-accent" />
                                    {item.question}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
