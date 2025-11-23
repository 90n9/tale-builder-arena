import { getLocalizedText } from "@/lib/i18n";
import { type I18nService } from "@/server/ports/i18n";

export const i18nService: I18nService = {
  getLocalizedText,
};
