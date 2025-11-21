import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, MessageSquare, BarChart3, Image, Play, Zap, BookOpen, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Index = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI Dungeon Master",
      description: "สัมผัสการเล่าเรื่องอันลื่นไหลด้วย AI ขั้นสูงที่ปรับตามทุกการตัดสินใจของคุณ",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-secondary" />,
      title: "เกมทางเลือก",
      description: "ทุกการเลือกมีผลสำคัญ เนื้อเรื่องจะแตกแขนงไม่เหมือนใครตามเส้นทางที่คุณตัดสินใจ",
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "ระบบความสำเร็จ",
      description: "ปลดล็อกถ้วยรางวัลพิเศษจากฉากจบหลากหลายแนวและเส้นทาง",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-secondary" />,
      title: "สถานะตัวละครแบบเรียลไทม์",
      description: "ติดตาม HP มานา ทอง และไอเทมต่างๆ ของคุณขณะออกผจญภัย",
    },
    {
      icon: <Image className="h-8 w-8 text-primary" />,
      title: "ภาพประกอบฉาก",
      description: "ดื่มด่ำกับงานภาพที่สร้างด้วย AI ที่ปลุกทุกฉากให้มีชีวิต",
    },
  ];

  const steps = [
    {
      icon: <Play className="h-6 w-6" />,
      title: "เริ่มภารกิจ",
      description: "คลิก 'เริ่มการผจญภัย' เพื่อออกเดินทาง",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "อ่านแล้วตัดสินใจ",
      description: "ติดตามเรื่องราวแล้วเลือกเส้นทางที่ต้องการ",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "สร้างเรื่องของคุณ",
      description: "ให้ทางเลือกของคุณสร้างการผจญภัยที่ไม่ซ้ำใคร",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-foreground drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                TaleBuilder Arena
              </span>
            </h1>
            
            <div className="mb-8">
              <div className="inline-block bg-card/80 backdrop-blur-sm border-2 border-accent/30 rounded px-6 py-3">
                <p className="text-xl md:text-2xl text-accent font-semibold uppercase tracking-wider">
                  เรื่องราวของคุณ ทางเลือกของคุณ
                </p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/90 mb-12 leading-relaxed drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
              ออกเดินทางผจญภัยสุดยิ่งใหญ่ภายใต้การนำของ AI Dungeon Master ทุกการตัดสินใจจะกำหนดโชคชะตา 
              ในประสบการณ์ RPG เชิงข้อความที่ชวนดื่มด่ำ
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/game">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-orange transition-all text-lg font-semibold px-10 py-7 text-primary-foreground border-2 border-secondary/50">
                  เริ่มการผจญภัย
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-2 border-accent/50 text-accent hover:bg-accent/10 hover:shadow-glow-cyan transition-all text-lg px-10 py-7 backdrop-blur-sm bg-background/30">
                  ชมตัวอย่าง
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              ฟีเจอร์เด่น
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              ขับเคลื่อนด้วยเทคโนโลยี AI ล้ำสมัยเพื่อมอบประสบการณ์การเล่าเรื่องที่เหนือชั้น
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm hover:shadow-card hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 group"
              >
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors border border-border/30">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              วิธีเริ่มเล่น
            </h2>
            <p className="text-muted-foreground text-xl">
              เพียง 3 ขั้นตอนก็เริ่มผจญภัยได้ทันที
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow-orange border-2 border-secondary/30">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="section-divider mb-12" />
            <h2 className="text-5xl font-bold mb-6 text-foreground uppercase tracking-wide">
              การเล่นสุดดื่มด่ำ
            </h2>
            <p className="text-muted-foreground text-xl">
              อินเทอร์เฟซเรียบง่าย เข้าใจทันที ออกแบบมาเพื่อเล่าเรื่องโดยเฉพาะ
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="ornate-corners border-2 border-border/50 bg-gradient-card backdrop-blur-sm shadow-epic overflow-hidden">
              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border border-border/30 backdrop-blur-sm overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-cyan opacity-10 group-hover:opacity-20 transition-opacity" />
                      <Image className="h-16 w-16 text-accent/50 relative z-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">งานภาพเล่าเรื่อง</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      ทุกฉากมีชีวิตด้วยภาพจาก AI เสริมบรรยากาศให้การผจญภัยของคุณสมบูรณ์ขึ้น
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-64 bg-muted/30 rounded-lg p-6 overflow-auto border border-border/30 backdrop-blur-sm">
                      <p className="text-foreground italic text-lg leading-relaxed">
                        "คุณยืนอยู่หน้าทางเข้าดันเจี้ยนโบราณ อากาศหนาหนักไปด้วยความลี้ลับ 
                        ผลึกเรืองแสงสะท้อนแสงตามผนังทางเดินหิน เสียงกระซิบแผ่วเบาดังมาจากเบื้องลึก..."
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-wide">เนื้อเรื่องเข้มข้น</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      เรื่องราวน่าติดตามที่ตอบสนองต่อการเลือกของคุณ สร้างการผจญภัยไม่ซ้ำใครทุกครั้ง
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="section-divider mb-12" />
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground uppercase tracking-wide">
            พร้อมออกเดินทางหรือยัง?
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            การผจญภัยของคุณกำลังรออยู่ ก้าวสู่โลกที่ทุกการเลือกมีความหมาย และทุกเรื่องราวไม่เหมือนใคร
          </p>
          <Link to="/game">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow-orange transition-all text-xl font-bold px-12 py-8 text-primary-foreground border-2 border-secondary/50 uppercase tracking-wider">
              เล่นทันที
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
