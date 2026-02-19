import { motion } from "framer-motion";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    name: "AI-Driven Jewelry Generation — IIT Madras",
    desc: "Leading an AI-driven research project under research faculty at IIT Madras, developing intelligent software for manufacturing-ready custom jewelry generation using advanced generative AI.",
    tech: ["SDXL", "FLUX", "LoRA", "FashionCLIP", "Python", "Diffusion Models"],
    github: "https://github.com/VIVEK-DEV-AI",
    highlights: [
      "Fine-tuned SDXL and FLUX using LoRA for high-quality, style-consistent jewelry image synthesis from text prompts",
      "Implemented image semantic search using FashionCLIP for automated similarity-based retrieval and design reference matching",
      "Optimized AI workflows for scalability in industrial jewelry design pipelines",
    ],
  },
  {
    name: "NUERA-AI",
    desc: "Multimodal AI voice assistant combining Whisper for speech recognition, Mistral LLM for intelligent reasoning, and Coqui TTS for natural speech synthesis. Features RAG-based document Q&A with semantic search.",
    tech: ["Python", "Whisper", "Mistral LLM", "Coqui TTS", "RAG", "LangChain"],
    github: "https://github.com/VIVEK-DEV-AI/NUERA-AI",
    highlights: [
      "End-to-end voice interaction pipeline with STT + LLM + TTS",
      "RAG-based answer generation with semantic retrieval",
      "Multimodal AI assistant architecture",
    ],
  },
  {
    name: "JobFit",
    desc: "Intelligent resume categorization system that processes, classifies, and filters resumes using NLP techniques. Extracts structured information for automated recruitment screening.",
    tech: ["Python", "Jupyter", "NLP", "Scikit-learn", "Text Classification"],
    github: "https://github.com/VIVEK-DEV-AI/Jobfit",
    highlights: [
      "Multi-category resume classification",
      "Named entity extraction from resumes",
      "Automated relevance scoring",
    ],
  },
  {
    name: "Git Agent",
    desc: "Autonomous AI agent for Git operations — automates repository management, code analysis, and development workflows using intelligent decision-making.",
    tech: ["Python", "AI Agents", "Git API", "Automation"],
    github: "https://github.com/VIVEK-DEV-AI/git-agent",
    highlights: [
      "Agentic workflow for code operations",
      "Intelligent repository analysis",
      "Automated Git task execution",
    ],
  },
];

const ProjectsSection = () => {
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
    <section id="projects" className="section-padding overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-primary text-sm tracking-widest uppercase mb-2">Projects</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured <span className="text-gradient">Work</span>
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
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-xl p-5 sm:p-6 border border-white/5 hover:border-primary/40 transition-all duration-200 group flex flex-col w-[85vw] sm:w-[380px] md:w-[400px] snap-start flex-shrink-0 relative overflow-hidden"
            >
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-4 relative z-10">
                <h3 className="text-foreground font-bold text-lg sm:text-xl group-hover:text-primary transition-colors duration-200 tracking-tight leading-tight">
                  {project.name}
                </h3>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 flex-shrink-0 ml-3 p-2 hover:bg-white/5 rounded-full"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <Github size={20} />
                </a>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5 relative z-10 line-clamp-3">
                {project.desc}
              </p>

              <div className="mb-5 flex-grow relative z-10">
                <p className="text-xs text-primary font-mono uppercase tracking-widest mb-3">Highlights</p>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-sm text-secondary-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 flex-shrink-0">▹</span>
                      <span className="break-words">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5 relative z-10">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
