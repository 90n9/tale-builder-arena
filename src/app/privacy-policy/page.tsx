"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { ShieldCheck, Lock, FileText, Database, Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();
  const copy = {
    th: {
      eyebrow: "นโยบายความเป็นส่วนตัว",
      title: "ปกป้องข้อมูลผู้เล่นของคุณ",
      description: "นโยบายฉบับนี้อธิบายว่า TaleBuilder Arena เก็บ ใช้ และปกป้องข้อมูลอย่างไรเมื่อคุณเล่นหรือมีปฏิสัมพันธ์กับบริการของเรา",
      principles: [
        { title: "ความโปร่งใส", description: "อธิบายข้อมูลที่เก็บ เหตุผลการใช้ และทางเลือกของคุณอย่างชัดเจน" },
        { title: "ความปลอดภัย", description: "ปกป้องข้อมูลด้วยการควบคุมการเข้าถึงและแนวทางความปลอดภัยที่เหมาะสม" },
        { title: "การใช้งานอย่างจำกัด", description: "ใช้ข้อมูลเพื่อให้บริการ TaleBuilder Arena และปรับปรุงประสบการณ์เท่านั้น" },
      ],
      collectedHeading: "ข้อมูลที่เรารวบรวม",
      collectedBody:
        "เราเก็บข้อมูลที่คุณให้ไว้โดยตรง (เช่น ชื่อผู้ใช้ อีเมล เนื้อหาที่สร้างในเกม) และข้อมูลการใช้งานอัตโนมัติ (เช่น ประเภทอุปกรณ์ การโต้ตอบภายในเกม ตัวเลือก และล็อกข้อผิดพลาด) เพื่อให้บริการทำงานได้ปกติและปลอดภัย",
      usageHeading: "เราใช้ข้อมูลอย่างไร",
      dataUsage: [
        "สร้างและจัดการเนื้อหาภายในเกม เช่น การเล่าเรื่องและตัวเลือกต่าง ๆ",
        "ปรับแต่งประสบการณ์ผู้เล่นและทำความเข้าใจการใช้งานเพื่อปรับปรุงระบบ",
        "สื่อสารอัปเดตสำคัญ แจ้งเตือนข้อผิดพลาด หรือสนับสนุนการบริการลูกค้า",
        "บังคับใช้เงื่อนไขการให้บริการและป้องกันกิจกรรมที่ไม่ปลอดภัย",
      ],
      storageHeading: "การจัดเก็บและความปลอดภัย",
      dataStorage: [
        "จัดเก็บข้อมูลบัญชีและสถานะเกมไว้ในโครงสร้างพื้นฐานที่มีการควบคุมการเข้าถึง",
        "ลดข้อมูลที่เก็บให้เหลือเท่าที่จำเป็นต่อการทำงานของระบบ",
        "สำรองข้อมูลเป็นระยะเพื่อป้องกันการสูญหายและตรวจสอบความผิดปกติ",
      ],
      sharingHeading: "การแชร์ข้อมูลกับบุคคลที่สาม",
      sharingBody:
        "เราอาจแชร์ข้อมูลกับผู้ให้บริการที่จำเป็นต่อการให้บริการ (เช่น โฮสต์ ฝั่งวิเคราะห์ หรือบริการส่งอีเมล) ภายใต้สัญญาที่คุ้มครองข้อมูล เราจะไม่ขายข้อมูลส่วนบุคคล และจะเปิดเผยข้อมูลเมื่อกฎหมายบังคับหรือเพื่อปกป้องความปลอดภัยของผู้ใช้และระบบ",
      rightsHeading: "สิทธิ์และทางเลือกของคุณ",
      userChoices: [
        "อัปเดตหรือแก้ไขข้อมูลบัญชีผ่านหน้าตั้งค่าที่เกี่ยวข้อง (หากมี)",
        "ขอข้อมูลหรือการลบข้อมูลที่เกี่ยวข้องกับบัญชีของคุณผ่านช่องทางติดต่อที่ระบุ",
        "ควบคุมคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ",
      ],
      rightsBody:
        "โปรดทราบว่าการร้องขอลบบางอย่างอาจทำให้คุณไม่สามารถใช้งานฟีเจอร์หลักของเกมได้ หากมีคำถามเกี่ยวกับข้อมูลส่วนบุคคลของคุณ กรุณาติดต่อทีมงานตามช่องทางด้านล่าง",
      updatesHeading: "การอัปเดตนโยบาย",
      updatesBody:
        "เราอาจปรับปรุงนโยบายนี้เพื่อสะท้อนการเปลี่ยนแปลงของบริการหรือข้อกำหนดทางกฎหมาย เวอร์ชันล่าสุดจะระบุวันที่มีผลและเผยแพร่บนหน้านี้",
      contactHeading: "ติดต่อเรา",
      contactBody:
        "หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวหรือการจัดการข้อมูลของคุณ โปรดติดต่อทีม TaleBuilder Arena ผ่านอีเมลฝ่ายสนับสนุนหรือช่องทางที่ทีมงานประกาศอย่างเป็นทางการ",
    },
    en: {
      eyebrow: "Privacy Policy",
      title: "Protecting your player data",
      description:
        "This policy explains how TaleBuilder Arena collects, uses, and safeguards data when you play or interact with our service.",
      principles: [
        { title: "Transparency", description: "Clearly explain what we collect, why we use it, and your choices." },
        { title: "Security", description: "Protect data with appropriate access controls and safeguards." },
        { title: "Limited use", description: "Use data only to operate TaleBuilder Arena and improve the experience." },
      ],
      collectedHeading: "Data we collect",
      collectedBody:
        "We collect data you provide directly (e.g., username, email, in-game content) and automatic usage data (e.g., device type, in-game interactions, choices, error logs) to keep the service functional and safe.",
      usageHeading: "How we use data",
      dataUsage: [
        "Generate and manage in-game content, such as stories and choices.",
        "Personalize the player experience and understand usage to improve the system.",
        "Communicate important updates, surface errors, or support customer service.",
        "Enforce terms of use and prevent unsafe activity.",
      ],
      storageHeading: "Storage and security",
      dataStorage: [
        "Store account data and game state in infrastructure with controlled access.",
        "Minimize collected data to only what the system needs.",
        "Back up data periodically to prevent loss and monitor anomalies.",
      ],
      sharingHeading: "Sharing with third parties",
      sharingBody:
        "We may share data with providers essential to the service (e.g., hosting, analytics, email) under protective agreements. We do not sell personal data and only disclose it when legally required or to protect user and system safety.",
      rightsHeading: "Your rights and choices",
      userChoices: [
        "Update or correct account details through relevant settings (if available).",
        "Request your data or deletion via the contact channels provided.",
        "Control cookies through your browser settings.",
      ],
      rightsBody:
        "Some deletion requests may limit your ability to use core features. If you have questions about your personal data, contact the team using the details below.",
      updatesHeading: "Policy updates",
      updatesBody:
        "We may update this policy to reflect service changes or legal requirements. The latest version will note its effective date and be posted here.",
      contactHeading: "Contact us",
      contactBody:
        "If you have questions about this policy or how your data is handled, reach out to the TaleBuilder Arena team via support email or official communication channels.",
    },
  } as const;

  const text = language === "en" ? copy.en : copy.th;
  const principles = [
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, ...text.principles[0] },
    { icon: <Lock className="h-5 w-5 text-primary" />, ...text.principles[1] },
    { icon: <FileText className="h-5 w-5 text-primary" />, ...text.principles[2] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="mb-6">
            <PageHeader
              eyebrow={text.eyebrow}
              title={text.title}
              description={text.description}
              icon={<ShieldCheck className="h-11 w-11" />}
            />
          </div>

          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
            <CardContent className="p-8 space-y-10">
              <section className="grid md:grid-cols-3 gap-6">
                {principles.map((item) => (
                  <div key={item.title} className="p-4 rounded-lg bg-muted/50 border border-border/60">
                    <div className="flex items-center gap-2 mb-3">
                      {item.icon}
                      <h2 className="font-semibold text-foreground">{item.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.collectedHeading}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {text.collectedBody}
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.usageHeading}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {text.dataUsage.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">{text.storageHeading}</h2>
                  </div>
                  <ul className="space-y-2 text-muted-foreground leading-relaxed">
                    {text.dataStorage.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe2 className="h-5 w-5 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">{text.sharingHeading}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {text.sharingBody}
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.rightsHeading}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {text.userChoices.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  {text.rightsBody}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{text.updatesHeading}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {text.updatesBody}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{text.contactHeading}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {text.contactBody}
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

export default PrivacyPolicyPage;
