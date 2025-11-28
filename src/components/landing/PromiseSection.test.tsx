import React from "react";
import { render, screen } from "@testing-library/react";
import { PromiseSection } from "./PromiseSection";
import { LanguageProvider } from "@/contexts/language-context";
import { describe, it, expect } from "vitest";

describe("PromiseSection", () => {
    it("renders correctly in Thai (default)", () => {
        render(
            <LanguageProvider>
                <PromiseSection />
            </LanguageProvider>
        );

        expect(screen.getByText("สิ่งที่รอคุณอยู่")).toBeInTheDocument();
        expect(screen.getByText("ทุกทางเลือกมีน้ำหนัก")).toBeInTheDocument();
        expect(screen.getByText("เล่นได้ทันที ไม่ต้องรอ")).toBeInTheDocument();
    });
});
