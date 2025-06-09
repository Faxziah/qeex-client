"use client"
import { useMetaMaskConnection } from "@/app/hooks/useMetaMaskConnection"

export default function ConnectButton() {
  const { isConnected, connect } = useMetaMaskConnection()

  return (
    <button
      type="button"
      className="connect-button"
      onClick={connect}
      aria-label={isConnected ? "Кошелек подключен" : "Подключить кошелек"}
    >
      {isConnected ? "Подключено" : "Подключить кошелек"}
    </button>
  )
}
