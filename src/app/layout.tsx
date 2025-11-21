import type { Metadata } from "next";
import { Noto_Sans_Thai, Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const headingFont = Prompt({
  weight: ["400", "600"],
  subsets: ["latin", "latin-ext", "thai", "vietnamese"],
  display: "swap",
  variable: "--font-heading",
});

const notoSansThai = Noto_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "thai"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "TaleBuilder Arena",
  description: "AI-driven text RPG with branching choices and rich achievements.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      className={`${headingFont.variable} ${notoSansThai.variable}`}
    >
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
