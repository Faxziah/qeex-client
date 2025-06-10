"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import ConnectButton from "@/app/components/ConnectButton"
import Link from "next/link"
import DarkModeSwitcher from "@/app/components/DarkModeSwitcher"

export default function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false)
        setIsMenuOpened(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [])

  function toggleMenu() {
    setIsMenuOpened(!isMenuOpened)
  }

  function closeMenu() {
    setIsMenuOpened(false)
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="w-full bg-background border-b border-border/40 relative z-[9997]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-4xl font-medium text-foreground whitespace-nowrap">Qeex</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group z-[9998]" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-accent/50 cursor-pointer"
                onClick={toggleDropdown}
              >
                Создание смарт-контракта
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Backdrop */}
              {isDropdownOpen && (
                <div className="fixed inset-0 bg-transparent z-[9998]" onClick={() => setIsDropdownOpen(false)} />
              )}

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-2 w-64 bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-2xl transition-all duration-300 z-[9999] ${
                  isDropdownOpen
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible -translate-y-2 scale-95"
                }`}
                style={{ position: "absolute", zIndex: 9999 }}
              >
                <div className="py-2">
                  <Link
                    href="/create/simple-contract"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-150 relative group rounded-md mx-2"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                      Создание простого смарт-контракта
                    </div>
                  </Link>
                  <Link
                    href="/create/cryptocurrency"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-150 relative group rounded-md mx-2"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                      Создание криптовалюты
                    </div>
                  </Link>
                  <Link
                    href="/create/nft"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-150 relative group rounded-md mx-2"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                      Создание NFT Токена
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/me"
              className="px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-accent/50"
            >
              Мои смарт-контракты
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ConnectButton />
            <DarkModeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpened ? (
              <Image src="/svg/cross.svg" width={24} height={24} alt="Close menu" className="w-6 h-6 svg" />
            ) : (
              <Image src="/svg/hamburger.svg" width={24} height={24} alt="Open menu" className="w-6 h-6 svg" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpened ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          <nav className="py-4 space-y-2 border-t border-border/40">
            <div className="space-y-2">
              <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Создание смарт-контракта</div>
              <Link
                href="/create/simple-contract"
                className="block px-6 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors duration-150"
                onClick={closeMenu}
              >
                Создание простого смарт-контракта
              </Link>
              <Link
                href="/create/cryptocurrency"
                className="block px-6 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors duration-150"
                onClick={closeMenu}
              >
                Создание криптовалюты
              </Link>
              <Link
                href="/create/nft"
                className="block px-6 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors duration-150"
                onClick={closeMenu}
              >
                Создание NFT Токена
              </Link>
            </div>

            <Link
              href="/me"
              className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors duration-150"
              onClick={closeMenu}
            >
              Мои смарт-контракты
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/40">
              <ConnectButton />
              <DarkModeSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
