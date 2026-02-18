import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "PG Diploma in AI & Machine Learning",
    institution: "IHUB School of Learning",
    year: "2025",
    details: "Advanced program covering deep learning, NLP, computer vision, and production ML systems.",
  },
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "College of Engineering Muttathara",
    year: "2024",
    details: "CGPA: 80.2 — Core foundation in algorithms, data structures, and software engineering.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-2">Education</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.degree}
              variants={itemVariants}
              className="glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <span className="text-primary text-sm font-medium">{edu.year}</span>
              </div>
              <h3 className="text-foreground font-bold text-lg mb-1">{edu.degree}</h3>
              <p className="text-primary text-sm font-medium mb-2">{edu.institution}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{edu.details}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
