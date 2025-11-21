import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cpu, Sparkles, Book, Heart } from "lucide-react";

const AboutPage = () => {
  const techStack = [
    { icon: <Cpu className="h-5 w-5" />, label: "AI Language Models" },
    { icon: <Sparkles className="h-5 w-5" />, label: "Dynamic Storytelling" },
    { icon: <Book className="h-5 w-5" />, label: "Procedural Generation" },
    { icon: <Heart className="h-5 w-5" />, label: "Player Choice Systems" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                About Quest Weaver
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An experimental narrative game that combines the magic of traditional tabletop RPGs 
              with the power of artificial intelligence.
            </p>
          </div>

          {/* Main Content */}
          <Card className="ornate-corners border-2 border-border bg-gradient-card shadow-card mb-12">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">What is Quest Weaver?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Quest Weaver is an AI-powered text adventure game that serves as your personal Dungeon Master. 
                  Unlike traditional games with fixed storylines, Quest Weaver generates unique narratives on the fly, 
                  adapting to your choices and creating a truly personalized adventure every time you play.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">How It's Built</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This project leverages cutting-edge technology to create immersive storytelling experiences:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border-2 border-accent/30 hover:border-accent/50 transition-all"
                    >
                      <div className="text-accent">{tech.icon}</div>
                      <span className="text-foreground font-medium">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">The Experience</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Dynamic Narratives:</strong> Every playthrough 
                      tells a different story based on your decisions
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Visual Immersion:</strong> AI-generated artwork 
                      brings each scene to life
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Character Progression:</strong> Track your stats, 
                      inventory, and quests as you adventure
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Meaningful Choices:</strong> Your decisions shape 
                      not just the plot, but the world itself
                    </span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Project Goals</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Quest Weaver is an exploration of how AI can enhance interactive storytelling. 
                  We're experimenting with ways to make narratives more responsive, personal, and engaging. 
                  This is a creative project that pushes the boundaries of what's possible when human 
                  creativity meets artificial intelligence.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimers</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    • This is an experimental project and may contain unexpected behaviors or content
                  </p>
                  <p>
                    • AI-generated content is not always predictable and may vary in quality
                  </p>
                  <p>
                    • Game state and progress are currently not persistent between sessions
                  </p>
                  <p>
                    • This project is for educational and entertainment purposes only
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Ready to experience the magic of AI-powered storytelling?
            </p>
            <Link to="/game">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow-orange transition-all text-base font-semibold">
                Back to Adventure
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
