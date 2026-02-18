import { motion } from "framer-motion";
import { Code2, Layers, Box, Wrench, Terminal, Database, Cpu, Globe } from "lucide-react";
import { SiPython, SiC, SiPostgresql, SiPandas, SiNumpy, SiScikitlearn, SiKeras, SiTensorflow, SiOpencv, SiSpacy, SiHuggingface, SiLangchain, SiJupyter, SiGooglecolab, SiGit } from "react-icons/si";
// Using Lucide code for standard VS Code as SiVisualstudiocode is tricky in some versions
import { VscVscode } from "react-icons/vsc";

const categories = [
  {
    title: "Programming Languages",
    icon: Code2,
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "SQL", icon: SiPostgresql, color: "#4169E1" }, // Using Postgres icon as proxy for generic SQL
    ],
  },
  {
    title: "AI & ML Technologies",
    icon: Layers,
    items: [
      { name: "Pandas", icon: SiPandas, color: "#150458" },
      { name: "NumPy", icon: SiNumpy, color: "#013243" },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "Deep Learning", icon: Cpu, color: "#FF6F00" }, // Generic icon
      { name: "NLP", icon: Terminal, color: "#4CAF50" }, // Generic icon
      { name: "Computer Vision", icon: Eye, color: "#2196F3" }, // Generic icon
      { name: "Generative AI", icon: Brain, color: "#9C27B0" }, // Generic icon
      { name: "RAG", icon: Database, color: "#FF5722" }, // Generic icon
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Box,
    items: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "Keras", icon: SiKeras, color: "#D00000" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "SpaCy", icon: SiSpacy, color: "#09A3D5" },
      { name: "Transformers", icon: SiHuggingface, color: "#FFD21E" },
      { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
    ],
  },
  {
    title: "Tools & Environment",
    icon: Wrench,
    items: [
      { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
      { name: "Google Colab", icon: SiGooglecolab, color: "#F9AB00" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Git", icon: SiGit, color: "#F05032" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Start imports for generic icons that might be missing from Lucide in main import
import { Eye, Brain } from "lucide-react";

const TechStackSection = () => {
  return (
    <section id="techstack" className="section-padding bg-card/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-2">Tech Stack</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Tools of the <span className="text-gradient">Trade</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <cat.icon size={20} className="text-primary" />
                <h3 className="text-foreground font-semibold text-lg">{cat.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-background/50 hover:bg-primary/10 hover:scale-110 transition-all duration-200 group shadow-sm hover:shadow-md hover:shadow-primary/10 cursor-pointer"
                  >
                    <item.icon size={28} style={{ color: item.color }} className="mb-2 transition-transform duration-200 group-hover:scale-110" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground font-medium text-center transition-colors duration-200">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
