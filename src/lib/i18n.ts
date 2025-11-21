export type Language = "th" | "en";

export type LocalizedText = {
  th: string;
  en: string;
};

export const getLocalizedText = (value: LocalizedText, language: Language) =>
  value[language] ?? value.th;
