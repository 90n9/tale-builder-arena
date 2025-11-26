"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { trackInteraction } from "@/lib/analytics";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const isThai = language === "th";
  const nextLanguage = isThai ? "en" : "th";

  const handleToggle = () => {
    trackInteraction({
      action: "language-toggle",
      category: "language",
      label: nextLanguage,
      params: { language: nextLanguage },
    });
    toggleLanguage();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="gap-2 text-xs font-semibold uppercase tracking-wide"
    >
      <Languages className="h-4 w-4" />
      {isThai ? "TH" : "EN"}
    </Button>
  );
};
