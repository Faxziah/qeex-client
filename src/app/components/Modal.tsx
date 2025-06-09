"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import "../styles/modal.css"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: "small" | "medium" | "large"
}

const Modal = ({ isOpen, onClose, title, children, size = "medium" }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Закрытие по клику вне модального окна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Блокируем прокрутку страницы
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Восстанавливаем прокрутку страницы
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Закрытие по нажатию Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Используем портал для рендеринга модального окна в конце body
  return createPortal(
    <div className="modal-overlay">
      <div className={`modal-container ${size}`} ref={modalRef} role="dialog" aria-modal="true">
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export default Modal
