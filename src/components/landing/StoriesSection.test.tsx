import React from "react";
import { render, screen } from "@testing-library/react";
import { StoriesSection } from "./StoriesSection";
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

describe("StoriesSection", () => {
    it("renders correctly in Thai (default)", () => {
        render(
            <LanguageProvider>
                <StoriesSection />
            </LanguageProvider>
        );

        expect(screen.getByText("เลือกเรื่องแล้วเล่นเลย")).toBeInTheDocument();
        expect(screen.getByText("สุสานแห่งดวงดาวแตกสลาย (Crypt of the Shattered Star)")).toBeInTheDocument();
        expect(screen.getByText("ดันเจี้ยนร้านชำยายทองดี (Yai Thongdee's Dungeon Shop)")).toBeInTheDocument();
    });
});
