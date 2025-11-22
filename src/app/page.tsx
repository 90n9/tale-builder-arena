"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, MessageSquare, BarChart3, Image, Play, Zap, BookOpen, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const Index = () => {
  const { language } = useLanguage();
  const heroImageSrc = "/assets/hero-illustration.jpg";
  const copy = {
    th: {
      hero: {
        tagline: "เรื่องราวของคุณ ทางเลือกของคุณ",
        description:
          "ออกเดินทางผจญภัยสุดยิ่งใหญ่ภายใต้การนำของ AI Dungeon Master ทุกการตัดสินใจจะกำหนดโชคชะตา ในประสบการณ์ RPG เชิงข้อความที่ชวนดื่มด่ำ",
        primaryCta: "เริ่มการผจญภัย",
        secondaryCta: "ชมตัวอย่าง",
      },
      features: {
        heading: "ฟีเจอร์เด่น",
        description: "ขับเคลื่อนด้วยเทคโนโลยี AI ล้ำสมัยเพื่อมอบประสบการณ์การเล่าเรื่องที่เหนือชั้น",
        cards: [
          { title: "AI Dungeon Master", description: "สัมผัสการเล่าเรื่องอันลื่นไหลด้วย AI ขั้นสูงที่ปรับตามทุกการตัดสินใจของคุณ" },
          { title: "เกมทางเลือก", description: "ทุกการเลือกมีผลสำคัญ เนื้อเรื่องจะแตกแขนงไม่เหมือนใครตามเส้นทางที่คุณตัดสินใจ" },
          { title: "ระบบความสำเร็จ", description: "ปลดล็อกถ้วยรางวัลพิเศษจากฉากจบหลากหลายแนวและเส้นทาง" },
          { title: "สถานะตัวละครแบบเรียลไทม์", description: "ติดตาม HP มานา ทอง และไอเทมต่างๆ ของคุณขณะออกผจญภัย" },
          { title: "ภาพประกอบฉาก", description: "ดื่มด่ำกับงานภาพที่สร้างด้วย AI ที่ปลุกทุกฉากให้มีชีวิต" },
        ],
      },
      steps: {
        heading: "วิธีเริ่มเล่น",
        description: "เพียง 3 ขั้นตอนก็เริ่มผจญภัยได้ทันที",
        items: [
          { title: "เริ่มภารกิจ", description: "คลิก 'เริ่มการผจญภัย' เพื่อออกเดินทาง" },
          { title: "อ่านแล้วตัดสินใจ", description: "ติดตามเรื่องราวแล้วเลือกเส้นทางที่ต้องการ" },
          { title: "สร้างเรื่องของคุณ", description: "ให้ทางเลือกของคุณสร้างการผจญภัยที่ไม่ซ้ำใคร" },
        ],
      },
      immersion: {
        heading: "การเล่นสุดดื่มด่ำ",
        description: "อินเทอร์เฟซเรียบง่าย เข้าใจทันที ออกแบบมาเพื่อเล่าเรื่องโดยเฉพาะ",
        imageTitle: "งานภาพเล่าเรื่อง",
        imageDescription: "ทุกฉากมีชีวิตด้วยภาพจาก AI เสริมบรรยากาศให้การผจญภัยของคุณสมบูรณ์ขึ้น",
        storySample:
          "\"คุณยืนอยู่หน้าทางเข้าดันเจี้ยนโบราณ อากาศหนาหนักไปด้วยความลี้ลับ ผลึกเรืองแสงสะท้อนแสงตามผนังทางเดินหิน เสียงกระซิบแผ่วเบาดังมาจากเบื้องลึก...\"",
        storyTitle: "เนื้อเรื่องเข้มข้น",
        storyDescription: "เรื่องราวน่าติดตามที่ตอบสนองต่อการเลือกของคุณ สร้างการผจญภัยไม่ซ้ำใครทุกครั้ง",
      },
      finalCta: {
        heading: "พร้อมออกเดินทางหรือยัง?",
        description: "การผจญภัยของคุณกำลังรออยู่ ก้าวสู่โลกที่ทุกการเลือกมีความหมาย และทุกเรื่องราวไม่เหมือนใคร",
        button: "เล่นทันที",
      },
    },
    en: {
      hero: {
        tagline: "Your story, your choices",
        description:
          "Set out on an epic adventure guided by an AI Dungeon Master. Every decision shapes your fate in a deeply immersive text RPG.",
        primaryCta: "Start adventure",
        secondaryCta: "See preview",
      },
      features: {
        heading: "Key features",
        description: "Powered by advanced AI to deliver richer, more reactive storytelling.",
        cards: [
          { title: "AI Dungeon Master", description: "Seamless storytelling from adaptive AI that responds to every decision." },
          { title: "Branching choices", description: "Every choice matters with narratives that split and stay unique to your path." },
          { title: "Achievements", description: "Unlock special trophies from diverse endings and routes." },
          { title: "Live character stats", description: "Track HP, mana, gold, and gear as you venture forward." },
          { title: "Scene art", description: "Immerse yourself with AI-crafted visuals that bring each encounter to life." },
        ],
      },
      steps: {
        heading: "How to begin",
        description: "Just three steps to start exploring.",
        items: [
          { title: "Begin the quest", description: "Click 'Start Adventure' to set off." },
          { title: "Read and decide", description: "Follow the story and choose your path." },
          { title: "Forge your tale", description: "Let your choices craft a unique adventure." },
        ],
      },
      immersion: {
        heading: "Immersive play",
        description: "A clean, intuitive interface built for storytelling.",
        imageTitle: "Narrative visuals",
        imageDescription: "AI-generated art brings every scene to life and deepens the mood.",
        storySample:
          "\"You stand at the mouth of an ancient dungeon, air thick with secrets. Glowing crystals line the stone walls as whispers drift up from the depths...\"",
        storyTitle: "Layered narrative",
        storyDescription: "A reactive storyline that reshapes itself around your choices, every run feeling new.",
      },
      finalCta: {
        heading: "Ready to head out?",
        description: "Your adventure is waiting. Step into a world where every choice matters and no journey is the same.",
        button: "Play now",
      },
    },
  } as const;

  const text = language === "en" ? copy.en : copy.th;

  const featureItems = [
    { icon: <Sparkles className="h-8 w-8 text-primary" /> },
    { icon: <MessageSquare className="h-8 w-8 text-secondary" /> },
    { icon: <Trophy className="h-8 w-8 text-primary" /> },
    { icon: <BarChart3 className="h-8 w-8 text-secondary" /> },
    { icon: <Image className="h-8 w-8 text-primary" /> },
  ].map((item, index) => ({
    ...item,
    ...text.features.cards[index],
  }));

  const stepItems = [
    { icon: <Play className="h-6 w-6" /> },
    { icon: <BookOpen className="h-6 w-6" /> },
    { icon: <Zap className="h-6 w-6" /> },
  ].map((item, index) => ({
    ...item,
    ...text.steps.items[index],
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageSrc})`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                TaleBuilder Arena
              </span>
            </h1>
            
            <div className="mb-8">
              <div className="inline-block bg-card/80 backdrop-blur-sm border-2 border-accent/30 rounded px-6 py-3">
                <p className="text-xl md:text-2xl text-accent font-semibold uppercase tracking-wider">
                  {text.hero.tagline}
                </p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/90 mb-12 leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
              {text.hero.description}
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:shadow-glow-orange transition-all text-lg font-semibold px-10 py-7 text-primary-foreground border-2 border-secondary/50"
              >
                <Link href="/game">{text.hero.primaryCta}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-accent/50 text-accent hover:bg-accent/10 hover:shadow-glow-cyan transition-all text-lg px-10 py-7 backdrop-blur-sm bg-background/30"
              >
                <Link href="/about">{text.hero.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              {text.features.heading}
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              {text.features.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {featureItems.map((feature) => (
              <Card 
                key={feature.title}
                className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-card hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 group"
              >
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors border border-border/30">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              {text.steps.heading}
            </h2>
            <p className="text-muted-foreground text-xl">
              {text.steps.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {stepItems.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow-orange border-2 border-secondary/30">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < stepItems.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              {text.immersion.heading}
            </h2>
            <p className="text-muted-foreground text-xl">
              {text.immersion.description}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm shadow-epic overflow-hidden">
              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border border-border/30 backdrop-blur-sm overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-cyan opacity-10 group-hover:opacity-20 transition-opacity" />
                      <Image className="h-16 w-16 text-accent/50 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">{text.immersion.imageTitle}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {text.immersion.imageDescription}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-64 bg-muted/30 rounded-lg p-6 overflow-auto border border-border/30 backdrop-blur-sm">
                      <p className="text-foreground italic text-lg leading-relaxed">
                        {text.immersion.storySample}
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">{text.immersion.storyTitle}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {text.immersion.storyDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="section-divider mb-12" />
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground uppercase tracking-wide">
            {text.finalCta.heading}
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {text.finalCta.description}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-primary hover:shadow-glow-orange transition-all text-xl font-bold px-12 py-8 text-primary-foreground border-2 border-secondary/50 uppercase tracking-wider"
          >
            <Link href="/game">{text.finalCta.button}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
