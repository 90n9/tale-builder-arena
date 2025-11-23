import { type Language, type LocalizedText } from "@/lib/i18n";

export interface I18nService {
  getLocalizedText(value: LocalizedText, language: Language): string;
}
