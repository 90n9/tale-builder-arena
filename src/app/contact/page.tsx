'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language-context';
import { type ContactRequestType } from '@/server/ports/contact-repository';
import { getLocalizedText, type LocalizedText } from '@/lib/i18n';
import { trackInteraction } from '@/lib/analytics';
import { SecondaryActionButton } from '@/components/ActionButtons';
import { contactContent } from '@/data/contact-content';

const ContactPage = () => {
  const { language } = useLanguage();
  const [requestType, setRequestType] = useState<ContactRequestType>('feedback');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formStart, setFormStart] = useState<number | null>(null);

  useEffect(() => {
    setFormStart(performance.now());
  }, []);

  const t = <K extends keyof typeof contactContent>(key: K) =>
    getLocalizedText(contactContent[key], language);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: (formData.get('name') ?? '').toString().trim(),
      email: (formData.get('email') ?? '').toString().trim(),
      subject: (formData.get('subject') ?? '').toString().trim(),
      message: (formData.get('message') ?? '').toString().trim(),
      requestType,
      locale: language,
      durationMs: formStart ? Math.max(0, Math.round(performance.now() - formStart)) : undefined,
      honeypot: (formData.get('website') ?? '').toString(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result?.error) {
        throw new Error(result?.error ?? 'Request failed');
      }

      setStatus('success');
      toast.success(t('successTitle'), { description: t('successDescription') });
      form.reset();
      setRequestType('feedback');
      setFormStart(performance.now());
      trackInteraction({
        action: 'contact-submit',
        category: 'contact',
        label: requestType,
        params: {
          has_email: Boolean(payload.email),
          has_message: Boolean(payload.message),
          request_type: requestType,
          language,
          duration_ms: payload.durationMs,
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Failed to submit contact form', error);
      }
      setStatus('error');
      setErrorMessage(t('errorDescription'));
      toast.error(t('errorTitle'), { description: t('errorDescription') });
      trackInteraction({
        action: 'contact-fail',
        category: 'contact',
        label: requestType,
        params: { language, request_type: requestType, error_reason: 'submit_failed' },
      });
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16">
            <PageHeader title={t('title')} description={t('description')} />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card lg:col-span-2">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-semibold uppercase tracking-wide text-foreground"
                      >
                        {t('name')}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder={t('namePlaceholder')}
                        className="h-12 border-2 border-border/70 bg-background/70 text-base text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus-visible:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold uppercase tracking-wide text-foreground"
                      >
                        {t('email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder={t('emailPlaceholder')}
                        className="h-12 border-2 border-border/70 bg-background/70 text-base text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus-visible:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="hidden">
                    <Label htmlFor="website" className="sr-only">
                      Website
                    </Label>
                    <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="requestType"
                      className="text-sm font-semibold uppercase tracking-wide text-foreground"
                    >
                      {t('requestType')}
                    </Label>
                    <Select
                      value={requestType}
                      onValueChange={(value) => setRequestType(value as ContactRequestType)}
                    >
                      <SelectTrigger
                        id="requestType"
                        className="h-12 border-2 border-border/70 bg-background/70 text-base text-foreground backdrop-blur-sm"
                      >
                        <SelectValue placeholder={t('requestPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feedback">{t('feedback')}</SelectItem>
                        <SelectItem value="issue">{t('issue')}</SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-sm font-semibold uppercase tracking-wide text-foreground"
                    >
                      {t('subject')}
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder={t('subjectPlaceholder')}
                      className="h-12 border-2 border-border/70 bg-background/70 text-base text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-semibold uppercase tracking-wide text-foreground"
                    >
                      {t('details')}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t('detailsPlaceholder')}
                      className="min-h-[150px] border-2 border-border/70 bg-background/70 text-base text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{t('formNote')}</p>
                      <p className="text-xs text-muted-foreground">{t('spamNotice')}</p>
                      {errorMessage ? (
                        <p className="text-xs text-destructive">{errorMessage}</p>
                      ) : null}
                    </div>
                    <Button
                      type="submit"
                      className="bg-gradient-primary text-primary-foreground hover:shadow-glow-orange"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? t('submitting') : t('submit')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2 border-border bg-card/80 backdrop-blur-sm">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-accent/40 bg-accent/10 p-3">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('emailLabel')}</p>
                      <a
                        href="mailto:contact@gongideas.com"
                        className="font-semibold text-foreground transition-colors hover:text-accent"
                      >
                        contact@gongideas.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border border-border bg-gradient-card p-6 text-center lg:text-left">
                <h3 className="mb-2 text-xl font-bold text-foreground">{t('sideCtaTitle')}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{t('sideCtaDescription')}</p>
                <SecondaryActionButton asChild>
                  <Link
                    href="/game"
                    data-ga-event="contact-side-cta"
                    data-ga-category="cta"
                    data-ga-label="/game"
                  >
                    {t('sideButton')}
                  </Link>
                </SecondaryActionButton>
                <p className="mt-3 text-xs text-muted-foreground">{t('sideFootnote')}</p>
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
