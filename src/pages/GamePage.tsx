import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { RefreshCw, Loader2, Heart, Sparkles, Coins, Package, ArrowRight, ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import gamePlaceholder from "@/assets/game-scene-placeholder.jpg";
import { ALL_ACHIEVEMENTS } from "./AchievementsPage";
import type { Achievement } from "./AchievementsPage";

type CharacterCreationStep = "genre" | "race" | "class" | "attributes" | "game" | "endgame";

interface Character {
  genre: string;
  race: string;
  class: string;
  attributes: {
    strength: number;
    intelligence: number;
    dexterity: number;
    constitution: number;
    wisdom: number;
    charisma: number;
  };
}

const GamePage = () => {
  const [step, setStep] = useState<CharacterCreationStep>("genre");
  const [isLoading, setIsLoading] = useState(false);
  const [turn, setTurn] = useState(1);
  const [earnedAchievement, setEarnedAchievement] = useState<Achievement | null>(null);
  
  const [character, setCharacter] = useState<Character>({
    genre: "",
    race: "",
    class: "",
    attributes: {
      strength: 10,
      intelligence: 10,
      dexterity: 10,
      constitution: 10,
      wisdom: 10,
      charisma: 10,
    },
  });

  const genres = [
    { name: "High Fantasy", description: "Epic adventures in magical realms" },
    { name: "Dark Fantasy", description: "Gothic horror meets fantasy" },
    { name: "Sci-Fi", description: "Futuristic technology and space exploration" },
    { name: "Cyberpunk", description: "High tech, low life urban dystopia" },
    { name: "Horror", description: "Survival against terrifying forces" },
    { name: "Post-Apocalyptic", description: "Survive in the wasteland" },
  ];

  const races = [
    { name: "Human", description: "Versatile and adaptable" },
    { name: "Elf", description: "Graceful and wise" },
    { name: "Dwarf", description: "Strong and resilient" },
    { name: "Orc", description: "Powerful and fierce" },
    { name: "Halfling", description: "Quick and lucky" },
    { name: "Dragonborn", description: "Ancient and powerful" },
  ];

  const classes = [
    { name: "Warrior", description: "Master of melee combat" },
    { name: "Mage", description: "Wielder of arcane magic" },
    { name: "Rogue", description: "Stealth and cunning" },
    { name: "Cleric", description: "Divine healer and protector" },
    { name: "Ranger", description: "Nature's guardian" },
    { name: "Paladin", description: "Holy warrior of justice" },
  ];

  // Mock game state
  const [stats] = useState({
    hp: 85,
    maxHp: 100,
    mana: 60,
    maxMana: 80,
    gold: 150,
  });

  const [inventory] = useState([
    "Iron Sword",
    "Health Potion",
    "Torch",
    "Ancient Map",
  ]);

  const [quests] = useState([
    "Explore the Ancient Dungeon",
    "Find the Lost Artifact",
    "Defeat the Shadow Beast",
  ]);

  const narration = `You stand at the entrance of an ancient dungeon, its weathered stone walls covered in mysterious glowing runes. The air is thick with an otherworldly energy, and the faint sound of dripping water echoes from the depths below. Your torch flickers, casting dancing shadows that seem almost alive. 

Before you lie three paths: a narrow corridor to the left emanating a cold blue light, a wide passage straight ahead with ancient carvings on the walls, and a steep stairway descending to the right into darkness.

What will you do?`;

  const choices = [
    "Take the narrow corridor with blue light",
    "Enter the wide passage with carvings",
    "Descend the dark stairway",
    "Examine the runes more carefully first",
  ];

  const handleChoice = (choice: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newTurn = turn + 1;
      setTurn(newTurn);
      
      // Trigger end game after 3 turns (can be adjusted)
      if (newTurn >= 4) {
        // Get a random achievement for the current genre
        const genreAchievements = ALL_ACHIEVEMENTS.filter(
          a => a.genre === character.genre
        );
        const randomAchievement = genreAchievements[
          Math.floor(Math.random() * genreAchievements.length)
        ];
        
        // Save to localStorage
        const saved = localStorage.getItem("questWeaverAchievements");
        const earnedIds = saved ? JSON.parse(saved) : [];
        if (!earnedIds.includes(randomAchievement.id)) {
          earnedIds.push(randomAchievement.id);
          localStorage.setItem("questWeaverAchievements", JSON.stringify(earnedIds));
        }
        
        setEarnedAchievement(randomAchievement);
        setStep("endgame");
      }
      
      setIsLoading(false);
    }, 2000);
  };

  const handleRestart = () => {
    setStep("genre");
    setCharacter({
      genre: "",
      race: "",
      class: "",
      attributes: {
        strength: 10,
        intelligence: 10,
        dexterity: 10,
        constitution: 10,
        wisdom: 10,
        charisma: 10,
      },
    });
    setTurn(1);
    setIsLoading(false);
    setEarnedAchievement(null);
  };

  const handleSelectGenre = (genre: string) => {
    setCharacter({ ...character, genre });
    setStep("race");
  };

  const handleSelectRace = (race: string) => {
    setCharacter({ ...character, race });
    setStep("class");
  };

  const handleSelectClass = (className: string) => {
    setCharacter({ ...character, class: className });
    setStep("attributes");
  };

  const handleAttributeChange = (attribute: keyof Character["attributes"], value: number[]) => {
    setCharacter({
      ...character,
      attributes: { ...character.attributes, [attribute]: value[0] },
    });
  };

  const totalAttributePoints = Object.values(character.attributes).reduce((a, b) => a + b, 0);
  const maxAttributePoints = 75;

  const handleStartGame = () => {
    setStep("game");
  };

  const renderGenreSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Choose Your Genre</h1>
          <p className="text-muted-foreground text-lg">Select the world you wish to explore</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <Card
              key={genre.name}
              className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
              onClick={() => handleSelectGenre(genre.name)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">{genre.name}</h3>
                <p className="text-muted-foreground">{genre.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRaceSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/20 text-accent border border-accent/30">
            {character.genre}
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-4">Choose Your Race</h1>
          <p className="text-muted-foreground text-lg">Select your character's heritage</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {races.map((race) => (
            <Card
              key={race.name}
              className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
              onClick={() => handleSelectRace(race.name)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">{race.name}</h3>
                <p className="text-muted-foreground">{race.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setStep("genre")}
            className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Genre
          </Button>
        </div>
      </div>
    </div>
  );

  const renderClassSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex gap-2 justify-center mb-4">
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.genre}
            </Badge>
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.race}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">Choose Your Class</h1>
          <p className="text-muted-foreground text-lg">Select your character's profession</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {classes.map((cls) => (
            <Card
              key={cls.name}
              className="ornate-corners border-2 border-border bg-gradient-card shadow-card cursor-pointer transition-all hover:border-accent hover:shadow-glow-cyan"
              onClick={() => handleSelectClass(cls.name)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">{cls.name}</h3>
                <p className="text-muted-foreground">{cls.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setStep("race")}
            className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Race
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAttributeSelection = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex gap-2 justify-center mb-4">
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.genre}
            </Badge>
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.race}
            </Badge>
            <Badge className="bg-accent/20 text-accent border border-accent/30">
              {character.class}
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">Set Your Attributes</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Distribute your character's abilities
          </p>
          <p className="text-sm text-muted-foreground">
            Points Used: <span className={totalAttributePoints > maxAttributePoints ? "text-destructive" : "text-accent"}>{totalAttributePoints}</span> / {maxAttributePoints}
          </p>
        </div>

        <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card mb-8">
          <CardContent className="p-8">
            <div className="space-y-8">
              {Object.entries(character.attributes).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-foreground text-lg capitalize">{key}</Label>
                    <span className="text-accent font-bold text-xl">{value}</span>
                  </div>
                  <Slider
                    value={[value]}
                    onValueChange={(val) => handleAttributeChange(key as keyof Character["attributes"], val)}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => setStep("class")}
            className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Class
          </Button>
          <Button
            onClick={handleStartGame}
            disabled={totalAttributePoints > maxAttributePoints}
            className="bg-gradient-primary hover:shadow-glow-orange"
          >
            Start Adventure
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="min-h-screen bg-background">      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                  {character.race}
                </Badge>
                <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs">
                  {character.class}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Current Adventure</h1>
              <p className="text-muted-foreground">Turn {turn} • Chapter 1: The Ancient Dungeon</p>
            </div>
            <Button
              variant="outline"
              onClick={handleRestart}
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Game Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scene Image */}
              <Card className="ornate-corners overflow-hidden border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Loader2 className="h-12 w-12 text-accent animate-spin" />
                    </div>
                  ) : (
                    <img
                      src={gamePlaceholder}
                      alt="Current scene"
                      className="w-full aspect-video object-cover"
                    />
                  )}
                </CardContent>
              </Card>

              {/* Narration Box */}
              <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Story
                  </h2>
                  <ScrollArea className="h-[300px] pr-4">
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {narration}
                    </p>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Choice Buttons */}
              <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    What will you do?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {choices.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => handleChoice(choice)}
                        disabled={isLoading}
                        className="h-auto py-4 text-left justify-start bg-card hover:bg-muted border-2 border-accent/50 text-foreground hover:border-accent hover:shadow-glow-cyan transition-all"
                        variant="outline"
                      >
                        <span className="text-accent font-bold mr-3">{index + 1}.</span>
                        {choice}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Panel */}
            <div className="space-y-6">
              {/* Character Stats */}
              <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Character Stats</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-destructive" />
                          <span className="text-sm font-medium text-foreground">HP</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {stats.hp}/{stats.maxHp}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-destructive transition-all"
                          style={{ width: `${(stats.hp / stats.maxHp) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-accent" />
                          <span className="text-sm font-medium text-foreground">Mana</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {stats.mana}/{stats.maxMana}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all"
                          style={{ width: `${(stats.mana / stats.maxMana) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-medium text-foreground">Gold</span>
                      </div>
                      <span className="text-sm font-semibold text-secondary">{stats.gold}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory */}
              <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-accent" />
                    Inventory
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {inventory.map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-accent/20 text-accent border border-accent/30"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quest Log */}
              <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Active Quests</h2>
                  <ul className="space-y-3">
                    {quests.map((quest, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{quest}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEndGame = () => (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="mb-8">
            <Sparkles className="h-20 w-20 text-accent mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-4">Adventure Complete!</h1>
          <p className="text-muted-foreground text-xl">Your journey through the ancient dungeon has come to an end</p>
        </div>

        <Card className="ornate-corners border-2 border-accent/50 bg-gradient-card shadow-glow-cyan mb-8">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Final Summary</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-accent">Character Details</h3>
                  <div className="space-y-2 text-foreground">
                    <p><span className="text-muted-foreground">Genre:</span> {character.genre}</p>
                    <p><span className="text-muted-foreground">Race:</span> {character.race}</p>
                    <p><span className="text-muted-foreground">Class:</span> {character.class}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-accent">Adventure Stats</h3>
                  <div className="space-y-2 text-foreground">
                    <p><span className="text-muted-foreground">Turns Taken:</span> {turn}</p>
                    <p><span className="text-muted-foreground">Final HP:</span> {stats.hp}/{stats.maxHp}</p>
                    <p><span className="text-muted-foreground">Gold Collected:</span> {stats.gold}</p>
                  </div>
                </div>
              </div>

              {earnedAchievement && (
                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Achievement Unlocked!
                  </h3>
                  <Card className="ornate-corners border-2 border-secondary/50 bg-secondary/10">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Trophy className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-xl font-bold text-secondary mb-2">
                            {earnedAchievement.name}
                          </h4>
                          <p className="text-foreground mb-2">
                            {earnedAchievement.description}
                          </p>
                          <Badge className="bg-secondary/20 text-secondary border border-secondary/30 capitalize">
                            {earnedAchievement.rarity}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Your Legacy</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  You ventured into the unknown, faced dangers untold, and emerged victorious. 
                  The tales of your bravery will be sung in taverns across the realm. 
                  Will you embark on another adventure?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Link to="/achievements">
            <Button
              variant="outline"
              className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-glow-cyan text-lg px-8 py-6"
            >
              <Trophy className="h-5 w-5 mr-2" />
              View All Achievements
            </Button>
          </Link>
          <Button
            onClick={handleRestart}
            className="bg-gradient-primary hover:shadow-glow-orange text-lg px-8 py-6"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Start New Adventure
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      {step === "genre" && renderGenreSelection()}
      {step === "race" && renderRaceSelection()}
      {step === "class" && renderClassSelection()}
      {step === "attributes" && renderAttributeSelection()}
      {step === "game" && renderGame()}
      {step === "endgame" && renderEndGame()}
    </>
  );
};

export default GamePage;
