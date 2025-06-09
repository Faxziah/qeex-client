import Link from "next/link"
import "../styles/footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">SWAP MASTER</h3>
            <p className="footer-description">
              Простой и безопасный способ создать, развернуть и управлять смарт-контрактами на блокчейне без знания
              программирования.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Навигация</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Главная</Link>
              </li>
              <li>
                <Link href="/create/simple-contract">Создать контракт</Link>
              </li>
              <li>
                <Link href="/create/cryptocurrency">Создать криптовалюту</Link>
              </li>
              <li>
                <Link href="/create/nft">Создать NFT</Link>
              </li>
              <li>
                <Link href="/me">Мои контракты</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Поддержка</h4>
            <ul className="footer-links">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/docs">Документация</Link>
              </li>
              <li>
                <Link href="/contact">Связаться с нами</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Контакты</h4>
            <ul className="footer-contact">
              <li>
                <span className="footer-contact-icon">✉️</span>
                <a href="mailto:info@swapmaster.io">info@swapmaster.io</a>
              </li>
              <li>
                <span className="footer-contact-icon">🌐</span>
                <a href="https://swapmaster.io" target="_blank" rel="noopener noreferrer">
                  swapmaster.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© {currentYear} SWAP MASTER. Все права защищены.</p>
          <div className="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <span className="footer-social-icon">𝕏</span>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <span className="footer-social-icon">✈️</span>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <span className="footer-social-icon">👾</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
