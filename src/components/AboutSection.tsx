import { motion } from "framer-motion";
import { Brain, Eye, MessageSquare, Cpu } from "lucide-react";

const specializations = [
  {
    icon: Brain,
    title: "Deep Learning",
    desc: "Neural architectures, model optimization, and training pipelines for production systems",
  },
  {
    icon: MessageSquare,
    title: "NLP & GenAI",
    desc: "LLM integration, RAG systems, embeddings, and intelligent text processing",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Image classification, object detection, and visual understanding systems",
  },
  {
    icon: Cpu,
    title: "AI & Robotics",
    desc: "Intelligent automation, agentic workflows, and AI-driven system design",
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

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-2">About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Engineering Intelligence,{" "}
            <span className="text-gradient">End to End</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed mb-12">
            AI/ML Engineer & Researcher with deep expertise in deep learning, NLP, computer vision, and generative AI.
            Currently conducting R&D as Senior AI Engineer at IIT Madras, working under the guidance of distinguished professors
            on AI-driven design generation research. Passionate about AI, robotics, and machine learning — I specialize in taking
            intelligent systems from prototype to production deployment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {specializations.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-foreground font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
