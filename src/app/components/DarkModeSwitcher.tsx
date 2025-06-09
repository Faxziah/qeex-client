"use client"

import { useState, useEffect } from "react"
import "../styles/dark-mode-switcher.css"

const DarkModeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Проверяем предпочтения пользователя при загрузке
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute("data-theme", "light")
    }
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
      setIsDarkMode(false)
    } else {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  }

  return (
    <button
      className={`dark-mode-switcher ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Переключиться на светлую тему" : "Переключиться на темную тему"}
    >
      <div className="switcher-icon">{isDarkMode ? "🌙" : "☀️"}</div>
      <div className="switcher-circle"></div>
    </button>
  )
}

export default DarkModeSwitcher
