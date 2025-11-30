'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { Language } from '@/lib/i18n';

type LanguageContextValue = {
  language: Language;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language: Language = 'th';

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
};
