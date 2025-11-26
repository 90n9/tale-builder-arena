"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Zap, BookOpen, UserPlus, GitBranch, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const AboutPage = () => {
  const { language } = useLanguage();
  const copy = {
    th: {
      headerTitle: "เกี่ยวกับ TaleBuilder Arena",
      headerDescription: "แพลตฟอร์มเกมเรื่องเล่าแบบเลือกทาง โหลดไวด้วยเรื่องและภาพที่เตรียมไว้ล่วงหน้า ไม่ต้องรอ AI ระหว่างเล่น",
      whatIs: {
        heading: "TaleBuilder Arena คืออะไร?",
        body:
          "TaleBuilder Arena คือแพลตฟอร์มเกมเรื่องเล่า ผู้เล่นเลือกเส้นเรื่อง สร้างตัวละคร และตัดสินใจในแต่ละฉากเพื่อไปสู่ตอนจบที่หลากหลาย ทุกเรื่องและภาพถูกสร้างเตรียมไว้ล่วงหน้า เล่นลื่น ไม่ต้องรอ AI ระหว่างเกม",
      },
      highlights: {
        heading: "จุดเด่นของ TaleBuilder Arena",
        bullets: [
          { title: "โหลดไวทันที", body: "เรื่องและภาพพร้อมเล่น ไม่ต้องรอประมวลผล" },
          { title: "หลายแนวให้เลือก", body: "แฟนตาซี ลึกลับ โรแมนซ์ ผจญภัย และเพิ่มเนื้อเรื่องต่อเนื่อง" },
          { title: "สร้างตัวละครได้อิสระ", body: "กำหนดบุคลิก หน้าตา และบทบาทตามที่ต้องการ" },
          { title: "ตอนจบหลายแบบ", body: "เลือกอย่างไร ได้ผลลัพธ์แบบนั้น กลับมาเล่นใหม่ก็ไม่เหมือนเดิม" },
          { title: "ประสบการณ์เสถียร", body: "ทุกอย่างเตรียมไว้ล่วงหน้าเพื่อความเร็วและความต่อเนื่อง" },
        ],
      },
      vision: {
        heading: "Our Vision",
        body: "เราผสานจินตนาการกับเทคโนโลยี เพื่อให้ทุกคนสร้างและสำรวจโลกเรื่องเล่าได้ง่าย สนุก และเข้าถึงได้ทุกเวลา",
      },
      ctaText: "พร้อมออกผจญภัยใน TaleBuilder Arena แล้วหรือยัง?",
      ctaButton: "กลับสู่การผจญภัย",
    },
    en: {
      headerTitle: "About TaleBuilder Arena",
      headerDescription: "A story-driven game platform with pre-built stories and visuals for instant, AI-free loading during play.",
      whatIs: {
        heading: "What is TaleBuilder Arena?",
        body:
          "TaleBuilder Arena is a story-based game platform where you pick a storyline, create a character, and make choices that branch into different endings. Every story and image is pre-generated for fast, seamless play—no AI wait times in the middle of your adventure.",
      },
      highlights: {
        heading: "What makes TaleBuilder Arena unique",
        bullets: [
          { title: "Instant loading", body: "Stories and art are ready to play—no processing delays." },
          { title: "Many genres", body: "Fantasy, mystery, romance, adventure, and new tales arriving often." },
          { title: "Flexible character creation", body: "Shape personality, looks, and role to fit your story." },
          { title: "Multiple endings", body: "Your choices drive the outcome; replay to discover new paths." },
          { title: "Stable experience", body: "Pre-built content keeps performance smooth and reliable." },
        ],
      },
      vision: {
        heading: "Our Vision",
        body: "We blend imagination with technology so anyone can build and explore story worlds easily, joyfully, and anytime.",
      },
      ctaText: "Ready to dive into TaleBuilder Arena?",
      ctaButton: "Back to the adventure",
    },
  } as const;

  const text = language === "en" ? copy.en : copy.th;
  const uniquePoints = [
    { icon: <Zap className="h-5 w-5" />, ...text.highlights.bullets[0] },
    { icon: <BookOpen className="h-5 w-5" />, ...text.highlights.bullets[1] },
    { icon: <UserPlus className="h-5 w-5" />, ...text.highlights.bullets[2] },
    { icon: <GitBranch className="h-5 w-5" />, ...text.highlights.bullets[3] },
    { icon: <Sparkles className="h-5 w-5" />, ...text.highlights.bullets[4] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <PageHeader
              title={text.headerTitle}
              description={text.headerDescription}
            />
          </div>

          {/* Main Content */}
          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card mb-12">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{text.whatIs.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{text.whatIs.body}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{text.highlights.heading}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {uniquePoints.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border-2 border-accent/30 hover:border-accent/50 transition-all"
                    >
                      <div className="text-accent mt-1">{item.icon}</div>
                      <div className="space-y-1">
                        <p className="text-foreground font-semibold">{item.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{text.vision.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{text.vision.body}</p>
              </section>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              {text.ctaText}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary hover:shadow-glow-orange transition-all text-base font-semibold"
            >
              <Link href="/game">{text.ctaButton}</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
