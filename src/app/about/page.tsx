"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Zap, BookOpen, UserPlus, GitBranch } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const AboutPage = () => {
  const { language } = useLanguage();
  const copy = {
    th: {
      headerTitle: "เกี่ยวกับเรา",
      headerDescription:
        "ทุกเรื่องราว… เริ่มต้นที่คุณ เราอยากให้ทุกคนได้ลองเลือกเส้นทาง สร้างตัวละคร และดำดิ่งสู่เรื่องเล่าที่พร้อมเล่นทันที",
      intro: {
        heading: "ทุกเรื่องราว… เริ่มต้นที่คุณ",
        body: [
          "ที่ TaleBuilder Arena เราเชื่อว่าทุกคนมีจินตนาการและทุกทางเลือกสามารถเปลี่ยนชะตาได้ เราจึงสร้างแพลตฟอร์มให้คุณเลือกเรื่อง เลือกตัวละคร และเลือกทางเดินได้ด้วยตัวเอง",
          "ทุกเรื่องและภาพประกอบถูกเตรียมไว้ล่วงหน้าเพื่อให้คุณกดแล้วเล่นได้ทันที ไม่ต้องดาวน์โหลดหรือรอประมวลผลระหว่างทาง ทั้งบนเว็บและมือถือ",
        ],
      },
      inspiration: {
        heading: "ที่มาของเรา / จุดเริ่มต้น",
        body: [
          "เราเห็นว่าหลายคนรักเกมแนวเรื่อง แต่ติดข้อจำกัดเรื่องเวลา งานศิลป์ หรือไม่รู้จะเริ่มอย่างไร บางคนมีไอเดียมากมายแต่ไม่ถนัดวาดภาพ หรือไม่มีเวลารอสร้างฉาก",
          "TaleBuilder Arena จึงถูกสร้างเป็นพื้นที่ที่ใครก็สามารถสัมผัส “เกมบทบาท / เรื่องมีทางเลือก” ได้ง่ายและรวดเร็ว ไม่ต้องมีพื้นฐานวาดภาพ และไม่ต้องรอนาน",
        ],
      },
      values: {
        heading: "สิ่งที่เราให้กับคุณ",
        lead: "เราอยากให้ TaleBuilder Arena เป็นพื้นที่อบอุ่นให้คุณพักใจ เติมจินตนาการ และลองตัดสินใจในสถานการณ์ใหม่ๆ",
        bullets: [
          { title: "คลังเรื่องราวหลากหลาย", body: "พร้อมเล่นทันที ไม่ต้องสร้างเองหรือรอประมวลผล" },
          { title: "ตัวละคร & ภาพประกอบครบ", body: "ช่วยบรรยากาศของโลก เรื่อง และตัวละครชัดเจนตั้งแต่ต้น" },
          { title: "ระบบทางเลือกมีผลจริง", body: "ทุกการตัดสินใจส่งผลต่อเส้นเรื่องและตอนจบ กลับมาเล่นใหม่ก็เจอเส้นทางใหม่" },
          { title: "เข้าเล่นง่ายทุกที่", body: "เล่นผ่านเว็บเบราว์เซอร์ ทั้งมือถือและ PC ไม่ต้องดาวน์โหลด" },
        ],
      },
      missionVision: {
        heading: "วิสัยทัศน์ & ภารกิจ",
        missionTitle: "ภารกิจ (Mission)",
        missionBody:
          "มอบประสบการณ์เรื่องราวผ่านทางเลือกที่ทุกคนเข้าถึงได้ ให้ผู้เล่นสร้างเรื่อง สวมบทบาท และใช้จินตนาการอย่างอิสระ",
        visionTitle: "วิสัยทัศน์ (Vision)",
        visionBody:
          "ให้ TaleBuilder Arena กลายเป็น “ห้องสมุดเรื่องราวที่มีชีวิต” ที่คนทั่วโลกเข้าเล่น สร้างเรื่อง และแบ่งปันประสบการณ์ — ทุกคนมีสิทธิกำหนดชะตาของตัวเอง",
      },
      team: {
        heading: "ทีมเบื้องหลัง",
        lead:
          "เราอาจเริ่มจากทีมเล็ก แต่ใจใหญ่ ทุกคนคือคนที่รักเรื่องราว รักเกม และเชื่อว่าจินตนาการควรเป็นของทุกคน",
        solo: "TaleBuilder Arena ถูกพัฒนาโดยนักพัฒนาคนเดียวภายใต้ GongIdeas.com ที่ดูแลทั้งเรื่องระบบ ประสบการณ์ผู้เล่น และการเปิดรับเพื่อนใหม่มาร่วมสร้าง",
      },
      invitation: {
        heading: "เชิญคุณมาเป็นส่วนหนึ่งของเรา",
        body: [
          "หากคุณมีไอเดียเรื่อง พล็อต เรื่องสั้น หรืออยากช่วยทดสอบ เราเปิดรับอย่างอบอุ่น",
          "มาสร้างเรื่องราวใหม่ สร้างบทบาทใหม่ และสำรวจโลกในแบบของคุณได้ที่นี่ — เพราะทุกเรื่อง… เริ่มจากคุณ",
        ],
      },
      ctaText: "พร้อมเริ่มผจญภัยหรืออยากส่งฟีดแบ็ก? บอกเราได้เลย",
      ctaButton: "เริ่มเล่นและเล่าให้เราฟัง",
    },
    en: {
      headerTitle: "About Us",
      headerDescription:
        "Every story starts with you. We built TaleBuilder Arena so you can pick a tale, a hero, and a path—and dive right in.",
      intro: {
        heading: "Every story starts with you",
        body: [
          "At TaleBuilder Arena, we believe everyone has imagination and every choice can change a destiny. We built a platform where you can pick a story, pick a character, and pick your path.",
          "All stories and illustrations are prepared ahead so you can click and play instantly—no downloads, no mid-journey processing waits, on both web and mobile.",
        ],
      },
      inspiration: {
        heading: "Our origin",
        body: [
          "We saw that story-driven games often hit limits with time, art resources, or accessibility. Some people have great ideas but can’t draw, or don’t have hours to wait for assets to be made.",
          "TaleBuilder Arena was created to make roleplay and choice-driven stories easy and fast to experience—no art background needed, no long waits.",
        ],
      },
      values: {
        heading: "What we offer",
        lead: "We want TaleBuilder Arena to be a cozy corner where you can rest, imagine, and experiment with new decisions.",
        bullets: [
          { title: "A library of ready-to-play tales", body: "Jump in instantly without making or waiting for content." },
          { title: "Characters & illustrations included", body: "Clear worlds, moods, and heroes from the start." },
          { title: "Choices that truly branch", body: "Every decision affects the story and endings; replays reveal new paths." },
          { title: "Easy access anywhere", body: "Play in your browser on mobile or PC—no downloads needed." },
        ],
      },
      missionVision: {
        heading: "Vision & Mission",
        missionTitle: "Mission",
        missionBody:
          "Deliver choice-driven stories that everyone can access—so players can build tales, roleplay, and use their imagination freely.",
        visionTitle: "Vision",
        visionBody:
          "Grow TaleBuilder Arena into a “living library of stories” where people worldwide play, create, and share experiences—everyone deserves to shape their own destiny.",
      },
      team: {
        heading: "Team / Who we are",
        lead:
          "We started small but dream big—people who love stories, love games, and believe imagination should belong to everyone.",
        solo:
          "TaleBuilder Arena is built and run by a solo developer under GongIdeas.com, caring for the platform, player experience, and welcoming collaborators to grow together.",
      },
      invitation: {
        heading: "Join the journey",
        body: [
          "If you have story ideas, plots, short tales, or want to help playtest, we warmly welcome you.",
          "Come craft new arcs, new roles, and explore worlds your way—because every story begins with you.",
        ],
      },
      ctaText: "Ready to play or share feedback? I’d love to hear from you.",
      ctaButton: "Start playing and tell us",
    },
  } as const;

  const text = language === "en" ? copy.en : copy.th;
  const uniquePoints = [
    { icon: <Zap className="h-5 w-5 text-primary" />, ...text.values.bullets[0] },
    { icon: <BookOpen className="h-5 w-5 text-secondary" />, ...text.values.bullets[1] },
    { icon: <GitBranch className="h-5 w-5 text-primary" />, ...text.values.bullets[2] },
    { icon: <UserPlus className="h-5 w-5 text-secondary" />, ...text.values.bullets[3] },
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

          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card mb-12">
            <CardContent className="p-8 space-y-6">
              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{text.intro.heading}</h2>
                {text.intro.body.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{text.inspiration.heading}</h2>
                {text.inspiration.body.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>

              <section className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">{text.values.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{text.values.lead}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {uniquePoints.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-4 rounded-lg border-2 border-border/60 bg-background/60 backdrop-blur-sm hover:border-accent/60 transition-all ornate-corners"
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

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">{text.missionVision.heading}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border-2 border-border/60 bg-background/60 backdrop-blur-sm ornate-corners">
                    <p className="text-foreground font-semibold mb-2">{text.missionVision.missionTitle}</p>
                    <p className="text-muted-foreground leading-relaxed">{text.missionVision.missionBody}</p>
                  </div>
                  <div className="p-4 rounded-lg border-2 border-border/60 bg-background/60 backdrop-blur-sm ornate-corners">
                    <p className="text-foreground font-semibold mb-2">{text.missionVision.visionTitle}</p>
                    <p className="text-muted-foreground leading-relaxed">{text.missionVision.visionBody}</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{text.team.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{text.team.lead}</p>
                <p className="text-muted-foreground leading-relaxed">{text.team.solo}</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{text.invitation.heading}</h2>
                {text.invitation.body.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            </CardContent>
          </Card>

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
