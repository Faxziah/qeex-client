"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function DarkModeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 dark:bg-neutral-700 dark:border-gray-700 animate-pulse"/>
  }

  function toggleMode() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleMode}
      className="group relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-neutral-700 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-neutral-700 dark:to-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>

      {/* Icon container with rotation animation */}
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
        <Image
          src="/svg/light-mode.svg"
          width={20}
          height={20}
          alt="Light mode"
          className={`transition-all duration-200 ${theme === "dark" ? "opacity-100" : "opacity-0 absolute"}`}
        />
        <Image
          src="/svg/dark-mode.svg"
          width={20}
          height={20}
          alt="Dark mode"
          className={`transition-all duration-200 ${theme === "dark" ? "opacity-0 absolute" : "opacity-100"}`}
        />
      </div>

      {/* Ripple effect on click */}
      <div
        className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 group-active:opacity-20 transition-opacity duration-75"/>
    </button>
  )
}
