import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scroll } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Scroll className="h-6 w-6 text-accent group-hover:text-secondary transition-colors" />
          <span className="text-xl font-bold text-foreground">
            Quest Weaver
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
              isActive("/") ? "text-accent" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/game"
            className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
              isActive("/game") ? "text-accent" : "text-muted-foreground"
            }`}
          >
            Play
          </Link>
          <Link
            to="/achievements"
            className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
              isActive("/achievements") ? "text-accent" : "text-muted-foreground"
            }`}
          >
            Achievements
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent ${
              isActive("/about") ? "text-accent" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
          
          <Link to="/game">
            <Button className="bg-gradient-primary hover:shadow-glow-orange transition-all text-sm font-semibold uppercase text-primary-foreground border border-secondary/50">
              Start Adventure
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
