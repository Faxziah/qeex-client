"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import ConnectButton from "./ConnectButton"
import Link from "next/link"
import DarkModeSwitcher from "./DarkModeSwitcher"
import "../styles/header.css"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const pathname = usePathname()

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    setIsMenuOpened(false)
    setIsSubmenuOpen(false)
  }, [pathname])

  // Блокируем прокрутку страницы при открытом меню
  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpened])

  function showMenu() {
    setIsMenuOpened(true)
  }

  function closeMenu() {
    setIsMenuOpened(false)
  }

  function toggleSubmenu(e: React.MouseEvent) {
    if (window.innerWidth < 1280) {
      // xl breakpoint
      e.preventDefault()
      setIsSubmenuOpen(!isSubmenuOpen)
    }
  }

  return (
    <header className={`header ${isMenuOpened ? "opened" : "closed"}`}>
      <div className="header-container">
        <div className="burger-menu xl:hidden">
          {!isMenuOpened ? (
            <Image
              src="/svg/burger.svg"
              width={45}
              height={45}
              className="svg burger"
              alt="Открыть меню"
              onClick={showMenu}
            />
          ) : (
            <Image
              src="/svg/cross.svg"
              width={45}
              height={45}
              className="svg cross"
              alt="Закрыть меню"
              onClick={closeMenu}
            />
          )}
        </div>

        <Link href="/" className="logo-wrapper" onClick={() => setIsMenuOpened(false)}>
          <div className="logo">
            <Image src="/logo.png" width={60} height={60} alt="Logo" />
            <div className="logo-text">SWAP MASTER</div>
          </div>
        </Link>

        <nav className={`nav ${isMenuOpened ? "opened" : "closed"}`}>
          <ul className="nav-list">
            <li className="nav-item has-submenu">
              <Link
                href="/create/simple-contract"
                className={`nav-link ${pathname.includes("/create") ? "active" : ""}`}
                onClick={toggleSubmenu}
              >
                Создание смарт-контракта
                <span className="submenu-arrow">▼</span>
              </Link>
              <ul className={`submenu ${isSubmenuOpen ? "open" : ""}`}>
                <li className="submenu-item">
                  <Link
                    href="/create/simple-contract"
                    className={`submenu-link ${pathname === "/create/simple-contract" ? "active" : ""}`}
                    onClick={() => setIsMenuOpened(false)}
                  >
                    Создание простого смарт-контракта
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link
                    href="/create/cryptocurrency"
                    className={`submenu-link ${pathname === "/create/cryptocurrency" ? "active" : ""}`}
                    onClick={() => setIsMenuOpened(false)}
                  >
                    Создание криптовалюты
                  </Link>
                </li>
                <li className="submenu-item">
                  <Link
                    href="/create/nft"
                    className={`submenu-link ${pathname === "/create/nft" ? "active" : ""}`}
                    onClick={() => setIsMenuOpened(false)}
                  >
                    Создание NFT Токена
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link
                href="/me"
                className={`nav-link ${pathname === "/me" ? "active" : ""}`}
                onClick={() => setIsMenuOpened(false)}
              >
                Мои смарт-контракты
              </Link>
            </li>
          </ul>
        </nav>

        <div className={`header-right ${isMenuOpened ? "opened" : "closed"}`}>
          <div className="connect-button-wrapper">
            <ConnectButton />
          </div>
          <div className="theme-switcher-wrapper">
            <DarkModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
