"use client"

import { useEffect, useState } from "react"
import ContractItem from "@/app/me/components/ContractItem"
import Link from "next/link"
import { ContractStatus, type IContract } from "@/app/interface/IContract"
import { _getUserContracts } from "@/app/me/services/_getUserContracts"
import { useMetaMaskConnection } from "@/app/hooks/useMetaMaskConnection"
import ConnectButton from "@/app/components/ConnectButton"

export default function Home() {
  const { isConnected } = useMetaMaskConnection()
  const [contracts, setContracts] = useState<IContract[]>([])

  useEffect(() => {
    if (isConnected && !contracts.length) {
      getUserContracts()
    }
  }, [contracts.length, isConnected])

  async function getUserContracts() {
    const contracts = await _getUserContracts()

    if (Array.isArray(contracts)) {
      setContracts(contracts as IContract[])
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <main className="relative">
        {/* Hero Section with Improved Title */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-16 sm:py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30 dark:opacity-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent mb-6">
                Мои смарт-контракты
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
                Управляйте своими смарт-контрактами, отслеживайте их статус и взаимодействуйте с блокчейном
              </p>

              {/* Stats */}
              {isConnected && contracts.length > 0 && (
                <div className="flex justify-center space-x-8 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">{contracts.length}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Контрактов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {contracts.filter((c) => c.status === ContractStatus.DEPLOYED).length}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Развернуто</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {contracts.filter((c) => c.status === ContractStatus.WAIT_DEPLOYMENT).length}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">В ожидании</div>
                  </div>
                </div>
              )}

              {/* Wallet Connection Message - добавить после Stats блока */}
              {!isConnected && (
                <div className="text-center mt-8">
                  <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                    Для загрузки смарт-контрактов нужно подключить кошелек
                  </p>
                  <ConnectButton />
                </div>
              )}

              {isConnected && !contracts.length ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-purple-50/20 dark:from-transparent dark:via-neutral-800/50 dark:to-neutral-900/80"></div>
                  <div className="relative text-center py-20">
                    <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-6">Смарт-контрактов еще нет.</p>
                    <Link
                      href="/create/simple-contract"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Создайте свой первый смарт-контракт
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-col gap-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                  {contracts.map((contract: IContract) => (
                    <ContractItem key={contract.id} contract={contract} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
          @keyframes blob {
              0% {
                  transform: translate(0px, 0px) scale(1);
              }
              33% {
                  transform: translate(30px, -50px) scale(1.1);
              }
              66% {
                  transform: translate(-20px, 20px) scale(0.9);
              }
              100% {
                  transform: translate(0px, 0px) scale(1);
              }
          }
          .animate-blob {
              animation: blob 7s infinite;
          }
          .animation-delay-2000 {
              animation-delay: 2s;
          }
          .animation-delay-4000 {
              animation-delay: 4s;
          }
      `}</style>
    </div>
  )
}
