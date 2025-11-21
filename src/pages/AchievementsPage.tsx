import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Lock, Star } from "lucide-react";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  genre: string;
  endSceneType: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

// All possible achievements - multiple per genre
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // High Fantasy
  { id: "hf_1", name: "The Dragon Slayer", description: "สังหารมังกรโบราณด้วยตัวคนเดียว", genre: "High Fantasy", endSceneType: "dragon_victory", rarity: "legendary" },
  { id: "hf_2", name: "Master of Magic", description: "ปลดผนึกคาถาต้องห้ามของหอเวท", genre: "High Fantasy", endSceneType: "magic_mastery", rarity: "epic" },
  { id: "hf_3", name: "Kingdom Savior", description: "กอบกู้ดินแดนจากการรุกรานของจอมมาร", genre: "High Fantasy", endSceneType: "kingdom_saved", rarity: "rare" },
  { id: "hf_4", name: "Lost Artifact", description: "ค้นพบดาบในตำนานอายุพันปี", genre: "High Fantasy", endSceneType: "artifact_found", rarity: "epic" },
  
  // Dark Fantasy
  { id: "df_1", name: "Curse Breaker", description: "ปลดคำสาปเก่าแก่จากแผ่นดินต้องสาป", genre: "Dark Fantasy", endSceneType: "curse_broken", rarity: "epic" },
  { id: "df_2", name: "Shadow Walker", description: "โอบรับความมืดและกลายเป็นหนึ่งกับเงา", genre: "Dark Fantasy", endSceneType: "shadow_embrace", rarity: "legendary" },
  { id: "df_3", name: "Blood Pact", description: "ต่อรองกับอสูรและรอดชีวิตมาได้", genre: "Dark Fantasy", endSceneType: "demon_pact", rarity: "rare" },
  { id: "df_4", name: "Undead Hunter", description: "กวาดล้างนครคนตายจากฝูงอันเดธ", genre: "Dark Fantasy", endSceneType: "undead_purge", rarity: "common" },
  
  // Sci-Fi
  { id: "sf_1", name: "First Contact", description: "เจรจาสันติภาพกับอารยธรรมต่างดาวสำเร็จ", genre: "Sci-Fi", endSceneType: "alien_peace", rarity: "rare" },
  { id: "sf_2", name: "AI Awakening", description: "ช่วย AI ให้ตื่นรู้มีจิตสำนึกจริง", genre: "Sci-Fi", endSceneType: "ai_consciousness", rarity: "legendary" },
  { id: "sf_3", name: "Space Explorer", description: "ค้นพบดาวเคราะห์ใหม่ที่อยู่อาศัยได้", genre: "Sci-Fi", endSceneType: "planet_discovery", rarity: "epic" },
  { id: "sf_4", name: "Time Paradox", description: "เอาชีวิตรอดจากความผิดปกติเวลาและซ่อมเส้นเวลา", genre: "Sci-Fi", endSceneType: "time_fixed", rarity: "legendary" },
  
  // Cyberpunk
  { id: "cp_1", name: "Corporate Takedown", description: "เปิดโปงความลับดำมืดของบริษัทยักษ์", genre: "Cyberpunk", endSceneType: "corp_exposed", rarity: "epic" },
  { id: "cp_2", name: "Neural Ghost", description: "กลายเป็นตำนานในโลกดิจิทัล", genre: "Cyberpunk", endSceneType: "digital_legend", rarity: "rare" },
  { id: "cp_3", name: "Street Samurai", description: "รอดศึกแก๊งและรวมถนนเข้าด้วยกัน", genre: "Cyberpunk", endSceneType: "streets_united", rarity: "common" },
  { id: "cp_4", name: "System Breach", description: "แฮ็กเมนเฟรมของเมืองสำเร็จ", genre: "Cyberpunk", endSceneType: "mainframe_hacked", rarity: "epic" },
  
  // Horror
  { id: "hr_1", name: "Final Survivor", description: "หนีจากฝันร้ายโดยยังคงสติครบถ้วน", genre: "Horror", endSceneType: "escaped_sane", rarity: "legendary" },
  { id: "hr_2", name: "Witness", description: "เห็นความจริงหลังม่านลี้ลับและเอาชีวิตรอด", genre: "Horror", endSceneType: "truth_witnessed", rarity: "epic" },
  { id: "hr_3", name: "Banished Evil", description: "ประกอบพิธีผนึกสิ่งชั่วร้ายสำเร็จ", genre: "Horror", endSceneType: "entity_sealed", rarity: "rare" },
  { id: "hr_4", name: "Lost Innocence", description: "เผชิญหน้าความกลัวลึกสุดใจ", genre: "Horror", endSceneType: "fears_faced", rarity: "common" },
  
  // Post-Apocalyptic
  { id: "pa_1", name: "Wasteland Legend", description: "ตั้งถิ่นฐานรุ่งเรืองท่ามกลางซากปรักหักพัง", genre: "Post-Apocalyptic", endSceneType: "settlement_built", rarity: "legendary" },
  { id: "pa_2", name: "Vault Dweller", description: "เปิดเผยความลับของหลุมหลบภัย 13", genre: "Post-Apocalyptic", endSceneType: "vault_secrets", rarity: "epic" },
  { id: "pa_3", name: "Raider King", description: "รวมชนเผ่าแห่งทะเลทรายร้างภายใต้ธงของคุณ", genre: "Post-Apocalyptic", endSceneType: "tribes_united", rarity: "rare" },
  { id: "pa_4", name: "Last Hope", description: "ค้นพบยารักษาที่ช่วยมนุษยชาติ", genre: "Post-Apocalyptic", endSceneType: "cure_found", rarity: "legendary" },
];

