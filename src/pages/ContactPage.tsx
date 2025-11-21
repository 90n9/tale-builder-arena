import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">ติดต่อทีมงาน</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              คำถาม ข้อเสนอแนะ หรือรายงานปัญหา — ยินดีรับฟังทุกเรื่องราวจากคุณ
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 ornate-corners border-2 border-border bg-gradient-card shadow-card">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wide">ชื่อของคุณ</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="เช่น ผู้กล้าแห่งอาณาจักร"
                        className="w-full rounded-md border-2 border-border bg-background/60 px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wide">อีเมล</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="w-full rounded-md border-2 border-border bg-background/60 px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground uppercase tracking-wide">ประเภทคำร้อง</label>
                    <select
                      name="topic"
                      className="w-full rounded-md border-2 border-border bg-background/60 px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                      defaultValue="feedback"
                    >
                      <option value="feedback">ข้อเสนอแนะ / ฟีดแบ็ก</option>
                      <option value="issue">รายงานปัญหา / บั๊ก</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground uppercase tracking-wide">เรื่อง</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="เรื่องที่อยากให้เราช่วยเหลือ"
                      className="w-full rounded-md border-2 border-border bg-background/60 px-4 py-3 text-foreground focus:border-accent focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground uppercase tracking-wide">รายละเอียด</label>
                    <textarea
                      name="message"
                      placeholder="เล่าให้เราฟังว่าคุณต้องการอะไรหรือพบปัญหาใด"
                      className="w-full rounded-md border-2 border-border bg-background/60 px-4 py-3 text-foreground focus:border-accent focus:outline-none min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <p className="text-sm text-muted-foreground">
                      แบบฟอร์มนี้ใช้สำหรับจัดรูปแบบข้อความ โปรดคัดลอกแล้วส่งไปที่อีเมลด้านขวา
                    </p>
                    <Button type="submit" className="bg-gradient-primary hover:shadow-glow-orange text-primary-foreground">
                      เตรียมข้อความ
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2 border-border bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-accent/10 border border-accent/40">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">อีเมล</p>
                      <a
                        href="mailto:contact@gongideas.com"
                        className="text-foreground font-semibold hover:text-accent transition-colors"
                      >
                        contact@gongideas.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center lg:text-left bg-gradient-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">เริ่มการผจญภัยอีกครั้ง</h3>
                <p className="text-sm text-muted-foreground mb-4">กลับสู่เกมแล้วบอกเราว่าประสบการณ์เป็นอย่างไร</p>
                <Link to="/game">
                  <Button variant="outline" className="border-2 border-accent/50 hover:bg-accent/10">
                    ไปที่เกม
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
