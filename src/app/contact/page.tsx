"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/contexts/language-context";
import { type ContactRequestType } from "@/lib/contact-repository";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";

const copy: Record<string, LocalizedText> = {
  title: {
    th: "ติดต่อทีมงาน",
    en: "Contact the team",
  },
  description: {
    th: "มีบั๊ก ปัญหาในการเล่น หรืออยากให้ฟีเจอร์ใหม่ ส่งมาหาเราได้ทุกเรื่อง — ยินดีรับฟังเสมอ",
    en: "Found a bug, stuck in a quest, or want a new feature? Tell us—we’re listening.",
  },
  name: { th: "ชื่อของคุณ", en: "Your name" },
  namePlaceholder: { th: "เช่น ผู้กล้าแห่งอาณาจักร", en: "e.g. Hero of the Realm" },
  email: { th: "อีเมล (ถ้ามี)", en: "Email (optional)" },
  emailPlaceholder: { th: "เช่น you@example.com", en: "e.g. you@example.com" },
  requestType: { th: "ประเภทคำร้อง", en: "Request type" },
  requestPlaceholder: { th: "เลือกประเภทคำร้อง", en: "Choose a request type" },
  feedback: { th: "ข้อเสนอแนะ / ฟีดแบ็ก", en: "Feedback / Suggestions" },
  issue: { th: "รายงานปัญหา / บั๊ก", en: "Issue / Bug report" },
  other: { th: "อื่นๆ", en: "Other" },
  subject: { th: "เรื่อง", en: "Subject" },
  subjectPlaceholder: { th: "เรื่องที่อยากให้เราช่วยเหลือ", en: "What do you need help with?" },
  details: { th: "รายละเอียด", en: "Details" },
  detailsPlaceholder: { th: "เล่าให้เราฟังว่าคุณต้องการอะไรหรือพบปัญหาใด", en: "Share what you need or what went wrong" },
  formNote: { th: "ส่งข้อความนี้ถึงทีมงาน เราจะตอบกลับเร็วที่สุด", en: "Send this directly to the team and we’ll reply soon." },
  submit: { th: "ส่งคำร้อง", en: "Send request" },
  submitting: { th: "กำลังส่ง...", en: "Sending..." },
  emailLabel: { th: "ให้เราไว้ติดต่อกลับ (ถ้าใส่)", en: "Add it if you want a reply" },
  sideCtaTitle: { th: "เริ่มการผจญภัยอีกครั้ง", en: "Jump back into adventure" },
  sideCtaDescription: { th: "กลับสู่เกมแล้วบอกเราว่าประสบการณ์เป็นอย่างไร", en: "Return to the game and tell us how it feels." },
  sideButton: { th: "ไปที่เกม", en: "Go to game" },
  sideFootnote: {
    th: "อีเมลนี้รองรับทั้งการแจ้งปัญหาและฟีดแบ็ก ช่วยบอกบริบทให้ละเอียดที่สุด",
    en: "This inbox handles issues and feedback—please share as much context as you can.",
  },
  successTitle: { th: "รับข้อความแล้ว", en: "Message received" },
  successDescription: { th: "เราบันทึกคำร้องและจะติดต่อกลับเร็วๆ นี้", en: "We saved your request and will get back to you soon." },
  errorTitle: { th: "ส่งไม่สำเร็จ", en: "Unable to send" },
  errorDescription: { th: "กรุณาลองใหม่อีกครั้งหรือติดต่อผ่านอีเมล", en: "Please try again or email us directly." },
  spamNotice: { th: "เรามีตัวกรองสแปมและบอตอัตโนมัติ", en: "We automatically filter spam and bot submissions." },
};

const ContactPage = () => {
  const { language } = useLanguage();
  const [requestType, setRequestType] = useState<ContactRequestType>("feedback");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formStart, setFormStart] = useState<number | null>(null);

  useEffect(() => {
    setFormStart(performance.now());
  }, []);

  const t = <K extends keyof typeof copy>(key: K) => getLocalizedText(copy[key], language);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: (formData.get("name") ?? "").toString().trim(),
      email: (formData.get("email") ?? "").toString().trim(),
      subject: (formData.get("subject") ?? "").toString().trim(),
      message: (formData.get("message") ?? "").toString().trim(),
      requestType,
      locale: language,
      durationMs: formStart ? Math.max(0, Math.round(performance.now() - formStart)) : undefined,
      honeypot: (formData.get("website") ?? "").toString(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        throw new Error(result?.error ?? "Request failed");
      }

      setStatus("success");
      toast.success(t("successTitle"), { description: t("successDescription") });
      form.reset();
      setRequestType("feedback");
      setFormStart(performance.now());
    } catch (error) {
      console.error("Failed to submit contact form", error);
      setStatus("error");
      setErrorMessage(t("errorDescription"));
      toast.error(t("errorTitle"), { description: t("errorDescription") });
    } finally {
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16">
            <PageHeader
              title={t("title")}
              description={t("description")}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 ornate-corners border-2 border-border bg-gradient-card shadow-card">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">{t("name")}</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder={t("namePlaceholder")}
                        className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">{t("email")}</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder={t("emailPlaceholder")}
                        className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="hidden">
                    <Label htmlFor="website" className="sr-only">Website</Label>
                    <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">{t("requestType")}</Label>
                    <Select value={requestType} onValueChange={(value) => setRequestType(value as ContactRequestType)}>
                      <SelectTrigger className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground">
                        <SelectValue placeholder={t("requestPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feedback">{t("feedback")}</SelectItem>
                        <SelectItem value="issue">{t("issue")}</SelectItem>
                        <SelectItem value="other">{t("other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">{t("subject")}</Label>
                    <Input
                      type="text"
                      name="subject"
                      placeholder={t("subjectPlaceholder")}
                      className="h-12 border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground uppercase tracking-wide">{t("details")}</Label>
                    <Textarea
                      name="message"
                      placeholder={t("detailsPlaceholder")}
                      className="min-h-[150px] border-2 border-border/70 bg-background/70 backdrop-blur-sm text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{t("formNote")}</p>
                      <p className="text-xs text-muted-foreground">{t("spamNotice")}</p>
                      {errorMessage ? (
                        <p className="text-xs text-destructive">{errorMessage}</p>
                      ) : null}
                    </div>
                    <Button
                      type="submit"
                      className="bg-gradient-primary hover:shadow-glow-orange text-primary-foreground"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? t("submitting") : t("submit")}
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
                      <p className="text-sm text-muted-foreground">{t("emailLabel")}</p>
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
                <h3 className="text-xl font-bold text-foreground mb-2">{t("sideCtaTitle")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("sideCtaDescription")}</p>
                <Button asChild variant="outline" className="border-2 border-accent/50 hover:bg-accent/10">
                  <Link href="/game">{t("sideButton")}</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  {t("sideFootnote")}
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
