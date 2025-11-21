import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, ScrollText, Shield, Trophy, Ban } from "lucide-react";

const TermsOfUsePage = () => {
  const commitments = [
    {
      icon: <Scale className="h-5 w-5 text-primary" />,
      title: "การยอมรับเงื่อนไข",
      description: "การเข้าใช้เกมถือว่าคุณยอมรับเงื่อนไขทั้งหมดและข้อตกลงที่เกี่ยวข้อง",
    },
    {
      icon: <ScrollText className="h-5 w-5 text-primary" />,
      title: "การอัปเดตเงื่อนไข",
      description: "เราอาจปรับปรุงเงื่อนไขและจะแจ้งเวอร์ชันล่าสุดไว้ที่หน้านี้",
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "ความปลอดภัย",
      description: "คุณจะไม่ทำสิ่งที่คุกคามความปลอดภัยหรือความสมบูรณ์ของระบบ",
    },
  ];

  const conductRules = [
    "ไม่ใช้บอท สคริปต์ หรือวิธีอัตโนมัติที่ทำให้ประสบการณ์เสียหาย",
    "ไม่เผยแพร่เนื้อหาที่ผิดกฎหมาย ก่อให้เกิดความเกลียดชัง หรือเป็นอันตรายต่อผู้อื่น",
    "ไม่พยายามเจาะระบบ ขัดขวางบริการ หรือเข้าถึงข้อมูลที่ไม่ได้รับอนุญาต",
    "ไม่แอบอ้างเป็นผู้อื่นหรือทำให้เข้าใจผิดว่าเกี่ยวข้องกับทีมพัฒนา",
  ];

  const ownershipPoints = [
    "สิทธิในเครื่องหมายการค้า โลโก้ และองค์ประกอบแบรนด์ยังคงเป็นของทีม TaleBuilder Arena",
    "เนื้อหาที่สร้างโดย AI ภายในเกมมีไว้สำหรับการใช้งานส่วนบุคคลในเกมและเป็นส่วนหนึ่งของประสบการณ์",
    "คุณรับรองว่าคุณมีสิทธิ์ในเนื้อหาที่ส่งหรืออัปโหลด และอนุญาตให้เราประมวลผลเพื่อให้บริการ",
  ];

  const terminationTerms = [
    "เราสามารถระงับหรือยุติการเข้าถึงได้ หากพบการละเมิดเงื่อนไขหรือมีความเสี่ยงต่อระบบและผู้ใช้",
    "คุณสามารถหยุดใช้บริการได้ทุกเมื่อ การลบบัญชีอาจทำให้ข้อมูลที่เกี่ยวข้องบางส่วนถูกลบอย่างถาวร",
    "บางข้อกำหนด (เช่น เรื่องทรัพย์สินทางปัญญา การจำกัดความรับผิด) ยังคงมีผลแม้หยุดใช้งาน",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          <header className="text-center space-y-4">
            <p className="text-sm uppercase tracking-widest text-accent">เงื่อนไขการให้บริการ</p>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">ใช้ TaleBuilder Arena อย่างมั่นใจ</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              โปรดอ่านเงื่อนไขต่อไปนี้เพื่อเข้าใจสิทธิ์และความรับผิดชอบของคุณเมื่อเล่นและมีปฏิสัมพันธ์กับบริการของเรา
            </p>
          </header>

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
                  <h2 className="text-2xl font-bold text-foreground">บัญชีและการใช้งาน</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  คุณต้องมีอายุถึงเกณฑ์ตามกฎหมายในพื้นที่อาศัยเพื่อเข้าใช้บริการ บัญชี TaleBuilder Arena (ถ้ามี) ต้องใช้ข้อมูลที่ถูกต้องและรักษาความลับของข้อมูลเข้าสู่ระบบ
                  คุณรับผิดชอบต่อกิจกรรมที่เกิดขึ้นภายใต้บัญชีของคุณและควรแจ้งให้เราทราบหากพบการใช้งานที่ไม่ได้รับอนุญาต
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Ban className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">การปฏิบัติตัวที่เหมาะสม</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {conductRules.map((item) => (
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
                  <h2 className="text-2xl font-bold text-foreground">สิทธิ์ในเนื้อหาและทรัพย์สินทางปัญญา</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {ownershipPoints.map((item) => (
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
                  <h2 className="text-2xl font-bold text-foreground">ข้อจำกัดความรับผิด</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  TaleBuilder Arena จัดให้บริการตามสภาพที่มีอยู่โดยไม่รับประกันว่าปราศจากข้อผิดพลาด เกมนี้เป็นโปรเจกต์ทดลอง เนื้อหาที่สร้างด้วย AI อาจคาดเดาไม่ได้
                  เราไม่รับผิดชอบต่อความเสียหายทางอ้อม สูญเสียข้อมูล หรือผลกระทบที่เกิดจากการเข้าใช้บริการ เว้นแต่กฎหมายบังคับ
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">การยุติและการระงับการใช้งาน</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  {terminationTerms.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">กฎหมายที่ใช้บังคับ</h2>
                <p className="text-muted-foreground leading-relaxed">
                  เงื่อนไขนี้อยู่ภายใต้กฎหมายที่ทีมงานดำเนินการอยู่ การโต้แย้งหรือข้อพิพาทที่เกิดขึ้นจะพิจารณาตามกฎหมายดังกล่าว เว้นแต่กฎหมายท้องถิ่นของคุณจะกำหนดไว้เป็นอย่างอื่น
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">ติดต่อทีมงาน</h2>
                <p className="text-muted-foreground leading-relaxed">
                  หากต้องการสอบถามเกี่ยวกับเงื่อนไขการให้บริการหรือรายงานการละเมิด โปรดติดต่อทีม TaleBuilder Arena ผ่านอีเมลฝ่ายสนับสนุนหรือช่องทางสื่อสารที่ประกาศอย่างเป็นทางการ
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
