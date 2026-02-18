import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", title: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Initial check for credentials
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration Error",
        description: "EmailJS credentials are missing in the environment variables.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. I'll get back to you soon.",
          });
          setForm({ name: "", email: "", title: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);
          toast({
            title: "Failed to send",
            description: "Something went wrong. Please try again later or email me directly.",
            variant: "destructive",
          });
        }
      );
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-2">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Got a project in <span className="text-gradient">mind?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mb-12">
            I'm open to AI/ML engineering roles, research collaborations, and interesting projects.
            Let's build something intelligent together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Your Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Subject</label>
              <input
                type="text"
                name="title" // As requested: "email js expect title as id"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Project Idea"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Your Message</label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Your Message"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  Sending... <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </motion.form>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            {[
              { icon: Mail, label: "vivekrajesh.dev@gmail.com", href: "mailto:vivekrajesh.dev@gmail.com" },
              { icon: Github, label: "github.com/VIVEK-DEV-AI", href: "https://github.com/VIVEK-DEV-AI" },
              { icon: Linkedin, label: "linkedin.com/in/vivekfordev", href: "https://linkedin.com/in/vivekfordev" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon size={20} />
                </div>
                <span className="text-sm">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
