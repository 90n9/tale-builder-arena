"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Cpu, Sparkles, Book, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const AboutPage = () => {
  const { language } = useLanguage();
  const copy = {
    th: {
      headerTitle: "เกี่ยวกับ TaleBuilder Arena",
      headerDescription: "เกมเล่าเรื่องเชิงทดลองที่ผสานเวทมนตร์ของเกมกระดาน RPG เข้ากับพลังของปัญญาประดิษฐ์",
      whatIs: {
        heading: "TaleBuilder Arena คืออะไร?",
        body: `TaleBuilder Arena คือเกมผจญภัยเชิงข้อความที่ขับเคลื่อนด้วย AI ทำหน้าที่เป็น Dungeon Master ประจำตัวคุณ 
ไม่เหมือนเกมทั่วไปที่มีเนื้อเรื่องตายตัว TaleBuilder Arena สร้างเรื่องราวใหม่แบบเรียลไทม์ 
ปรับตามการเลือกของคุณและสร้างการผจญภัยที่ไม่เหมือนใครทุกครั้งที่เล่น`,
      },
      howBuilt: {
        heading: "สร้างขึ้นอย่างไร",
        intro: "โปรเจกต์นี้ใช้เทคโนโลยีล้ำสมัยเพื่อสร้างประสบการณ์เล่าเรื่องที่ชวนดื่มด่ำ:",
        tech: ["โมเดลภาษาปัญญาประดิษฐ์", "การเล่าเรื่องแบบไดนามิก", "การสร้างเนื้อหาแบบสุ่มตามขั้นตอน", "ระบบตัวเลือกผู้เล่น"],
      },
      experience: {
        heading: "ประสบการณ์ที่คุณจะได้รับ",
        bullets: [
          { title: "เนื้อเรื่องพลิกแพลง", body: "ทุกการเล่นจะเล่าเรื่องไม่ซ้ำตามการตัดสินใจของคุณ" },
          { title: "ภาพชวนดื่มด่ำ", body: "งานภาพที่สร้างด้วย AI ทำให้ทุกฉากมีชีวิต" },
          { title: "พัฒนาตัวละคร", body: "ติดตามค่าสถานะ ช่องเก็บของ และภารกิจระหว่างการผจญภัย" },
          { title: "ทางเลือกมีความหมาย", body: "การตัดสินใจของคุณกำหนดทั้งเนื้อเรื่องและโลกในเกม" },
        ],
      },
      purpose: {
        heading: "เป้าหมายของโปรเจกต์",
        body: `TaleBuilder Arena คือการทดลองว่า AI จะยกระดับการเล่าเรื่องแบบอินเทอร์แอคทีฟได้อย่างไร 
เรากำลังมองหาวิธีให้เนื้อเรื่องตอบสนอง เป็นส่วนตัว และดึงดูดใจมากขึ้น 
โปรเจกต์สร้างสรรค์นี้ต้องการผลักดันขอบเขตของสิ่งที่เป็นไปได้เมื่อความคิดสร้างสรรค์ของมนุษย์ผสานกับ AI`,
      },
      notes: {
        heading: "ข้อควรทราบ",
        items: [
          "โปรเจกต์นี้ยังอยู่ในขั้นทดลอง อาจมีพฤติกรรมหรือเนื้อหาที่คาดไม่ถึง",
          "เนื้อหาที่สร้างด้วย AI คาดเดาไม่ได้เสมอ และคุณภาพอาจแตกต่างกัน",
          "สถานะเกมและความคืบหน้าอาจยังไม่ถูกบันทึกข้ามรอบการเล่น",
          "โปรเจกต์นี้มีไว้เพื่อการศึกษาและความบันเทิงเท่านั้น",
        ],
      },
      ctaText: "พร้อมสัมผัสมนตร์เสน่ห์ของการเล่าเรื่องด้วย AI แล้วหรือยัง?",
      ctaButton: "กลับสู่การผจญภัย",
    },
    en: {
      headerTitle: "About TaleBuilder Arena",
      headerDescription: "An experimental storytelling game blending tabletop RPG magic with AI power.",
      whatIs: {
        heading: "What is TaleBuilder Arena?",
        body: `TaleBuilder Arena is an AI-driven text adventure that acts as your personal Dungeon Master. 
Unlike fixed-story games, it generates new narratives in real time, 
adapting to your choices so every run feels unique.`,
      },
      howBuilt: {
        heading: "How it's built",
        intro: "We use modern technology to deliver immersive storytelling:",
        tech: ["AI language models", "Dynamic storytelling", "Procedural content generation", "Player choice systems"],
      },
      experience: {
        heading: "What you'll experience",
        bullets: [
          { title: "Adaptive stories", body: "Each playthrough unfolds differently based on your decisions." },
          { title: "Immersive visuals", body: "AI-crafted art brings every scene to life." },
          { title: "Character growth", body: "Track stats, inventory, and quests along your journey." },
          { title: "Meaningful choices", body: "Your decisions shape both the story and the world." },
        ],
      },
      purpose: {
        heading: "Project goal",
        body: `TaleBuilder Arena explores how AI can elevate interactive storytelling.
We're looking for ways to make stories more responsive, personal, and engaging.
This creative project pushes the boundary of what's possible when human imagination meets AI.`,
      },
      notes: {
        heading: "Notes",
        items: [
          "This experiment may behave unpredictably at times.",
          "AI-generated content can vary in tone and quality.",
          "Game state and progress may not persist between sessions yet.",
          "Built for learning and entertainment purposes only.",
        ],
      },
      ctaText: "Ready to experience AI-powered storytelling magic?",
      ctaButton: "Back to the adventure",
    },
  } as const;

  const text = language === "en" ? copy.en : copy.th;
  const techStack = [
    { icon: <Cpu className="h-5 w-5" />, label: text.howBuilt.tech[0] },
    { icon: <Sparkles className="h-5 w-5" />, label: text.howBuilt.tech[1] },
    { icon: <Book className="h-5 w-5" />, label: text.howBuilt.tech[2] },
    { icon: <Heart className="h-5 w-5" />, label: text.howBuilt.tech[3] },
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
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {text.whatIs.body}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{text.howBuilt.heading}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {text.howBuilt.intro}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border-2 border-accent/30 hover:border-accent/50 transition-all"
                    >
                      <div className="text-accent">{tech.icon}</div>
                      <span className="text-foreground font-medium">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{text.experience.heading}</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {text.experience.bullets.map((item) => (
                    <li key={item.title} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>
                        <strong className="text-foreground">{item.title}:</strong> {item.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{text.purpose.heading}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {text.purpose.body}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">{text.notes.heading}</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {text.notes.items.map((note) => (
                    <p key={note}>• {note}</p>
                  ))}
                </div>
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
