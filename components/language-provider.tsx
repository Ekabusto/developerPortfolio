"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { translations } from "@/lib/translations"

type Language = "en" | "es" | "eu"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, options?: { returnObjects?: boolean }) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Translation function
  const t = (key: string, options?: { returnObjects?: boolean }) => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }

    if (options?.returnObjects) {
      return value
    }

    return value || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