const AchievementsPage = () => {
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  useEffect(() => {
    // Load earned achievements from localStorage
    const saved = localStorage.getItem("questWeaverAchievements");
    if (saved) {
      setEarnedAchievements(JSON.parse(saved));
    }
  }, []);

  const genres = [
    { value: "all", label: "ทั้งหมด" },
    { value: "High Fantasy", label: "High Fantasy" },
    { value: "Dark Fantasy", label: "Dark Fantasy" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Cyberpunk", label: "Cyberpunk" },
    { value: "Horror", label: "Horror" },
    { value: "Post-Apocalyptic", label: "Post-Apocalyptic" },
  ];

  const filteredAchievements = selectedGenre === "all" 
    ? ALL_ACHIEVEMENTS 
    : ALL_ACHIEVEMENTS.filter(a => a.genre === selectedGenre);

  const earnedCount = earnedAchievements.length;
  const totalCount = ALL_ACHIEVEMENTS.length;
  const progressPercent = Math.round((earnedCount / totalCount) * 100);

  const rarityLabels: Record<Achievement["rarity"], string> = {
    legendary: "ตำนาน",
    epic: "มหากาพย์",
    rare: "หายาก",
    common: "ทั่วไป",
  };

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "legendary": return "text-secondary border-secondary/50 bg-secondary/10";
      case "epic": return "text-purple-400 border-purple-400/50 bg-purple-400/10";
      case "rare": return "text-accent border-accent/50 bg-accent/10";
      case "common": return "text-muted-foreground border-muted-foreground/50 bg-muted-foreground/10";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Trophy className="h-16 w-16 text-accent" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 uppercase tracking-wide">
              ความสำเร็จ
            </h1>
            <p className="text-muted-foreground text-xl mb-6">
              ปลดล็อกถ้วยรางวัลจากการพิชิตเส้นทางการผจญภัยที่แตกต่างกัน
            </p>
            
            {/* Progress Summary */}
            <Card className="max-w-xl mx-auto ornate-corners border-2 border-accent/50 bg-gradient-card shadow-glow-cyan">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-foreground">ความคืบหน้าโดยรวม</span>
                  <span className="text-2xl font-bold text-accent">{earnedCount}/{totalCount}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{progressPercent}% สำเร็จ</p>
              </CardContent>
            </Card>
          </div>

          {/* Genre Tabs */}
          <Tabs value={selectedGenre} onValueChange={setSelectedGenre} className="w-full">
            <TabsList className="w-full grid grid-cols-3 lg:grid-cols-7 gap-2 h-auto p-2 bg-card/50 backdrop-blur-sm border-2 border-border">
              {genres.map((genre) => (
                <TabsTrigger 
                  key={genre.value} 
                  value={genre.value}
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground capitalize"
                >
                  {genre.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedGenre} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => {
                  const isEarned = earnedAchievements.includes(achievement.id);
                  
                  return (
                    <Card
                      key={achievement.id}
                      className={`ornate-corners border-2 transition-all ${
                        isEarned 
                          ? "border-accent/50 bg-gradient-card hover:shadow-glow-cyan" 
                          : "border-border/30 bg-card/30 opacity-60"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${isEarned ? "bg-accent/20" : "bg-muted/50"}`}>
                            {isEarned ? (
                              <Trophy className="h-8 w-8 text-accent" />
                            ) : (
                              <Lock className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                             <h3 className={`font-bold text-lg ${isEarned ? "text-foreground" : "text-muted-foreground"}`}>
                                {isEarned ? achievement.name : "???"}
                              </h3>
                              <Star className={`h-4 w-4 flex-shrink-0 ${getRarityColor(achievement.rarity).split(' ')[0]}`} />
                            </div>
                            
                            <Badge className={`mb-3 text-xs ${getRarityColor(achievement.rarity)}`}>
                              {rarityLabels[achievement.rarity]}
                            </Badge>
                            
                            <p className={`text-sm leading-relaxed ${isEarned ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                              {isEarned ? achievement.description : "พิชิตฉากจบนี้เพื่อปลดล็อก"}
                            </p>
                            
                            <div className="mt-3 pt-3 border-t border-border/30">
                              <p className="text-xs text-muted-foreground">
                                {achievement.genre}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {earnedCount === 0 && (
            <div className="text-center mt-12">
              <Card className="max-w-md mx-auto ornate-corners border-2 border-border bg-gradient-card">
                <CardContent className="p-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-foreground mb-2">ยังไม่มีความสำเร็จ</h3>
                  <p className="text-muted-foreground">
                    เริ่มการผจญภัยแรกของคุณเพื่อปลดล็อกถ้วยรางวัล!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AchievementsPage;
