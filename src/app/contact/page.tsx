"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
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
          <div className="mb-16">
            <PageHeader
              title="ติดต่อทีมงาน"
              description="มีบั๊ก ปัญหาในการเล่น หรืออยากให้ฟีเจอร์ใหม่ ส่งมาหาเราได้ทุกเรื่อง — ยินดีรับฟังเสมอ"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 ornate-corners border-2 border-border bg-gradient-card shadow-card">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">ชื่อของคุณ</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="เช่น ผู้กล้าแห่งอาณาจักร"
                        className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">อีเมล</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">ประเภทคำร้อง</Label>
                    <Select defaultValue="feedback">
                      <SelectTrigger className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground">
                        <SelectValue placeholder="เลือกประเภทคำร้อง" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feedback">ข้อเสนอแนะ / ฟีดแบ็ก</SelectItem>
                        <SelectItem value="issue">รายงานปัญหา / บั๊ก</SelectItem>
                        <SelectItem value="other">อื่นๆ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">เรื่อง</Label>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="เรื่องที่อยากให้เราช่วยเหลือ"
                      className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">รายละเอียด</Label>
                    <Textarea
                      name="message"
                      placeholder="เล่าให้เราฟังว่าคุณต้องการอะไรหรือพบปัญหาใด"
                      className="min-h-[150px] border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
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
                <Button asChild variant="outline" className="border-2 border-accent/50 hover:bg-accent/10">
                  <Link href="/game">ไปที่เกม</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  อีเมลนี้รองรับทั้งการแจ้งปัญหาและฟีดแบ็ก ช่วยบอกบริบทให้ละเอียดที่สุด
                </p>
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
