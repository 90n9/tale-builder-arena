import React from "react";
import { render, screen } from "@testing-library/react";
import { DonationSection } from "./DonationSection";
import { LanguageProvider } from "@/contexts/language-context";
import { describe, it, expect, vi } from "vitest";

// Mock next/link
vi.mock("next/link", () => {
    return {
        __esModule: true,
        default: ({ children, href }: { children: React.ReactNode; href: string }) => {
            return <a href={href}>{children}</a>;
        },
    };
});

describe("DonationSection", () => {
    it("renders correctly in Thai (default)", () => {
        render(
            <LanguageProvider>
                <DonationSection />
            </LanguageProvider>
        );

        expect(screen.getByText("สนับสนุน TaleBuilder Arena")).toBeInTheDocument();
        expect(screen.getByText("ค่าโฮสติ้งและบำรุงระบบ")).toBeInTheDocument();
    });
});
