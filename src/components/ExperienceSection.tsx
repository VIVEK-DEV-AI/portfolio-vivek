import { motion } from "framer-motion";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const experiences = [
  {
    role: "Senior AI Engineer",
    company: "IIT Madras",
    duration: "Aug 2025 – Present",
    points: [
      "Leading an AI-driven research project under the guidance of research faculty at IIT Madras on intelligent jewelry generation software",
      "Fine-tuned SDXL and FLUX using LoRA for high-quality, style-consistent jewelry image synthesis",
      "Implemented FashionCLIP-based semantic search for automated similarity retrieval and design matching",
      "Collaborating with the research team to optimize AI workflows for industrial jewelry design pipelines",
    ],
  },
  {
    role: "AI Engineer",
    company: "Orisys India Consultancy Services",
    duration: "Jun 2025 – Aug 2025",
    points: [
      "Built Gramin Mitra, a RAG-powered chatbot for rural governance using Mistral LLM integration",
      "Implemented FAISS-based semantic search for efficient document retrieval across large corpora",
      "Engineered end-to-end NLP pipeline with LangChain for intelligent question answering",
    ],
  },
  {
    role: "AI/ML Engineer",
    company: "Independent / Open Source",
    duration: "2024 – Present",
    points: [
      "Developed NUERA-AI, a multimodal voice assistant using Whisper, Mistral LLM, and Coqui TTS",
      "Built JobFit, an NLP-powered resume categorization and filtering system for automated recruitment",
      "Engineered CineMatch, a content-based movie recommendation engine using collaborative filtering",
      "Created Git Agent, an autonomous AI agent for Git workflow automation",
    ],
  },
];

const ExperienceSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth || 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="experience" className="section-padding bg-card/30 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-primary text-sm tracking-widest uppercase mb-2">Experience</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Professional <span className="text-gradient">Journey</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass rounded-xl p-5 sm:p-8 border border-white/5 hover:border-primary/40 transition-all duration-200 relative overflow-hidden group w-[85vw] sm:w-[400px] md:w-[440px] snap-start flex-shrink-0"
            >
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 flex-shrink-0">
                  <Briefcase size={20} />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-foreground font-bold text-base sm:text-lg leading-tight truncate">{exp.role}</h3>
                  <p className="text-primary text-sm font-medium truncate">{exp.company}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-secondary/50 border border-white/5 text-xs font-mono text-muted-foreground whitespace-nowrap flex-shrink-0 self-start sm:self-auto">
                  {exp.duration}
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                {exp.points.map((point, j) => (
                  <li key={j} className="text-secondary-foreground flex items-start gap-2 sm:gap-3 text-sm leading-relaxed">
                    <span className="text-primary mt-1 flex-shrink-0">▹</span>
                    <span className="break-words">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
