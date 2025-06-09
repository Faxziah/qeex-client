"use client"

import { useState } from "react"
import { useMetaMaskConnection } from "@/app/hooks/useMetaMaskConnection"

export default function ConnectButton() {
  const { isConnected, connect } = useMetaMaskConnection()
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    if (isConnected) return

    setIsLoading(true)
    try {
      await connect()
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      disabled={isLoading}
      className={`
        group relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${
        isConnected
          ? "bg-transparent text-green-600 dark:text-green-400 border border-green-500/30 hover:bg-green-500/10 focus:ring-green-500/50"
          : "bg-transparent text-neutral-900 dark:text-white border border-orange-500/50 hover:border-orange-400 shadow-lg hover:shadow-xl focus:ring-orange-500/50"
      }
      `}
    >
      {/* MetaMask Icon */}
      <div className="flex items-center justify-center w-5 h-5">
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
      </div>

      {/* Button Text */}
      <span className="relative">
        {isLoading ? "Подключение..." : isConnected ? "Подключено" : "Подключить кошелек"}
      </span>

      {/* Connection Status Indicator */}
      {isConnected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-neutral-800 animate-pulse" />
      )}

      {/* Hover Glow Effect */}
      {!isConnected && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
      )}
    </button>
  )
}
