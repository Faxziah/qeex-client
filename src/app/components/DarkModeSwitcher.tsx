"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";

export default function DarkModeSwitcher() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("color-theme", theme);
    }
  }, [theme]);

  function toggleMode() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  return (
    <button
      id="theme-toggle"
      type="button"
      className="text-gray-500 dark:text-gray-400 rounded-lg text-sm cursor-pointer pt-[8px] px-[16px] pb-[8px]"
      onClick={toggleMode}
    >
      <Image
        src="/svg/light-mode.svg"
        width={32}
        height={32}
        alt="Light mode"
        className={theme === "dark" ? "" : "hidden"}
      />
      <Image
        src="/svg/dark-mode.svg"
        width={32}
        height={32}
        alt="Dark mode"
        className={theme === "dark" ? "hidden" : ""}
      />
    </button>
  );
}