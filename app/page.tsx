"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "@/components/theme-provider"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"
import TechStack from "@/components/tech-stack"
import { CanvasBackground } from "@/components/canvas-background"

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </ThemeProvider>
  )
}

// Tracks mouse position to create a following spotlight inside cards
function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const div = ref.current
    if (!div) return
    const rect = div.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    div.style.setProperty("--sx", `${x}%`)
    div.style.setProperty("--sy", `${y}%`)
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={cn("relative overflow-hidden group", className)}>
      {/* Spotlight overlay — follows cursor via CSS custom props */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(16,185,129,0.10), transparent 60%)",
        }}
      />
      {children}
    </div>
  )
}

// Thin progress bar at the very top that fills as you scroll
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-500 z-[200] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

function Portfolio() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolling, setIsScrolling] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Parallax: hero content drifts up slightly while scrolling away
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -60])

  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return
      const sections = ["home", "tech-stack", "experience", "projects"]
      const current = sections.find((section) => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolling])

  const navSections = ["home", "tech-stack", "experience", "projects"]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased transition-colors duration-300">
      <ScrollProgressBar />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/80 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <button
                onClick={() => scrollToSection("home")}
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors tracking-tight font-display"
              >
                ekaitzbusto.dev
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex gap-8">
                {navSections.map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className={cn(
                        "text-sm font-medium transition-colors relative",
                        activeSection === section
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
                      )}
                    >
                      {t(`nav.${section}`)}
                      {activeSection === section && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-emerald-500"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-zinc-100 dark:border-zinc-800"
            >
              <div className="container mx-auto px-6 py-4">
                <ul className="flex flex-col gap-1">
                  {navSections.map((section) => (
                    <li key={section}>
                      <button
                        onClick={() => scrollToSection(section)}
                        className={cn(
                          "text-sm font-medium w-full text-left py-2.5 transition-colors",
                          activeSection === section
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-zinc-600 dark:text-zinc-400",
                        )}
                      >
                        {t(`nav.${section}`)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Canvas particle network — absolute, clipped to hero by overflow-hidden */}
        <CanvasBackground isDark={theme === "dark"} />

        {/* Dot-grid background */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-emerald-400/8 dark:bg-emerald-600/10 blur-3xl -z-10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-400/6 dark:bg-teal-600/8 blur-3xl -z-10"
        />

        {/* relative z-[1] ensures hero content is always above the canvas */}
        <motion.div style={{ y: heroY }} className="relative z-[1] container mx-auto px-6 py-16 md:py-0 w-full">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-12 lg:gap-20">

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex-1 mt-10 md:mt-0"
            >
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4"
              >
                Full Stack Developer
              </motion.p>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 leading-none tracking-tight font-display">
                {"Ekaitz\nBusto".split("\n").map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-md leading-relaxed"
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <button
                  onClick={() => scrollToSection("projects")}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 shadow-lg shadow-emerald-500/25"
                >
                  {t("hero.viewWork")}
                </button>
                <button
                  onClick={() => scrollToSection("tech-stack")}
                  className="border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-95 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                >
                  {t("hero.viewSkills")}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center gap-5"
              >
                {[
                  { href: "https://github.com/EBustoD", icon: <Github className="w-5 h-5" />, label: "GitHub" },
                  {
                    href: "https://www.linkedin.com/in/ekaitz-busto-ruiz-de-gordoa-138b07234/",
                    icon: <Linkedin className="w-5 h-5" />,
                    label: "LinkedIn",
                  },
                  { href: "mailto:ekabusto@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
                ].map(({ href, icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {icon}
                  </motion.a>
                ))}
                <span className="text-zinc-200 dark:text-zinc-700">|</span>
                <a
                  href="mailto:ekabusto@gmail.com"
                  className="text-sm text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  ekabusto@gmail.com
                </a>
              </motion.div>
            </motion.div>

            {/* Photo side — floats gently */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex justify-center md:justify-end md:flex-shrink-0"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glow ring behind the photo */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-emerald-500/15 blur-2xl scale-95 -z-10"
                />
                <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden ring-1 ring-zinc-100 dark:ring-zinc-800 shadow-2xl shadow-black/10">
                  <img
                    src="/ekaitz-portrait.jpeg"
                    alt="Ekaitz Busto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────── */}
      <TechStack />

      {/* ── Experience ───────────────────────────────────────── */}
      <section id="experience" className="py-24 bg-zinc-50/60 dark:bg-zinc-900/40">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 font-display">
              {t("experience.title")}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">{t("experience.subtitle")}</p>
          </motion.div>

          {/* Timeline — flex-col approach: each item owns its dot + line segment */}
          <div className="max-w-2xl space-y-0">
            {(t("experience.items", { returnObjects: true }) as any[]).map((job: any, index: number, arr: any[]) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="flex gap-5"
              >
                {/* Left column: dot + connecting line */}
                <div className="flex flex-col items-center flex-shrink-0 pt-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: index * 0.12 + 0.1 }}
                    viewport={{ once: true }}
                    className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 ring-[3px] ring-zinc-50 dark:ring-zinc-900 z-10 flex-shrink-0"
                  />
                  {index < arr.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                      viewport={{ once: true }}
                      style={{ originY: 0 }}
                      className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800 mt-2"
                    />
                  )}
                </div>

                {/* Content card */}
                <div className={cn("flex-1", index < arr.length - 1 ? "pb-8" : "")}>
                  <SpotlightCard className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-6 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors duration-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-1.5 flex-shrink-0">
                        <img src={job.logo} alt={job.company} className="w-9 h-9 object-contain rounded" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{job.title}</h3>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">{job.company}</p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{job.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {(job.description as string[]).map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                        >
                          <span className="text-emerald-400 dark:text-emerald-500 mt-0.5 flex-shrink-0">—</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 font-display">
              {t("projects.title")}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">{t("projects.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t("projects.items", { returnObjects: true }) as any[]).map((project: any, index: number) => (
              <motion.div
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <SpotlightCard className="h-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors duration-200 group/card">
                  <div className="overflow-hidden h-44 bg-zinc-50 dark:bg-zinc-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{project.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(project.technologies as string[]).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="py-10 border-t border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">Ekaitz Busto</p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">{t("footer.role")}</p>
            </div>
            <div className="flex items-center gap-5">
              {[
                { href: "https://github.com/EBustoD", icon: <Github className="w-5 h-5" />, label: "GitHub" },
                {
                  href: "https://www.linkedin.com/in/ekaitz-busto-ruiz-de-gordoa-138b07234/",
                  icon: <Linkedin className="w-5 h-5" />,
                  label: "LinkedIn",
                },
                { href: "mailto:ekabusto@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-600">
              © {new Date().getFullYear()} Ekaitz Busto. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
