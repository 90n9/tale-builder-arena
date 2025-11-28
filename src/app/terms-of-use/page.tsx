"use client";

import React from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Scale, ScrollText, Shield, Trophy, Ban } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { termsContent } from "@/data/terms-content";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";

const TermsOfUsePage = () => {
  const { language } = useLanguage();
  const t = (value: LocalizedText) => getLocalizedText(value, language);

  const commitments = [
    { icon: <Scale className="h-5 w-5 text-primary" />, ...termsContent.commitments[0] },
    { icon: <ScrollText className="h-5 w-5 text-primary" />, ...termsContent.commitments[1] },
    { icon: <Shield className="h-5 w-5 text-primary" />, ...termsContent.commitments[2] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="mb-6">
            <PageHeader
              eyebrow={t(termsContent.eyebrow)}
              title={t(termsContent.title)}
              description={t(termsContent.description)}
              icon={<Scale className="h-11 w-11" />}
            />
          </div>

          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
            <CardContent className="p-8 space-y-10">
              <section className="grid md:grid-cols-3 gap-6">
                {commitments.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border/60">
                    <div className="flex items-center gap-2 mb-3">
                      {item.icon}
                      <h2 className="font-semibold text-foreground">{t(item.title)}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(termsContent.accountHeading)}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t(termsContent.accountBody)}
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Ban className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(termsContent.conductHeading)}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {termsContent.conductRules.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <ScrollText className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(termsContent.ownershipHeading)}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {termsContent.ownershipPoints.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(termsContent.liabilityHeading)}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t(termsContent.liabilityBody)}
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t(termsContent.terminationHeading)}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {termsContent.terminationTerms.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{t(termsContent.lawHeading)}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(termsContent.lawBody)}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{t(termsContent.contactHeading)}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(termsContent.contactBody)}
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfUsePage;
