"use client"

import type React from "react"
import { useEffect } from "react"
import Image from "next/image"
import { voidFunction } from "@/app/helpers/voidFunction"

interface ModalProps {
  isOpen: boolean
  title: string
  type?: "error" | "warning" | "success" | "pencil"
  onCloseAction: () => void
  onConfirmAction?: () => void
  children: React.ReactNode
}

const modalIconsPath = {
  error: "/svg/error.svg",
  warning: "/svg/warning.svg",
  success: "/svg/success.svg",
  pencil: "/svg/pencil.svg",
}

const typeStyles = {
  error: {
    iconBg: "bg-red-50 dark:bg-red-900/20",
    iconRing: "ring-red-200 dark:ring-red-800",
    confirmBtn: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  },
  warning: {
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    iconRing: "ring-amber-200 dark:ring-amber-800",
    confirmBtn: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
  },
  success: {
    iconBg: "bg-green-50 dark:bg-green-900/20",
    iconRing: "ring-green-200 dark:ring-green-800",
    confirmBtn: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  },
  pencil: {
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    iconRing: "ring-blue-200 dark:ring-blue-800",
    confirmBtn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  },
}

export default function Modal({ isOpen, title, type, onCloseAction, onConfirmAction, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseAction()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onCloseAction])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCloseAction()
    }
  }

  if (!isOpen) {
    return null
  }

  const currentTypeStyle = type ? typeStyles[type] : typeStyles.pencil

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 text-left shadow-2xl transition-all duration-300 ease-out scale-100 opacity-100 w-full max-w-lg mx-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4">
          {/* Close button */}
          <button
            onClick={onCloseAction}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:text-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-600"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal content */}
          <div className="bg-white dark:bg-neutral-800 px-6 pt-6 pb-4">
            <div className="flex items-start space-x-4">
              {/* Icon */}
              {type && modalIconsPath[type] && (
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full ring-2 ${currentTypeStyle.iconBg} ${currentTypeStyle.iconRing}`}
                >
                  <Image
                    src={modalIconsPath[type] || "/placeholder.svg"}
                    width={24}
                    height={24}
                    alt="Modal icon"
                    className="w-6 h-6"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3" id="modal-title">
                  {title}
                </h3>
                <div className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed max-h-[50vh] overflow-y-auto custom-scrollbar">
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="bg-gray-50 dark:bg-neutral-700/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
            {/* Cancel button */}
            <button
              onClick={onCloseAction}
              type="button"
              className="inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-neutral-300 bg-white dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-neutral-400 transition-all duration-200 w-full sm:w-auto"
            >
              Отмена
            </button>

            {/* Confirm button */}
            {onConfirmAction && onConfirmAction !== voidFunction && (
              <button
                onClick={onConfirmAction}
                type="button"
                className={`inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 w-full sm:w-auto ${currentTypeStyle.confirmBtn}`}
              >
                Подтвердить
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #525252;
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #737373;
          }
      `}</style>
    </div>
  )
}
