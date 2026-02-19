import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import vivekHero from "@/assets/vivek-hero-nobg.png";
import ResumeViewer from "./ResumeViewer";

const HeroSection = () => {
  // Typewriter effect variants
  const sentence = "Vivek R";
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10"
    >
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-foreground leading-[1.1] mb-6 tracking-tighter"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1 }}
            >
              {sentence.split("").map((char, index) => (
                <motion.span
                  key={char + "-" + index}
                  variants={letter}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <p className="text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed mb-10 relative">
                <span className="absolute -left-4 top-0 bottom-0 w-1 bg-primary animate-pulse"></span>
                <span className="font-mono text-primary mr-2">&gt;</span>
                AI/ML Engineer & Researcher specializing in <span className="text-foreground font-bold">Machine Learning</span>, <span className="text-foreground font-bold">Deep Learning</span>, & <span className="text-foreground font-bold">GenAI</span>
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <ResumeViewer />

              <div className="h-8 w-px bg-border hidden sm:block"></div>

              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/VIVEK-DEV-AI", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/vivekfordev", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:vivekrajesh.dev@gmail.com", label: "Email" },
                  { icon: Phone, href: "https://wa.me/916238348153", label: "WhatsApp" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-full hover:scale-110 active:scale-95 duration-200"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-transparent"></div>
              <div>
                <p className="text-sm tracking-[0.2em] font-medium text-muted-foreground uppercase mb-1">
                  By Hardwork & Determination
                </p>
                <p className="text-xs text-muted-foreground/60 font-mono">
                  [ System Active :: Location: IN ]
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end items-end h-[60vh] lg:h-[80vh]"
          >
            {/* Purple Background Block */}
            <div className="absolute top-10 bottom-0 left-1/4 right-0 lg:left-1/3 bg-[#9b87f5] rounded-t-full -z-10" />

            {/* Hero Image */}
            <img
              src={vivekHero}
              alt="Vivek R"
              className="h-full w-auto object-contain drop-shadow-2xl z-10 grayscale"
            />
          </motion.div>
        </div>

        {/* Footer / Projects Link - Removed as requested */}

      </div>
    </section>
  );
};

export default HeroSection;
