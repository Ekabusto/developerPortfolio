"use client"

import { useLanguage } from "./language-provider"
import { cn } from "@/lib/utils"

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "eu", label: "EU" },
] as const

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-700 overflow-hidden divide-x divide-zinc-200 dark:divide-zinc-700">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          aria-label={`Switch to ${label}`}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors duration-150",
            language === code
              ? "bg-emerald-500 text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
