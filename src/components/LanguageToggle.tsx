"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const isThai = language === "th";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 text-xs font-semibold uppercase tracking-wide"
    >
      <Languages className="h-4 w-4" />
      {isThai ? "TH" : "EN"}
    </Button>
  );
};
