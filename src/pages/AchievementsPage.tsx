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
  { id: "hf_1", name: "The Dragon Slayer", description: "Defeated the ancient dragon in single combat", genre: "High Fantasy", endSceneType: "dragon_victory", rarity: "legendary" },
  { id: "hf_2", name: "Master of Magic", description: "Unlocked the forbidden spells of the arcane tower", genre: "High Fantasy", endSceneType: "magic_mastery", rarity: "epic" },
  { id: "hf_3", name: "Kingdom Savior", description: "Saved the realm from the dark lord's invasion", genre: "High Fantasy", endSceneType: "kingdom_saved", rarity: "rare" },
  { id: "hf_4", name: "Lost Artifact", description: "Discovered the legendary sword of ages", genre: "High Fantasy", endSceneType: "artifact_found", rarity: "epic" },
  
  // Dark Fantasy
  { id: "df_1", name: "Curse Breaker", description: "Lifted the ancient curse from the haunted lands", genre: "Dark Fantasy", endSceneType: "curse_broken", rarity: "epic" },
  { id: "df_2", name: "Shadow Walker", description: "Embraced the darkness and became one with the shadows", genre: "Dark Fantasy", endSceneType: "shadow_embrace", rarity: "legendary" },
  { id: "df_3", name: "Blood Pact", description: "Made a deal with a demon and survived", genre: "Dark Fantasy", endSceneType: "demon_pact", rarity: "rare" },
  { id: "df_4", name: "Undead Hunter", description: "Purged the necropolis of its undead inhabitants", genre: "Dark Fantasy", endSceneType: "undead_purge", rarity: "common" },
  
  // Sci-Fi
  { id: "sf_1", name: "First Contact", description: "Successfully negotiated peace with an alien civilization", genre: "Sci-Fi", endSceneType: "alien_peace", rarity: "rare" },
  { id: "sf_2", name: "AI Awakening", description: "Helped an AI achieve true consciousness", genre: "Sci-Fi", endSceneType: "ai_consciousness", rarity: "legendary" },
  { id: "sf_3", name: "Space Explorer", description: "Discovered a new habitable planet", genre: "Sci-Fi", endSceneType: "planet_discovery", rarity: "epic" },
  { id: "sf_4", name: "Time Paradox", description: "Survived a temporal anomaly and fixed the timeline", genre: "Sci-Fi", endSceneType: "time_fixed", rarity: "legendary" },
  
  // Cyberpunk
  { id: "cp_1", name: "Corporate Takedown", description: "Exposed the megacorp's darkest secrets", genre: "Cyberpunk", endSceneType: "corp_exposed", rarity: "epic" },
  { id: "cp_2", name: "Neural Ghost", description: "Became a legend in the digital realm", genre: "Cyberpunk", endSceneType: "digital_legend", rarity: "rare" },
  { id: "cp_3", name: "Street Samurai", description: "Survived the gang wars and united the streets", genre: "Cyberpunk", endSceneType: "streets_united", rarity: "common" },
  { id: "cp_4", name: "System Breach", description: "Hacked into the city's mainframe", genre: "Cyberpunk", endSceneType: "mainframe_hacked", rarity: "epic" },
  
  // Horror
  { id: "hr_1", name: "Final Survivor", description: "Escaped the nightmare with your sanity intact", genre: "Horror", endSceneType: "escaped_sane", rarity: "legendary" },
  { id: "hr_2", name: "Witness", description: "Saw the truth behind the veil and survived", genre: "Horror", endSceneType: "truth_witnessed", rarity: "epic" },
  { id: "hr_3", name: "Banished Evil", description: "Performed the ritual and sealed the entity", genre: "Horror", endSceneType: "entity_sealed", rarity: "rare" },
  { id: "hr_4", name: "Lost Innocence", description: "Confronted your deepest fears", genre: "Horror", endSceneType: "fears_faced", rarity: "common" },
  
  // Post-Apocalyptic
  { id: "pa_1", name: "Wasteland Legend", description: "Established a thriving settlement in the ruins", genre: "Post-Apocalyptic", endSceneType: "settlement_built", rarity: "legendary" },
  { id: "pa_2", name: "Vault Dweller", description: "Uncovered the secrets of Vault 13", genre: "Post-Apocalyptic", endSceneType: "vault_secrets", rarity: "epic" },
  { id: "pa_3", name: "Raider King", description: "United the wasteland tribes under your banner", genre: "Post-Apocalyptic", endSceneType: "tribes_united", rarity: "rare" },
  { id: "pa_4", name: "Last Hope", description: "Found the cure to save humanity", genre: "Post-Apocalyptic", endSceneType: "cure_found", rarity: "legendary" },
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

  const genres = ["all", "High Fantasy", "Dark Fantasy", "Sci-Fi", "Cyberpunk", "Horror", "Post-Apocalyptic"];

  const filteredAchievements = selectedGenre === "all" 
    ? ALL_ACHIEVEMENTS 
    : ALL_ACHIEVEMENTS.filter(a => a.genre === selectedGenre);

  const earnedCount = earnedAchievements.length;
  const totalCount = ALL_ACHIEVEMENTS.length;
  const progressPercent = Math.round((earnedCount / totalCount) * 100);

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
              Achievements
            </h1>
            <p className="text-muted-foreground text-xl mb-6">
              Unlock trophies by completing different adventure paths
            </p>
            
            {/* Progress Summary */}
            <Card className="max-w-xl mx-auto ornate-corners border-2 border-accent/50 bg-gradient-card shadow-glow-cyan">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-foreground">Overall Progress</span>
                  <span className="text-2xl font-bold text-accent">{earnedCount}/{totalCount}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{progressPercent}% Complete</p>
              </CardContent>
            </Card>
          </div>

          {/* Genre Tabs */}
          <Tabs value={selectedGenre} onValueChange={setSelectedGenre} className="w-full">
            <TabsList className="w-full grid grid-cols-3 lg:grid-cols-7 gap-2 h-auto p-2 bg-card/50 backdrop-blur-sm border-2 border-border">
              {genres.map((genre) => (
                <TabsTrigger 
                  key={genre} 
                  value={genre}
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground capitalize"
                >
                  {genre}
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
                              {achievement.rarity}
                            </Badge>
                            
                            <p className={`text-sm leading-relaxed ${isEarned ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                              {isEarned ? achievement.description : "Complete this ending to unlock"}
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
                  <h3 className="text-xl font-bold text-foreground mb-2">No Achievements Yet</h3>
                  <p className="text-muted-foreground">
                    Start your first adventure to unlock trophies!
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
