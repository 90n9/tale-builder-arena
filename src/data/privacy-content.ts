import { type LocalizedText } from "@/lib/i18n";

export const privacyContent = {
  eyebrow: { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" },
  title: { th: "ปกป้องข้อมูลผู้เล่นของคุณ", en: "Protecting your player data" },
  description: {
    th: "นโยบายฉบับนี้อธิบายว่า TaleBuilder Arena เก็บ ใช้ และปกป้องข้อมูลอย่างไรเมื่อคุณเล่นหรือมีปฏิสัมพันธ์กับบริการของเรา",
    en: "This policy explains how TaleBuilder Arena collects, uses, and safeguards data when you play or interact with our service.",
  },
  principles: [
    { title: { th: "ความโปร่งใส", en: "Transparency" }, description: { th: "อธิบายข้อมูลที่เก็บ เหตุผลการใช้ และทางเลือกของคุณอย่างชัดเจน", en: "Clearly explain what we collect, why we use it, and your choices." } },
    { title: { th: "ความปลอดภัย", en: "Security" }, description: { th: "ปกป้องข้อมูลด้วยการควบคุมการเข้าถึงและแนวทางความปลอดภัยที่เหมาะสม", en: "Protect data with appropriate access controls and safeguards." } },
    { title: { th: "การใช้งานอย่างจำกัด", en: "Limited use" }, description: { th: "ใช้ข้อมูลเพื่อให้บริการ TaleBuilder Arena และปรับปรุงประสบการณ์เท่านั้น", en: "Use data only to operate TaleBuilder Arena and improve the experience." } },
  ],
  collectedHeading: { th: "ข้อมูลที่เรารวบรวม", en: "Data we collect" },
  collectedBody: {
    th: "เราเก็บข้อมูลที่คุณให้ไว้โดยตรง (เช่น ชื่อผู้ใช้ อีเมล เนื้อหาที่สร้างในเกม) และข้อมูลการใช้งานอัตโนมัติ (เช่น ประเภทอุปกรณ์ การโต้ตอบภายในเกม ตัวเลือก และล็อกข้อผิดพลาด) เพื่อให้บริการทำงานได้ปกติและปลอดภัย",
    en: "We collect data you provide directly (e.g., username, email, in-game content) and automatic usage data (e.g., device type, in-game interactions, choices, error logs) to keep the service functional and safe.",
  },
  usageHeading: { th: "เราใช้ข้อมูลอย่างไร", en: "How we use data" },
  dataUsage: [
    { th: "สร้างและจัดการเนื้อหาภายในเกม เช่น การเล่าเรื่องและตัวเลือกต่าง ๆ", en: "Generate and manage in-game content, such as stories and choices." },
    { th: "ปรับแต่งประสบการณ์ผู้เล่นและทำความเข้าใจการใช้งานเพื่อปรับปรุงระบบ", en: "Personalize the player experience and understand usage to improve the system." },
    { th: "สื่อสารอัปเดตสำคัญ แจ้งเตือนข้อผิดพลาด หรือสนับสนุนการบริการลูกค้า", en: "Communicate important updates, surface errors, or support customer service." },
    { th: "บังคับใช้เงื่อนไขการให้บริการและป้องกันกิจกรรมที่ไม่ปลอดภัย", en: "Enforce terms of use and prevent unsafe activity." },
  ],
  storageHeading: { th: "การจัดเก็บและความปลอดภัย", en: "Storage and security" },
  dataStorage: [
    { th: "จัดเก็บข้อมูลบัญชีและสถานะเกมไว้ในโครงสร้างพื้นฐานที่มีการควบคุมการเข้าถึง", en: "Store account data and game state in infrastructure with controlled access." },
    { th: "ลดข้อมูลที่เก็บให้เหลือเท่าที่จำเป็นต่อการทำงานของระบบ", en: "Minimize collected data to only what the system needs." },
    { th: "สำรองข้อมูลเป็นระยะเพื่อป้องกันการสูญหายและตรวจสอบความผิดปกติ", en: "Back up data periodically to prevent loss and monitor anomalies." },
  ],
  sharingHeading: { th: "การแชร์ข้อมูลกับบุคคลที่สาม", en: "Sharing with third parties" },
  sharingBody: {
    th: "เราอาจแชร์ข้อมูลกับผู้ให้บริการที่จำเป็นต่อการให้บริการ (เช่น โฮสต์ ฝั่งวิเคราะห์ หรือบริการส่งอีเมล) ภายใต้สัญญาที่คุ้มครองข้อมูล เราจะไม่ขายข้อมูลส่วนบุคคล และจะเปิดเผยข้อมูลเมื่อกฎหมายบังคับหรือเพื่อปกป้องความปลอดภัยของผู้ใช้และระบบ",
    en: "We may share data with providers essential to the service (e.g., hosting, analytics, email) under protective agreements. We do not sell personal data and only disclose it when legally required or to protect user and system safety.",
  },
  rightsHeading: { th: "สิทธิ์และทางเลือกของคุณ", en: "Your rights and choices" },
  userChoices: [
    { th: "อัปเดตหรือแก้ไขข้อมูลบัญชีผ่านหน้าตั้งค่าที่เกี่ยวข้อง (หากมี)", en: "Update or correct account details through relevant settings (if available)." },
    { th: "ขอข้อมูลหรือการลบข้อมูลที่เกี่ยวข้องกับบัญชีของคุณผ่านช่องทางติดต่อที่ระบุ", en: "Request your data or deletion via the contact channels provided." },
    { th: "ควบคุมคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ", en: "Control cookies through your browser settings." },
  ],
  rightsBody: {
    th: "โปรดทราบว่าการร้องขอลบบางอย่างอาจทำให้คุณไม่สามารถใช้งานฟีเจอร์หลักของเกมได้ หากมีคำถามเกี่ยวกับข้อมูลส่วนบุคคลของคุณ กรุณาติดต่อทีมงานตามช่องทางด้านล่าง",
    en: "Some deletion requests may limit your ability to use core features. If you have questions about your personal data, contact the team using the details below.",
  },
  updatesHeading: { th: "การอัปเดตนโยบาย", en: "Policy updates" },
  updatesBody: {
    th: "เราอาจปรับปรุงนโยบายนี้เพื่อสะท้อนการเปลี่ยนแปลงของบริการหรือข้อกำหนดทางกฎหมาย เวอร์ชันล่าสุดจะระบุวันที่มีผลและเผยแพร่บนหน้านี้",
    en: "We may update this policy to reflect service changes or legal requirements. The latest version will note its effective date and be posted here.",
  },
  contactHeading: { th: "ติดต่อเรา", en: "Contact us" },
  contactBody: {
    th: "หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวหรือการจัดการข้อมูลของคุณ โปรดติดต่อทีม TaleBuilder Arena ผ่านอีเมลฝ่ายสนับสนุนหรือช่องทางที่ทีมงานประกาศอย่างเป็นทางการ",
    en: "If you have questions about this policy or how your data is handled, reach out to the TaleBuilder Arena team via support email or official communication channels.",
  },
} satisfies Record<string, LocalizedText | LocalizedText[] | { title: LocalizedText; description: LocalizedText }[]>;
