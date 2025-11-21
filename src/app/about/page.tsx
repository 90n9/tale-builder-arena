import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cpu, Sparkles, Book, Heart } from "lucide-react";

const AboutPage = () => {
  const techStack = [
    { icon: <Cpu className="h-5 w-5" />, label: "โมเดลภาษาปัญญาประดิษฐ์" },
    { icon: <Sparkles className="h-5 w-5" />, label: "การเล่าเรื่องแบบไดนามิก" },
    { icon: <Book className="h-5 w-5" />, label: "การสร้างเนื้อหาแบบสุ่มตามขั้นตอน" },
    { icon: <Heart className="h-5 w-5" />, label: "ระบบตัวเลือกผู้เล่น" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                เกี่ยวกับ TaleBuilder Arena
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              เกมเล่าเรื่องเชิงทดลองที่ผสานเวทมนตร์ของเกมกระดาน RPG เข้ากับพลังของปัญญาประดิษฐ์
            </p>
          </div>

          {/* Main Content */}
          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card mb-12">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">TaleBuilder Arena คืออะไร?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TaleBuilder Arena คือเกมผจญภัยเชิงข้อความที่ขับเคลื่อนด้วย AI ทำหน้าที่เป็น Dungeon Master ประจำตัวคุณ 
                  ไม่เหมือนเกมทั่วไปที่มีเนื้อเรื่องตายตัว TaleBuilder Arena สร้างเรื่องราวใหม่แบบเรียลไทม์ 
                  ปรับตามการเลือกของคุณและสร้างการผจญภัยที่ไม่เหมือนใครทุกครั้งที่เล่น
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">สร้างขึ้นอย่างไร</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  โปรเจกต์นี้ใช้เทคโนโลยีล้ำสมัยเพื่อสร้างประสบการณ์เล่าเรื่องที่ชวนดื่มด่ำ:
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
                <h2 className="text-2xl font-bold text-foreground mb-4">ประสบการณ์ที่คุณจะได้รับ</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">เนื้อเรื่องพลิกแพลง:</strong> ทุกการเล่นจะเล่าเรื่องไม่ซ้ำตามการตัดสินใจของคุณ
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">ภาพชวนดื่มด่ำ:</strong> งานภาพที่สร้างด้วย AI ทำให้ทุกฉากมีชีวิต
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">พัฒนาตัวละคร:</strong> ติดตามค่าสถานะ ช่องเก็บของ และภารกิจระหว่างการผจญภัย
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">ทางเลือกมีความหมาย:</strong> การตัดสินใจของคุณกำหนดทั้งเนื้อเรื่องและโลกในเกม
                    </span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">เป้าหมายของโปรเจกต์</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TaleBuilder Arena คือการทดลองว่า AI จะยกระดับการเล่าเรื่องแบบอินเทอร์แอคทีฟได้อย่างไร 
                  เรากำลังมองหาวิธีให้เนื้อเรื่องตอบสนอง เป็นส่วนตัว และดึงดูดใจมากขึ้น 
                  โปรเจกต์สร้างสรรค์นี้ต้องการผลักดันขอบเขตของสิ่งที่เป็นไปได้เมื่อความคิดสร้างสรรค์ของมนุษย์ผสานกับ AI
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">ข้อควรทราบ</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    • โปรเจกต์นี้ยังอยู่ในขั้นทดลอง อาจมีพฤติกรรมหรือเนื้อหาที่คาดไม่ถึง
                  </p>
                  <p>
                    • เนื้อหาที่สร้างด้วย AI คาดเดาไม่ได้เสมอ และคุณภาพอาจแตกต่างกัน
                  </p>
                  <p>
                    • สถานะเกมและความคืบหน้าอาจยังไม่ถูกบันทึกข้ามรอบการเล่น
                  </p>
                  <p>
                    • โปรเจกต์นี้มีไว้เพื่อการศึกษาและความบันเทิงเท่านั้น
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              พร้อมสัมผัสมนตร์เสน่ห์ของการเล่าเรื่องด้วย AI แล้วหรือยัง?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary hover:shadow-glow-orange transition-all text-base font-semibold"
            >
              <Link href="/game">กลับสู่การผจญภัย</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
