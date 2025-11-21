import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Lock, FileText, Database, Globe2 } from "lucide-react";

const PrivacyPolicyPage = () => {
  const principles = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      title: "ความโปร่งใส",
      description: "อธิบายข้อมูลที่เก็บ เหตุผลการใช้ และทางเลือกของคุณอย่างชัดเจน",
    },
    {
      icon: <Lock className="h-5 w-5 text-primary" />,
      title: "ความปลอดภัย",
      description: "ปกป้องข้อมูลด้วยการควบคุมการเข้าถึงและแนวทางความปลอดภัยที่เหมาะสม",
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "การใช้งานอย่างจำกัด",
      description: "ใช้ข้อมูลเพื่อให้บริการ TaleBuilder Arena และปรับปรุงประสบการณ์เท่านั้น",
    },
  ];

  const dataUsage = [
    "สร้างและจัดการเนื้อหาภายในเกม เช่น การเล่าเรื่องและตัวเลือกต่าง ๆ",
    "ปรับแต่งประสบการณ์ผู้เล่นและทำความเข้าใจการใช้งานเพื่อปรับปรุงระบบ",
    "สื่อสารอัปเดตสำคัญ แจ้งเตือนข้อผิดพลาด หรือสนับสนุนการบริการลูกค้า",
    "บังคับใช้เงื่อนไขการให้บริการและป้องกันกิจกรรมที่ไม่ปลอดภัย",
  ];

  const dataStorage = [
    "จัดเก็บข้อมูลบัญชีและสถานะเกมไว้ในโครงสร้างพื้นฐานที่มีการควบคุมการเข้าถึง",
    "ลดข้อมูลที่เก็บให้เหลือเท่าที่จำเป็นต่อการทำงานของระบบ",
    "สำรองข้อมูลเป็นระยะเพื่อป้องกันการสูญหายและตรวจสอบความผิดปกติ",
  ];

  const userChoices = [
    "อัปเดตหรือแก้ไขข้อมูลบัญชีผ่านหน้าตั้งค่าที่เกี่ยวข้อง (หากมี)",
    "ขอข้อมูลหรือการลบข้อมูลที่เกี่ยวข้องกับบัญชีของคุณผ่านช่องทางติดต่อที่ระบุ",
    "ควบคุมคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          <header className="text-center space-y-4">
            <p className="text-sm uppercase tracking-widest text-accent">นโยบายความเป็นส่วนตัว</p>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">ปกป้องข้อมูลผู้เล่นของคุณ</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              นโยบายฉบับนี้อธิบายว่า TaleBuilder Arena เก็บ ใช้ และปกป้องข้อมูลอย่างไรเมื่อคุณเล่นหรือมีปฏิสัมพันธ์กับบริการของเรา
            </p>
          </header>

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
                  <h2 className="text-2xl font-bold text-foreground">ข้อมูลที่เรารวบรวม</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  เราเก็บข้อมูลที่คุณให้ไว้โดยตรง (เช่น ชื่อผู้ใช้ อีเมล เนื้อหาที่สร้างในเกม) และข้อมูลการใช้งานอัตโนมัติ (เช่น ประเภทอุปกรณ์ การโต้ตอบภายในเกม ตัวเลือก และล็อกข้อผิดพลาด) เพื่อให้บริการทำงานได้ปกติและปลอดภัย
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">เราใช้ข้อมูลอย่างไร</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {dataUsage.map((item) => (
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
                    <h2 className="text-2xl font-bold text-foreground">การจัดเก็บและความปลอดภัย</h2>
                  </div>
                  <ul className="space-y-2 text-muted-foreground leading-relaxed">
                    {dataStorage.map((item) => (
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
                    <h2 className="text-2xl font-bold text-foreground">การแชร์ข้อมูลกับบุคคลที่สาม</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    เราอาจแชร์ข้อมูลกับผู้ให้บริการที่จำเป็นต่อการให้บริการ (เช่น โฮสต์ ฝั่งวิเคราะห์ หรือบริการส่งอีเมล) ภายใต้สัญญาที่คุ้มครองข้อมูล
                    เราจะไม่ขายข้อมูลส่วนบุคคล และจะเปิดเผยข้อมูลเมื่อกฎหมายบังคับหรือเพื่อปกป้องความปลอดภัยของผู้ใช้และระบบ
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">สิทธิ์และทางเลือกของคุณ</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {userChoices.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  โปรดทราบว่าการร้องขอลบบางอย่างอาจทำให้คุณไม่สามารถใช้งานฟีเจอร์หลักของเกมได้ หากมีคำถามเกี่ยวกับข้อมูลส่วนบุคคลของคุณ กรุณาติดต่อทีมงานตามช่องทางด้านล่าง
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">การอัปเดตนโยบาย</h2>
                <p className="text-muted-foreground leading-relaxed">
                  เราอาจปรับปรุงนโยบายนี้เพื่อสะท้อนการเปลี่ยนแปลงของบริการหรือข้อกำหนดทางกฎหมาย เวอร์ชันล่าสุดจะระบุวันที่มีผลและเผยแพร่บนหน้านี้
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">ติดต่อเรา</h2>
                <p className="text-muted-foreground leading-relaxed">
                  หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวหรือการจัดการข้อมูลของคุณ โปรดติดต่อทีม TaleBuilder Arena ผ่านอีเมลฝ่ายสนับสนุนหรือช่องทางที่ทีมงานประกาศอย่างเป็นทางการ
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
