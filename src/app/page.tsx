'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { PromiseSection } from '@/components/landing/PromiseSection';
import { StoriesSection } from '@/components/landing/StoriesSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { DonationSection } from '@/components/landing/DonationSection';
import { FinalCtaSection } from '@/components/landing/FinalCtaSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection />
      <PromiseSection />
      <StoriesSection />
      <BenefitsSection />
      {/* Social Proof (temporarily hidden) */}
      <FaqSection />
      <FinalCtaSection />
      <DonationSection />

      <Footer />
    </div>
  );
};

export default Index;
