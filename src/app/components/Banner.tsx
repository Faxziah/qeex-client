"use client"

import Link from "next/link"
import "../styles/banner.css"

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1 className="banner-title">Создавайте смарт-контракты без кода</h1>
        <p className="banner-subtitle">
          Простой и безопасный способ создать, развернуть и управлять смарт-контрактами на блокчейне без знания
          программирования
        </p>
        <div className="banner-actions">
          <Link href="/create/simple-contract" className="banner-btn banner-btn-primary">
            Создать контракт
          </Link>
          <Link href="/me" className="banner-btn banner-btn-secondary">
            Мои контракты
          </Link>
        </div>

        <div className="banner-stats">
          <div className="banner-stat">
            <span className="banner-stat-number">1000+</span>
            <span className="banner-stat-label">Созданных контрактов</span>
          </div>
          <div className="banner-stat">
            <span className="banner-stat-number">5+</span>
            <span className="banner-stat-label">Поддерживаемых сетей</span>
          </div>
          <div className="banner-stat">
            <span className="banner-stat-number">100%</span>
            <span className="banner-stat-label">Безопасность</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
