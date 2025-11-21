import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center p-8 rounded-lg bg-card border border-border shadow-card space-y-4">
        <div className="flex justify-center">
          <Compass className="h-12 w-12 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">ไม่พบหน้านี้</h1>
        <p className="text-muted-foreground">
          ดูเหมือนว่าคุณเดินออกนอกเส้นทาง ลองกลับไปยังด่านหลักของ TaleBuilder Arena
        </p>
        <Link href="/" className="text-accent underline underline-offset-4 hover:text-accent/80">
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
