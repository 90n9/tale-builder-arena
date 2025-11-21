"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Scale, ScrollText, Shield, Trophy, Ban } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const TermsOfUsePage = () => {
  const { language } = useLanguage();
  const copy = {
    th: {
      eyebrow: "เงื่อนไขการให้บริการ",
      title: "ใช้ TaleBuilder Arena อย่างมั่นใจ",
      description: "โปรดอ่านเงื่อนไขต่อไปนี้เพื่อเข้าใจสิทธิ์และความรับผิดชอบของคุณเมื่อเล่นและมีปฏิสัมพันธ์กับบริการของเรา",
      commitments: [
        { title: "การยอมรับเงื่อนไข", description: "การเข้าใช้เกมถือว่าคุณยอมรับเงื่อนไขทั้งหมดและข้อตกลงที่เกี่ยวข้อง" },
        { title: "การอัปเดตเงื่อนไข", description: "เราอาจปรับปรุงเงื่อนไขและจะแจ้งเวอร์ชันล่าสุดไว้ที่หน้านี้" },
        { title: "ความปลอดภัย", description: "คุณจะไม่ทำสิ่งที่คุกคามความปลอดภัยหรือความสมบูรณ์ของระบบ" },
      ],
      accountHeading: "บัญชีและการใช้งาน",
      accountBody:
        "คุณต้องมีอายุถึงเกณฑ์ตามกฎหมายในพื้นที่อาศัยเพื่อเข้าใช้บริการ บัญชี TaleBuilder Arena (ถ้ามี) ต้องใช้ข้อมูลที่ถูกต้องและรักษาความลับของข้อมูลเข้าสู่ระบบ คุณรับผิดชอบต่อกิจกรรมที่เกิดขึ้นภายใต้บัญชีของคุณและควรแจ้งให้เราทราบหากพบการใช้งานที่ไม่ได้รับอนุญาต",
      conductHeading: "การปฏิบัติตัวที่เหมาะสม",
      conductRules: [
        "ไม่ใช้บอท สคริปต์ หรือวิธีอัตโนมัติที่ทำให้ประสบการณ์เสียหาย",
        "ไม่เผยแพร่เนื้อหาที่ผิดกฎหมาย ก่อให้เกิดความเกลียดชัง หรือเป็นอันตรายต่อผู้อื่น",
        "ไม่พยายามเจาะระบบ ขัดขวางบริการ หรือเข้าถึงข้อมูลที่ไม่ได้รับอนุญาต",
        "ไม่แอบอ้างเป็นผู้อื่นหรือทำให้เข้าใจผิดว่าเกี่ยวข้องกับทีมพัฒนา",
      ],
      ownershipHeading: "สิทธิ์ในเนื้อหาและทรัพย์สินทางปัญญา",
      ownershipPoints: [
        "สิทธิในเครื่องหมายการค้า โลโก้ และองค์ประกอบแบรนด์ยังคงเป็นของทีม TaleBuilder Arena",
        "เนื้อหาที่สร้างโดย AI ภายในเกมมีไว้สำหรับการใช้งานส่วนบุคคลในเกมและเป็นส่วนหนึ่งของประสบการณ์",
        "คุณรับรองว่าคุณมีสิทธิ์ในเนื้อหาที่ส่งหรืออัปโหลด และอนุญาตให้เราประมวลผลเพื่อให้บริการ",
      ],
      liabilityHeading: "ข้อจำกัดความรับผิด",
      liabilityBody:
        "TaleBuilder Arena จัดให้บริการตามสภาพที่มีอยู่โดยไม่รับประกันว่าปราศจากข้อผิดพลาด เกมนี้เป็นโปรเจกต์ทดลอง เนื้อหาที่สร้างด้วย AI อาจคาดเดาไม่ได้ เราไม่รับผิดชอบต่อความเสียหายทางอ้อม สูญเสียข้อมูล หรือผลกระทบที่เกิดจากการเข้าใช้บริการ เว้นแต่กฎหมายบังคับ",
      terminationHeading: "การยุติและการระงับการใช้งาน",
      terminationTerms: [
        "เราสามารถระงับหรือยุติการเข้าถึงได้ หากพบการละเมิดเงื่อนไขหรือมีความเสี่ยงต่อระบบและผู้ใช้",
        "คุณสามารถหยุดใช้บริการได้ทุกเมื่อ การลบบัญชีอาจทำให้ข้อมูลที่เกี่ยวข้องบางส่วนถูกลบอย่างถาวร",
        "บางข้อกำหนด (เช่น เรื่องทรัพย์สินทางปัญญา การจำกัดความรับผิด) ยังคงมีผลแม้หยุดใช้งาน",
      ],
      lawHeading: "กฎหมายที่ใช้บังคับ",
      lawBody:
        "เงื่อนไขนี้อยู่ภายใต้กฎหมายที่ทีมงานดำเนินการอยู่ การโต้แย้งหรือข้อพิพาทที่เกิดขึ้นจะพิจารณาตามกฎหมายดังกล่าว เว้นแต่กฎหมายท้องถิ่นของคุณจะกำหนดไว้เป็นอย่างอื่น",
      contactHeading: "ติดต่อทีมงาน",
      contactBody:
        "หากต้องการสอบถามเกี่ยวกับเงื่อนไขการให้บริการหรือรายงานการละเมิด โปรดติดต่อทีม TaleBuilder Arena ผ่านอีเมลฝ่ายสนับสนุนหรือช่องทางสื่อสารที่ประกาศอย่างเป็นทางการ",
    },
    en: {
      eyebrow: "Terms of Use",
      title: "Use TaleBuilder Arena with confidence",
      description:
        "Read these terms to understand your rights and responsibilities when playing and interacting with our service.",
      commitments: [
        { title: "Acceptance of terms", description: "Using the game means you accept all terms and related agreements." },
        { title: "Term updates", description: "We may update these terms and will post the latest version on this page." },
        { title: "Security", description: "Do not take actions that threaten the security or integrity of the system." },
      ],
      accountHeading: "Accounts and use",
      accountBody:
        "You must meet the legal age in your region to access the service. Any TaleBuilder Arena account (if available) must use accurate information and keep credentials secure. You are responsible for activity under your account and should notify us if you suspect unauthorized use.",
      conductHeading: "Appropriate conduct",
      conductRules: [
        "Do not use bots, scripts, or automation that harms the experience.",
        "Do not share illegal, hateful, or harmful content.",
        "Do not attempt to breach, disrupt, or access unauthorized data.",
        "Do not impersonate others or misrepresent affiliation with the team.",
      ],
      ownershipHeading: "Content and IP rights",
      ownershipPoints: [
        "Trademarks, logos, and brand elements remain the property of the TaleBuilder Arena team.",
        "AI-generated in-game content is for personal in-game use and part of the experience.",
        "You confirm you have rights to submitted or uploaded content and allow us to process it to provide the service.",
      ],
      liabilityHeading: "Limitation of liability",
      liabilityBody:
        "TaleBuilder Arena is provided as-is without guarantees of being error-free. This is an experimental project and AI-generated content can be unpredictable. We are not liable for indirect damages, data loss, or impact from using the service unless required by law.",
      terminationHeading: "Suspension and termination",
      terminationTerms: [
        "We may suspend or terminate access if terms are violated or if system/user safety is at risk.",
        "You may stop using the service at any time; deleting an account may permanently remove related data.",
        "Some provisions (such as IP ownership and liability limits) survive termination.",
      ],
      lawHeading: "Governing law",
      lawBody:
        "These terms are governed by the laws where the team operates; disputes follow those laws unless your local laws require otherwise.",
      contactHeading: "Contact the team",
      contactBody:
        "For questions about the terms or to report violations, contact the TaleBuilder Arena team via support email or official channels.",
    },
  } as const;

  const text = language === "en" ? copy.en : copy.th;

  const commitments = [
    { icon: <Scale className="h-5 w-5 text-primary" />, ...text.commitments[0] },
    { icon: <ScrollText className="h-5 w-5 text-primary" />, ...text.commitments[1] },
    { icon: <Shield className="h-5 w-5 text-primary" />, ...text.commitments[2] },
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
              icon={<Scale className="h-11 w-11" />}
            />
          </div>

          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
            <CardContent className="p-8 space-y-10">
              <section className="grid md:grid-cols-3 gap-6">
                {commitments.map((item) => (
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
                  <Trophy className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.accountHeading}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {text.accountBody}
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Ban className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.conductHeading}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {text.conductRules.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <ScrollText className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.ownershipHeading}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {text.ownershipPoints.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.liabilityHeading}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {text.liabilityBody}
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{text.terminationHeading}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {text.terminationTerms.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{text.lawHeading}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {text.lawBody}
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

export default TermsOfUsePage;
