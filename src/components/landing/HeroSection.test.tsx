import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";
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

describe("HeroSection", () => {
    it("renders correctly in Thai (default)", () => {
        render(
            <LanguageProvider>
                <HeroSection />
            </LanguageProvider>
        );

        expect(screen.getByText("เลือกชะตา เขียนเรื่องของคุณ")).toBeInTheDocument();
        expect(screen.getByText("เริ่มเรื่องเลย")).toBeInTheDocument();
    });
});
