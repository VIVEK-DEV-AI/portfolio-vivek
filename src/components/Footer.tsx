import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-foreground font-semibold">
            <span className="text-gradient">Vivek R</span> — AI/ML Engineer & Researcher
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/VIVEK-DEV-AI" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs">
            <Github size={16} />
            <span className="hidden sm:inline font-mono">github.com/VIVEK-DEV-AI</span>
          </a>
          <a href="https://linkedin.com/in/vivekfordev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs">
            <Linkedin size={16} />
            <span className="hidden sm:inline font-mono">linkedin.com/in/vivekfordev</span>
          </a>
          <a href="mailto:vivekrajesh.dev@gmail.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs">
            <Mail size={16} />
            <span className="hidden sm:inline font-mono">vivekrajesh.dev@gmail.com</span>
          </a>
        </div>
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Vivek R. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
