"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./language-provider"
import { useTheme } from "./theme-provider"
import { DiReact, DiNodejsSmall, DiPython, DiHtml5, DiCss3, DiMysql } from "react-icons/di"
import { SiNextdotjs, SiTypescript, SiExpress, SiMongodb, SiOpenai } from "react-icons/si"
import { VscAzure } from "react-icons/vsc"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type Tech = {
  name: string
  icon: React.ReactNode
  category: "frontend" | "backend" | "data" | "ai"
  descriptionKey: string
}

export default function TechStack() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const techStack: Tech[] = [
    // Frontend
    {
      name: "React",
      icon: <DiReact size={40} className="text-[#61DAFB]" />,
      category: "frontend",
      descriptionKey: "techStack.descriptions.react",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs size={34} className={theme === "dark" ? "text-white" : "text-zinc-900"} />,
      category: "frontend",
      descriptionKey: "techStack.descriptions.nextjs",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript size={34} className="text-[#3178C6]" />,
      category: "frontend",
      descriptionKey: "techStack.descriptions.typescript",
    },
    {
      name: "HTML",
      icon: <DiHtml5 size={40} className="text-[#E34F26]" />,
      category: "frontend",
      descriptionKey: "techStack.descriptions.html",
    },
    {
      name: "CSS",
      icon: <DiCss3 size={40} className="text-[#1572B6]" />,
      category: "frontend",
      descriptionKey: "techStack.descriptions.css",
    },
    // Backend
    {
      name: "Node.js",
      icon: <DiNodejsSmall size={40} className="text-[#339933]" />,
      category: "backend",
      descriptionKey: "techStack.descriptions.nodejs",
    },
    {
      name: "Express",
      icon: <SiExpress size={34} className={theme === "dark" ? "text-white" : "text-zinc-900"} />,
      category: "backend",
      descriptionKey: "techStack.descriptions.express",
    },
    // Data
    {
      name: "MySQL",
      icon: <DiMysql size={40} className="text-[#4479A1]" />,
      category: "data",
      descriptionKey: "techStack.descriptions.mysql",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb size={34} className="text-[#47A248]" />,
      category: "data",
      descriptionKey: "techStack.descriptions.mongodb",
    },
    {
      name: "Python",
      icon: <DiPython size={40} className="text-[#3776AB]" />,
      category: "data",
      descriptionKey: "techStack.descriptions.python",
    },
    // AI & Cloud
    {
      name: "Azure",
      icon: <VscAzure size={36} className="text-[#0078D4]" />,
      category: "ai",
      descriptionKey: "techStack.descriptions.azure",
    },
    {
      name: "Generative AI",
      icon: <SiOpenai size={34} className={theme === "dark" ? "text-white" : "text-zinc-900"} />,
      category: "ai",
      descriptionKey: "techStack.descriptions.genai",
    },
  ]

  const categories: { key: Tech["category"]; label: string; color: string }[] = [
    { key: "frontend", label: "Frontend", color: "text-sky-500 dark:text-sky-400" },
    { key: "backend", label: "Backend", color: "text-emerald-500 dark:text-emerald-400" },
    { key: "data", label: "Data & Languages", color: "text-amber-500 dark:text-amber-400" },
    { key: "ai", label: "AI & Cloud", color: "text-violet-500 dark:text-violet-400" },
  ]

  const selectedTechData = techStack.find((tech) => tech.name === selectedTech)
  const selectedCategory = categories.find((c) => c.key === selectedTechData?.category)

  return (
    <section id="tech-stack" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-zinc-300 dark:text-zinc-700 tracking-widest mb-2 select-none">01 —</p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 font-display">
            {t("techStack.title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">{t("techStack.subtitle")}</p>
        </motion.div>

        {/* Category rows */}
        <div className="space-y-8">
          {categories.map((cat, catIndex) => {
            const items = techStack.filter((tech) => tech.category === cat.key)
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <p className={cn("text-xs font-semibold uppercase tracking-widest mb-3", cat.color)}>
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-3">
                  {items.map((tech, i) => (
                    <motion.button
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: catIndex * 0.1 + i * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTech(selectedTech === tech.name ? null : tech.name)}
                      className={cn(
                        "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200",
                        selectedTech === tech.name
                          ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-700 shadow-sm"
                          : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm",
                      )}
                    >
                      <span className="flex-shrink-0">{tech.icon}</span>
                      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                        {tech.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedTech && selectedTechData && (
            <motion.div
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 12, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 max-w-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span>{selectedTechData.icon}</span>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{selectedTechData.name}</p>
                      <p className={cn("text-xs", selectedCategory?.color ?? "text-zinc-400")}>
                        {selectedCategory?.label}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t(selectedTechData.descriptionKey)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
