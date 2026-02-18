
# Portfolio Overhaul Plan

## Summary
Major update to the portfolio based on your resume data, new photo, and the Zuko's Lab-style hero design reference. This covers 5 key areas: hero redesign, scroll animations, resume download, updated content from your resume, and your new photo.

---

## 1. Hero Section Redesign (Zuko's Lab Style)

Replace the current circular avatar layout with an editorial split-screen design inspired by the reference:
- **Left side**: Name, title, tagline, social links, CTA buttons
- **Right side**: Your uploaded photo displayed in a large rectangular/editorial crop (no circle), with a subtle gradient overlay blending into the dark background
- **Animated background**: Canvas-based floating particle/node animation behind the hero (subtle glowing dots connected by lines, evoking a neural network aesthetic) -- replaces the static `hero-bg.jpg`
- Copy your uploaded photo (`WhatsApp_Image_2026-02-17_at_3.28.43_PM.jpeg`) to `src/assets/vivek-photo.jpg` and use it as the hero image
- Add "Download Resume" button alongside "View Projects" and "Contact Me"

## 2. Resume Download

- Copy the uploaded `vivek_resume.pdf` to `public/vivek-resume.pdf`
- Add a "Download Resume" CTA button in the hero section that triggers a direct download

## 3. Scroll Animations

- Add smooth scroll behavior (`scroll-behavior: smooth` on `html`)
- Enhance all section components with staggered `whileInView` animations using Framer Motion's `variants` and `staggerChildren` for child elements
- Add subtle parallax-like effects on section headings

## 4. Content Updates from Resume

All data will be updated to match your actual resume:

**Personal Info:**
- Email: `vivekrajesh.dev@gmail.com`
- Location: Thiruvananthapuram, Kerala, India
- Phone: +91 6238348153

**Experience Section** -- add both roles:
1. **Senior AI Engineer at IIT Madras** (Aug 2025 - Present)
   - AI-driven jewelry generation research, SDXL/FLUX fine-tuning with LoRA, FashionCLIP image search
2. **AI Engineer at Orisys India Consultancy** (Jun 2025 - Aug 2025)
   - RAG chatbot (Gramin Mitra), FAISS semantic search, Mistral LLM integration

**Education Section** -- new section added:
- PG Diploma in AI/ML from IHUB School of Learning (2025)
- B.Tech in CSE from College of Engineering Muttathara (2024, CGPA: 80.2)

**Tech Stack** -- updated from resume:
- Languages: Python, C, SQL
- Frameworks: TensorFlow, Keras, Scikit-learn, NLTK, SpaCy, OpenCV, Transformers, LangChain
- Technologies: Supervised/Unsupervised Learning, NLP, Deep Learning, Neural Networks, Computer Vision, RAG
- Tools: Jupyter Notebook, Google Colab, VS Code

**Projects** -- updated descriptions from resume:
- NUERA AI updated to reflect voice assistant details (Whisper, Mistral LLM, Coqui TTS)

**Contact Section:**
- Updated email to `vivekrajesh.dev@gmail.com`

## 5. New Photo Integration

- Replace `vivek-avatar.jpg` with the uploaded WhatsApp image
- Used as a large rectangular editorial-style image in the hero (not a circle)

---

## Technical Details

### Files to Create:
- `src/components/ParticleBackground.tsx` -- Canvas-based animated particle/neural-network background component
- `src/components/EducationSection.tsx` -- New education section
- `public/vivek-resume.pdf` -- Resume file for download

### Files to Modify:
- `src/assets/vivek-photo.jpg` -- Replace with uploaded photo
- `src/components/HeroSection.tsx` -- Complete redesign: editorial layout, particle bg, resume download button
- `src/components/AboutSection.tsx` -- Updated summary text
- `src/components/TechStackSection.tsx` -- Updated categories from resume
- `src/components/ProjectsSection.tsx` -- Updated NUERA AI description
- `src/components/ExperienceSection.tsx` -- Add IIT Madras and Orisys roles
- `src/components/ContactSection.tsx` -- Updated email
- `src/components/Footer.tsx` -- Updated email
- `src/components/Navbar.tsx` -- Add Education nav link
- `src/pages/Index.tsx` -- Add EducationSection
- `src/index.css` -- Add smooth scroll, enhanced animation utilities
- `tailwind.config.ts` -- Add any new animation keyframes if needed

### Architecture of ParticleBackground:
- Uses HTML5 Canvas with `requestAnimationFrame`
- Renders ~50 subtle glowing dots that drift slowly
- Connects nearby particles with faint lines (neural net effect)
- Orange-tinted particles matching the primary color scheme
- Lightweight, no external library needed
