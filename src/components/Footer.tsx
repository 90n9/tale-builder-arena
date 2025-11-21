import { Link } from "react-router-dom";
import { Scroll } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Scroll className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">TaleBuilder Arena</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              เกมเล่าเรื่องด้วยพลัง AI ที่ปล่อยให้ทุกการตัดสินใจของคุณกำหนดชะตาเรื่องราว
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to="/game" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  เล่นเกม
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  เกี่ยวกับ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">ข้อมูลทางกฎหมาย</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  เงื่อนไขการให้บริการ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 TaleBuilder Arena. สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
